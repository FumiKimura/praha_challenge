# 本番稼働中のデータベースをマイグレーションしよう

## 課題１（質問）

### このような時に役立つのが段階的にマイグレーションを実施していく「expand and contract pattern」です。どのような手法なのか、説明してみてください。

expand and contract pattern(parallel change)とは、
ダウンタイムと後方互換性を維持しながらマイグレーションを行う方法。

expand(拡大)、migrate(移行)、contract(縮小)する 3 つの期間がある

1. expand では、新しいカラムを追加しスキーマを拡大する

この例では USER.name を first_name と last_name に分けるマイグレーションを行う
変更前の USER テーブルは以下の通り。

```
CREATE TABLE User (
    id INT PRIMARY KEY
    name VARCHAR(255)
)
```

2. migrate では既存カラムを新カラムに移行するスクリプトを用意し実行する

User テーブルに first_name と last_name を追加し、
追加後に作成されたユーザーは name、first_name、last_name にデータを書く変更を加える。

```
ALTER TABLE User
ADD first_name VARCHAR(255),
    last_name VARCHAR(255);
```

name を first_name と last_name に書くマイグレーションスクリプトを実行しデータ移行を開始。

3. contract で移行が完了した既存カラムを削除しマイグレーションを完了させる

```
ALTER TABLE User
DROP COLUMN name;
```

移行期間中 Read はどう対処するべきか？

1. データ移行が完了するまで name だけをクエリする
2. first_name と last_name が null であれば name にフォールバックする
3. 移行が完了するまで name, first_name, last_name を全て読み、アプリケーションで対処する

### 開発環境でマイグレーションを実施した時は問題なかったのに、本番環境で実施したら失敗することが時々あります。特に既存テーブルのカラムに NOT NULL 制約を追加する時によく起きるのですが、何故でしょうか？この失敗を避けるためには、どのような対策が有効でしょうか？

#### 以下の点が原因と考えられます。

1. データの不整合 - 本番環境には開発環境に存在しないデータがある
2. 本番と開発環境に差がある - 本番環境と開発環境に設定やデータなどの差異がある

#### 対応策

1. データチェックとクリーニング - `NOT NULL`制約を追加する前に本番データに NULL 値が存在しないか確認
2. 本番と開発環境の差異をなくす - 常に開発環境は本番環境に近いデータや設定を持つ環境を用意する
3. データベースのバックアップを取る - 万が一のためにデータのバックアップを取る

##　課題２（実装）

変更前のスキーマ: ユーザーは一つのペアにしか参加できない

```
CREATE TABLE User {
    id INT PRIMARY KEY
    first_name VARCHAR(255)
    last_name VARCHAR(255)
    status VARCHAR(9) -- ENROLLED, SUSPENDED, CANCELLED
    FOREIGN KEY joined_pair_id REFERENCE Pair(id)
}
```

```
CREATE TABLE Pair {
    id INT PRIMARY KEY
    name VARCHAR(255)
}
```

変更後のスキーマ: ユーザーは複数のペアに所属できる(中間テーブルを使用する)

```
TABLE User {
    id INT PRIMARY KEY
    first_name VARCHAR(255)
    last_name VARCHAR(255)
    status VARCHAR(9) -- ENROLLED, SUSPENDED, CANCELLED
}
```

```
CREATE TABLE Pair {
    id INT PRIMARY KEY
    name VARCHAR(255)
}
```

```
TABLE User_Pair (
    user_id INT,
    pair_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, pair_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (pair_id) REFERENCES Pair(id) ON DELETE CASCADE
);
```

### マイグレーション作業手順書

#### 前提条件

目的: ユーザーが複数のペアに所属できるようにデータベーススキーマを変更する

影響範囲:

1.  データベーススキーマ
2.  バックエンドアプリケーション
3.  既存データの移行

#### マイグレーション手順

前提条件:

- ステージング環境でマイグレーションが成功している
- 問題発生時のロールバック手順がある
- ロールバックに失敗した場合、バックアップからレストア手順がある

1. バックアップを取得

```
pg_dump -U postgres -h localhost -d mydatabase > mydatabase_backup.sql
```

### Expand 期

2. 中間テーブルを追加

```
CREATE TABLE User_Pair (
    user_id INT,
    pair_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, pair_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (pair_id) REFERENCES Pair(id) ON DELETE CASCADE
);
```

3. 新規ペアを中間テーブルと旧テーブルの両方に追加する変更をリリース

### Migration 期

4. 既存データを User_Pair にコピーするスクリプトを実行

   ```
    INSERT INTO User_Pair (user_id, pair_id)
    SELECT id AS user_id, joined_pair_id AS pair_id
    FROM User
    WHERE joined_pair_id IS NOT NULL;
   ```

5. 変更後のスキーマがデグレを起こさないかテストを実施する

6. データ移行完了後にアプリケーションコードを User_Pair を使用するように更新

### Contract 期

7. User_Pair のデータを検証する(COUNT 数がマッチすれば OK)

   ```
   SELECT COUNT(*) FROM User WHERE joined_pair_id IS NOT NULL;

   SELECT COUNT(*) FROM User_Pair;
   ```

8. User テーブルから`joined_pair_id`を削除
   ```
   ALTER TABLE User DROP COLUMN joined_pair_id;
   ```
9. 削除後に問題が発生しないかテストを実施

10. 全ての機能が正常に動作することをテストを実施する

11. ステージング環境と本番環境で動作確認する

12. バックアップファイルを削除

#### 発生しうる問題と対応

- マイグレーションに失敗する(Sequelize の場合は以下のコマンドでロールバック可能)
  - `npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX.js`
- バックアップからレストアする場合
  - https://qiita.com/rice_american/items/ceae28dad13c3977e3a8
- データ同期ミス
  - データ検証スクリプを事前に準備し同期チェックを定期的に実施
- コード変更もれ
  - コードレビューを実施し、ローカルデータベースで動作を検証する
- 移行後のパフォーマンス低下
  - インデックスを追加するなど中間テーブルでのクエリを最適化する
