# 外部 API を活用してみよう

## 課題 1

### GitHub の設定画面では Personal access tokens の他に GitHub Apps や OAuth Apps があったと思います。これらにはどのような違いがあるのでしょうか？どのようなシチュエーションでどの認証方法を選択すべきか、考えてみましょう。

- Github App - Installation を作成し、その installation に追加されたリソースを操作できる。Organization の場合は管理者しか installation に入れられない。

- OAuth Apps - 「誰かとして認証」する事でユーザーの権限範囲内でリソースを操作できるようにあなる。

- ユーザー個人の認証やユーザーとして操作を行う場合 -> OAuth
  - 権限が広すぎて不必要なリソースに対してもアクセスできる。人的ミスがあれば悲惨な状況になる。
  - トークンが長生き
- 組織全体や複薄のレポジトリに対して細かく権限を管理しながら自動化を行う場合 -> Github App
  - Organization の場合は管理者しか installation できない
  - 細かくアクセス範囲を指定できる
  - 複数種類のトークンを使用して安全性を高めている(インストールアクセストークン、ユーザーアクセストークンなど)

[GitHub Apps と OAuth Apps の違いが分からなかった人のために、日本一わかりやすく説明してみた](https://qiita.com/dowanna6/items/cfe3fc88643d3ef95a37)

## 課題 2
