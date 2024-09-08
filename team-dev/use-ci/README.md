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


### 課題3

#### ビルド時間を短縮するためにできる事がないか調べてみてください

- [Cache Action](https://github.com/actions/cache)を使用して依存関係にあるパッケージをキャッシュする。
- jobを並行して実行するようにする。[デフォルト](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/using-jobs-in-a-workflow)で並行実行されるようになっている。
- ハードウェア性能が高い[ホステッドランナー](https://docs.github.com/ja/actions/using-github-hosted-runners/using-larger-runners/about-larger-runners#%E3%82%88%E3%82%8A%E5%A4%A7%E3%81%8D%E3%81%AA%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC-larger-runner%E3%81%AE%E6%A6%82%E8%A6%81)を使用する

#### 例えばheadless CMSで管理しているコンテンツが更新されたら、自動的にブログをビルドしてデプロイするワークフローを作りたいとします。どのような方法でワークフローを起動すると良さそうでしょうか？

コンテンツが更新された際にGithub APIを使用して、repository_dispatchのwebhookイベントを送信し、ワークフローを実行する。
注: ワークフローファイルがデフォルト ブランチにある場合にのみワークフローの実行をトリガーします。

API仕様は[こちら](https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event)

送信するリクエストの[例](https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event)

```
curl -L \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer <YOUR-TOKEN>" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  https://api.github.com/repos/OWNER/REPO/dispatches \
  -d '{"event_type":"on-demand-test","client_payload":{"message":"contents updated"}}'
```

Github Actionのワークフローの[設定例](https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-dispatch-event)
```
on:
  repository_dispatch:
    types: [test_result]

jobs:
  run_if_failure:
    if: ${{ !github.event.client_payload.passed }}
    runs-on: ubuntu-latest
    steps:
      - env:
          MESSAGE: ${{ github.event.client_payload.message }}
        run: echo $MESSAGE
```

#### 特定のディレクトリ配下が変更された時のみワークフローが実行されるように設定するには?

`paths`を使って指定する。
```
on:
  push: 
    paths: // src/util以下のファイルに変更があれば実行
      - 'src/util/**'
jobs:
  build: ...

```

#### 特定のjobが他のjobの完了を待ってから 実行されるように設定するには

`needs`でジョブの実行前に正常に完了する必要があるジョブを示す。
```
on: [push]

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Step in job1
        run: echo "Running job1"

  job2:
    runs-on: ubuntu-latest
    needs: job1  # job1 が完了するまで待機
    steps:
      - name: Step in job2
        run: echo "Running job2 after job1"

  job3:
    runs-on: ubuntu-latest
    needs: [job1, job2]  # job1 と job2 の両方が完了するまで待機
    steps:
      - name: Step in job3
        run: echo "Running job3 after job1 and job2"
```

#### 秘匿性の高い環境変数をymlファイルの中で扱うには

秘匿情報を`GitHub Secrets`に格納しsecrets.{キー名}でアクセスする
```
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      
      - name: Run a script with secrets
        run: echo "My secret key is $MY_SECRET_KEY"
        env:
          MY_SECRET_KEY: ${{ secrets.MY_SECRET_KEY }}
```