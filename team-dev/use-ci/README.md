# CI環境を整備してみよう

## 課題1（実装）

### プルリクエストを作成したら自動的にESLintを使ってプロジェクト全体にlintをかける
```
name: ESlint

run-name: Run ESlint when pull request is created
on:
  pull_request:
    paths:
      - "team-dev/use-ci/**"
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