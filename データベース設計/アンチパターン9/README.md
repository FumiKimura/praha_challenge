## データベース設計のアンチパターンを学ぶ9

### 課題1

- mailAddressカラムには、特定ドメインを持ったメールアドレスしか登録できない(Checkを使うべきか)
  - Check制約とは？
    - 列およびテーブルに対して制約を定義して、テーブル内のデータを任意に制御する方法。制約に違反するデータを格納しようとするとエラーを返す
    - [postgresの仕様](https://www.postgresql.jp/document/13/html/ddl-constraints.html)
  - 基本的NG: メールアドレスの形式の正しさをチェックするには有効
    - 理由: Check制約のregexが複雑になりやすく管理が困難になる
      - 対応するドメインのケースが増えればcheck制約のRegexは複雑になる
      - RegexでDDLに記述するので管理が困難
      - 挿入可能なドメインを別テーブルで管理する方が適切
    - Check制約は列定義に記述するのでRegexの追加と変更にコストがかかる

- ユーザーが退会した時、当該ユーザーのレコードを「User」テーブルから削除し、Triggerを使い同じ情報を「WithdrawnUser」に追加するべきか
  - Triggerとは？
    - Triggerとは(挿入・更新・削除)の操作が特定のテーブルにあった場合に予め定義された処理を自動的に実行する
  - メリット
    - イベントロギング
      - 監査など特定のテーブルに対して操作ログを取得するなどでは有用
    - 導出項目・集計値の自動生成(データを変換する)
  - デメリット
    - Triggerが連鎖的に発生するなど開発者が意図していない発火が設定される可能性があるので、運用を考慮すると使用するケースを組織内で定義して使用する
  - 結論: Triggerを使用しない(ドキュメント化 or ルール化されていれば可)
    - 理由: ユーザーを削除するロジックはビジネスロックなのでアプリケーション側で一括管理した方が良い
    - Userテーブルからの削除はアプリケーション側で、WithdrawUserへの挿入はTrigger(DB側)だと管理が煩雑になるから
  - DBMSによってはMaterialized Viewがデフォルトでないものもある
    - MySQLにはMaterialized Viewがでデフォルトの機能としてないので、Triggerを使用してMaterialized Viewの代わりとなるテーブルのデータを維持する上で使用する
    - [MySQLでMaterialized Viewを実現する](https://tech.excite.co.jp/entry/2022/02/07/174804)

- 「gender」カラムには「male」「female」「no response」のいずれかしかない(Enumを使うべきか)
  - 結論: 値セットが変わらない限り使用して問題ない
    - 変更するのであれば列を再定義する必要がある
  - 変更がある可能性がある場合
    - 参照テーブルを用意し許可する値を1行に1つずつ格納する
    - 制約はDB側に持たせて画面では選択肢にする
  - 今回のケースはユーザーからの性別に関しての返答で「no response」もあるのでEnumを変更する可能性は低い
  - ただgenderのカラムに入る値が増えるのであればEnumは使用しない方が良いと思う

- 「postCode(郵便番号)」カラムには特定形式の文字列しか入れてはいけない(Domainを使うべきか)
  - Domain(ドメイン)とは？
    - 複数のテーブル間で共通なフィールドをメンテナンスのために一箇所にまとめることができるユーザー定義型([postgresql仕様](https://www.postgresql.jp/document/8.0/html/sql-createdomain.html))
    - postCodeは形式がよく変化するものではないので使用はOK
    - 1箇所にデータ定義をまとめることで、各テーブルに制約を設定するよりも楽になるので使用した方が有効だと思う。
      - 追加と変更のコストがCheckとEnumよりも低い

- 上記のような制約をアプリケーション側で課すアプローチと、データベース側で制約を課すアプローチがあります。どちらをどのような時に採用するべきだと思いますか？
  - データ構造に制約を付けたい場合はデータベース側に制約をつけた方が良い。将来的に入ってくるであろうデータも含めたデータの整合性を保つため。
  - ビジネスロジックに関する制約はアプリケーション側に持たせる。
  - 参考文献:
    - [Why are constraints applied in the database rather than the code?](https://dba.stackexchange.com/questions/39833/why-are-constraints-applied-in-the-database-rather-than-the-code)
    - [Should you enforce constraints at the database level as well as the application level?](https://stackoverflow.com/questions/464042/should-you-enforce-constraints-at-the-database-level-as-well-as-the-application)

### 課題2
- どんなサービスを開発している時に上記のようなアンチパターンに陥りそうでしょうか？最低でも1つは例を考えてみてください
  - Check, Enum, Domain (限定する値を列定義で指定する)
    - 個人の属性を取得する系のサービスで起きやすそう。例えばクレジットカード新規申請で職業を選択する画面(会社員、個人事業主、主婦など)がよくあるが、それがCheckやEnumで列の値を定義指定して、開発者が想定していた以上に追加と変更が必要になるケース。
    - 解決策:参照テーブルを用意する
  - Trigger
    - トリガーの挙動はドキュメント化されてなく、開発者が把握しておらず、意図しない挙動として発火される可能性がある
      - 解決策: ドキュメント化する
      - アンチパターン: ディプロマティック・イミュニティ