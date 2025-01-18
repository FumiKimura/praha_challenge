# サービスのモニタリングを考える

## 課題 1 (質問)

### 以下のような要望を実現するために使えそうなツールを探してみましょう！

#### 一定期間で一定数以上、フロントエンドの WEB アプリケーションがクラッシュしていたら、開発者に Slack で知らせる

メジャーなモニタリングツール全てでこの要件を達成できそう。

DataDog:

- [ブラウザログ収集機能](https://docs.datadoghq.com/ja/logs/log_collection/javascript/)
- [閾値アラート](https://docs.datadoghq.com/ja/monitors/configuration/?tab=%E3%81%97%E3%81%8D%E3%81%84%E5%80%A4%E3%82%A2%E3%83%A9%E3%83%BC%E3%83%88)で sum と期間を設定する
- [Slack 連携の仕方](https://docs.datadoghq.com/ja/integrations/slack/?tab=datadogforslack)

Sentry:

- [ブラウザログ収集機能](https://zenn.dev/magicmoment/articles/sentry-202109)
- [閾値アラート](https://docs.sentry.io/product/alerts/create-alerts/metric-alert-config/)
- [Slack 連携](https://sentry.io/integrations/slack/)

#### フロントエンドで何らかのエラーが発生したら、直前までユーザが実施した作業手順、ブラウザの実行環境等の情報を付与して開発者に通知する

Datadog:

- [Session Replay 機能](https://www.datadoghq.com/ja/product/real-user-monitoring/session-replay/)
  - エラートラッキングで検出された問題のセッションのリプレイを見ることができる

#### バックエンドのアプリケーションが（メモリ不足などの理由で）クラッシュしたら、自動的にアプリケーションを再起動しつつ、開発者に Slack で知らせる

AWS:

- [CloudWatch Alarm](https://qiita.com/ymd65536/items/5c8c95abf8138f16d4ba) で特定メトリクスをモニタリング、事前設定された閾値を超えた場合 AWS SNS に連携する

#### API からのレスポンスタイムが 5 秒以上かかっているエンドポイントを可視化する。もし 5 秒以上かかっているレスポンスが全体の 1 割を超えたら開発者に Slack で知らせる

DataDog:

- [Application Performance Monitoring (APM)](https://docs.datadoghq.com/integrations/slack/?utm_source=chatgpt.com&tab=datadogforslack)
  - アプリケーションのパーフォーマンスを始めとした周辺データの管理と可視化を行う機能。
- 閾値アラートと Slack 連携を設定する

#### データベースのスロークエリを可視化して、レスポンスに 5 秒以上かかるクエリがある場合は開発者に Slack で知らせる

##### ヒント：AWS RDS のようなマネージド DB を使っている前提で構いません

New Relic:

- [データベースページでパフォーマンスを監視](https://docs.newrelic.com/jp/docs/apm/apm-ui-pages/monitoring/databases-page-view-operations-throughput-response-time/)

- [アラート設定の仕方](https://docs.newrelic.com/jp/docs/alerts/create-alert/create-alert-condition/alert-conditions/)
- [Slack 連携](https://docs.newrelic.com/jp/docs/alerts/get-notified/notification-integrations/)

### WEB アプリケーションを安定稼働させるため、上記の他に監視しておいた方が良いメトリクスは無いでしょうか？挙げられるだけ挙げてみてください！

- インフラ関連
  - CPU 使用率
  - メモリ使用率
  - ディスク使用率
  - IOPS
- アプリケーション関連
  - リクエストの平均応答時間
  - スループット
  - API のエラー率
  - データベースクエリの応答時間
  - キャッシュヒット率
  - アップタイム
  - ヘルシチェック結果
- セキュリティ関連
  - 異常なトラフィック(IP や国ごと)
  - ログイン試行の失敗回数
- フロントエンド関連
  - セッション時間
  - アクティブユーザー数
  - ピークタイムのユーザー数
  - エラー率
