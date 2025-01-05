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
