# CI環境を整備してみよう

## 課題1（実装）

### プルリクエストを作成したら自動的にESLintを使ってプロジェクト全体にlintをかける
```
name: ESlint

run-name: Run ESlint when pull request is created
on:
  pull_request:
    paths:
      - "team-dev/use-ci/assignment1/**"
    branches:
      - main
jobs:
  eslint:
    name: Run eslint
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Run eslint
        run: npm run lint
```

### 課題2
#### 統合テストケースをGitHub ActionsのCI環境上で実行するようなworkflow
```
name: Integration Tests

on:
  pull_request:
    branches:
      - main

jobs:
  integration-test-container:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U postgres"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run integration tests
        run: npm test
        env:
          POSTGRES_HOST: localhost
          POSTGRES_PORT: 5432
          POSTGRES_DB: testdb
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          NODE_ENV: test
```

[参考: PostgreSQLサービスコンテナの作成](https://docs.github.com/ja/actions/use-cases-and-examples/using-containerized-services/creating-postgresql-service-containers)

