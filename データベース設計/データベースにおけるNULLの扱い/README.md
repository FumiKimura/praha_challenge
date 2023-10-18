## データベースにおけるNULLの扱い

### 課題1

```
SQLクエリで以下の式を実行した時の結果を答えてください
SELECT NULL = 0;
NULL = NULL (以下、SELECT部分を省略)
NULL <> NULL
NULL AND TRUE
NULL AND FALSE
NULL OR TRUE
NULL IS NULL
NULL IS NOT NULL
```

- SELECT NULL = 0;
  - `NULL`
- SELECT NULL = NULL;
  - `NULL`
- NULL <> NULL
  - `NULL`
- NULL AND TRUE
  - `NULL`
- NULL AND FALSE
  - 0
- NULL OR TRUE
  - 1
- NULL IS NULL
  - 1
- NULL IS NOT NULL
  - 0


### 課題2

```
テーブル設計を見直して、Issueテーブルが null を含まないように作り変えてください
```

```
回答: 交差テーブルを作りIssueテーブルと、Assigneeテーブルを紐付ける。
AssigneeがあるIssueのみをこの交差テーブルに挿入する。
```

![image](./database_null.png)

```
NULLがデータベースに存在することは本当に悪いことなのか？トリオで議論する。
```

