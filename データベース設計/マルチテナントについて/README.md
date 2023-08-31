## マルチテナントについて

### 課題1

#### 原因
各テナントのデータを、DBやスキーマを分けずにtenant_idで識別して管理していた

#### 対策(過去に戻れるとしたら)
- ユースケースとコストとの兼ね合いを考えつつ、各テナントのデータ混濁を避けられる適切なマルチテナントアーキテクチャを活用する

#### マルチテナントとは?
- 複数のテナント(ユーザー)で計算資源(webサーバー/DB)を共有すること

#### 大まかに3つあるDB分割アプローチ
1. 分離(Isolated)
   1. DBを完全に分ける
2. 準分離(semi-isolated)
   1. DBを共有し、スキーマの名前空間でテナントを分ける
3. 共有(shared)
   1. DB/スキーマを分けない(Row-level-securityを使用する等)

### 課題2

#### 各アーキテクチャのPros/Cons
1. 分離(Isolated) - テナント毎に新規DBを立てる
   1. Pros
      1. データ混濁は発生しない
      2. 個別対応が可能なため細かい要件などに柔軟に対応できる
   2. Cons
      1. テナント毎にDBを立てるためコストが最も高い
         1. 個別対応が必須なのでコストが高い
   
2. 準分離(semi-isolated) - DBは一つ、スキーマ単位で分ける(パブリックなスキーマを一部配置)
   1. Pros
      1. スキーマをテナント単位で分けるのでシングルテナントよりコストが低そう
         1. Tenant1_Userテーブル、Tenant2_Userテーブルみたいな
      2. テナント個別の対応がしやすい
   2. Cons
      1. マイグレはテナント数に比例する -> 運用コストが高くなる
      
3. 共有(shared) - DBとスキーマが一つ
   1. Pros
      1. 運用コストが他の2つより低い(スキーマは一つ) -> 個別対応必要なし
      2. Row-level-securityなどの機能が実装されているDBがある
   2. Cons
      1. 分離と準分離に比較して個別制御ができない
      2. 課題1の方法だとデータ混濁のリスクがある
         1. WHERE句付け忘れ

#### RLSと、RLSを活用したマルチテナントアーキテクチャの実装方法
- GoとPostgresを使って実装しました
- middle


参考文献
- [RLSを用いたマルチテナント実装 for Django](https://www.slideshare.net/shimizukawa/a-multitenant-implementation-using-rls-for-django)
- [Multi-tenant SaaS database tenancy patterns](https://learn.microsoft.com/en-us/azure/azure-sql/database/saas-tenancy-app-design-patterns?view=azuresql-db)
- [GoでPostgreSQLのRLS(Row Level Security)を実装してみた](https://zenn.dev/yunbopiao/articles/c5548a672c44f8)