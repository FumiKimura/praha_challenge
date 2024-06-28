## よく使う HTTP ヘッダを理解する

### 課題 1

- Host
  - リクエストが送信される先のサーバーのホスト名とポート番号を指定します。
  - ポート番号が指定されなかった場合は、要求されたサービスの既定のポートとみなされる。
- Content-type
  - リソースの MIME タイプを示すために使用します。
- User-agent
  - サーバーやネットワークピアがアプリケーション、オペレーティングシステム、ベンダーや、リクエストしているユーザーエージェントのバージョン等を識別できるようにする
- Accept
  - HTTP の Accept リクエストヘッダーは、クライアントが理解できるコンテンツタイプを MIME タイプで伝えます。 コンテンツネゴシエーションを使用して、サーバーは提案のうちの一つを選択し、それを使用してクライアントに Content-Type レスポンスヘッダーで選択を伝えます。
- Referer
  - 現在リクエストされているページへのリンク先を持った直前のウェブページのアドレスが含まれます。
- Accept-Encoding
  - HTTP のリクエストヘッダーで、クライアントが理解することができるコンテンツのエンコーディング（ふつうは圧縮アルゴリズム）を示します。コンテンツネゴシエーションを使用して、サーバーは提案されたものから一つを選択して使用し、 Content-Encoding レスポンスヘッダーを使用してクライアントに選択結果を知らせます。
- Authorization
  - HTTP の Authorization リクエストヘッダーは、ユーザーエージェントがサーバーから認証を受けるための証明書を保持します。
- Location
  - レスポンスヘッダーはリダイレクト先の URL を示します。 3xx (リダイレクト) または 201 (created) ステータスレスポンスを返すときのみ意味を成します。
  - 303 (See Other) レスポンスは常に GET メソッドを使用するように誘導され、 307 (Temporary Redirect) および 308 (Permanent Redirect) は元のリクエストにおいて使用されたメソッドを変更しません。
  - 301 (Moved Permanently) と 302 (Found) は多くの場合はメソッドを変更しませんが、古いユーザーエージェントは変更することがあります。

```
refererについて

noreferrerのキーワードを <a>, <area>, <form> の各要素の rel 属性に指定すると、ターゲットリソースへ移動する際、 Referer ヘッダーを省略してリファラー情報が漏洩しないようにブラウザーに指示します。

aタグにtarget="_blank"を設定したところ、先輩エンジニアから「ちゃんとrel=noreferrerを設定した？」と聞かれました。なぜそのような設定が必要なのでしょうか？

Reverse tabnabbing攻撃を行えるためである。noreferrerが指定されていないと、悪意あるページは元のページをフィッシングサイトなどにwindow.openerを使用して誘導できる。逆に指定されていると、window.openerはnullとなりTabnabbingは回避できる。


「同じオリジンの時はrefererの情報を全部送って、別オリジンの時は、オリジン情報だけをrefererとして送信するように、HTTPヘッダを追加しておいてもらえる？」

strict-origin-when-cross-originを使用する
- 同オリジン -> オリジン、パス、クエリー文字列を送信する
- 違うオリジン -> オリジン間リクエストでは、プロトコルのセキュリティ水準が同じである場合 (HTTPS→HTTPS) にのみオリジンを送信
```

### 課題 2 　(クイズ)

1. Cache-Control のディレクティブである、max-age と Expires ヘッダーの違いを説明してください。
2. Cache-Control のディレクティブである、private, public, no-store, no-cache, must-revalidate について説明してください。
3. Content-Encoding は何を示すヘッダーでしょうか。

### 課題 3 　(クイズ)

- Twitter のフォロー関係の破棄は PUT?PATCH?DELETE?
  - 関係というリソースの破棄は DELETE になる
- 取引の取り消しは PUT?PATCH?DELETE?
  - 取り消しの意味が取引データの物理削除なのか、あくまで取り消しというステータスにするのかによる。
    - 取引データの物理削除 -> DELETE
    - 取引データのステータス変更 -> PATCH
- お気に入りリストからの削除は PUT?PATCH?DELETE?
  - User というリソースのお気に入りリストを更新するので PATCH が適切

Twitter の API フォロー取り消し([Unfollow](https://developer.x.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/post-friendships-destroy))は、`POST friendships/destroy`です。これはフォロー関係をユーザーデータの一部として認識しているより、単体のリソースとして捉えているからでしょうか。歴史的な経緯もありそうです。意図が理解でき、全体的に統一されていれば、違和感は感じますがs問題ないと思います。
