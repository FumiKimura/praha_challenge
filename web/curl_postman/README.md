## curl と postman に慣れる

ローカルで httpbin を起動して各 curl コマンドを打ちました。

### 問題 1

```
norifumikimura@MacBook-Pro ~ % curl -X GET http://localhost:80/headers \
-H "X-Test:hello"
{
  "headers": {
    "Accept": "*/*",
    "Host": "localhost",
    "User-Agent": "curl/8.1.2",
    "X-Test": "hello"
  }
}
```

### 問題 2

```
curl -X POST http://localhost:80/post \
-H "Content-Type:application/json" \
-d '{"name": "hoge"}'


{
  "args": {},
  "data": "{\"name\": \"hoge\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/json",
    "Host": "localhost",
    "User-Agent": "curl/8.1.2"
  },
  "json": {
    "name": "hoge"
  },
  "origin": "172.17.0.1",
  "url": "http://localhost/post"
}
```

### 問題 3

```
norifumikimura@MacBook-Pro ~ % curl -X POST http://localhost:80/post \
-H "Content-Type:application/json" \
-d '{"userA": {"name": "hoge", "age": 29}}'


{
  "args": {},
  "data": "{\"userA\": {\"name\": \"hoge\", \"age\": 29}}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "38",
    "Content-Type": "application/json",
    "Host": "localhost",
    "User-Agent": "curl/8.1.2"
  },
  "json": {
    "userA": {
      "age": 29,
      "name": "hoge"
    }
  },
  "origin": "172.17.0.1",
  "url": "http://localhost/post"
}
```

### 問題 4

urlencoded なのでデータを key=value で指定する必要がある。

```
norifumikimura@MacBook-Pro ~ % curl -X POST http://localhost:80/post \
-H 'Content-Type:application/x-www-form-urlencoded' \
-d "name"="hoge"
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "hoge"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "9",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "localhost",
    "User-Agent": "curl/8.1.2"
  },
  "json": null,
  "origin": "172.17.0.1",
  "url": "http://localhost/post"
}
```

### postman で curl コマンドを再現

問題 1

```
curl --location --request GET 'http://localhost:80/headers' \
--header 'X-Test: hello'
```

問題 2

```
curl --location --request POST 'http://localhost:80/post' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "hoge"}'

```

問題 3

```
curl --location --request POST 'http://localhost:80/post' \
--header 'Content-Type: application/json' \
--data-raw '{"userA": {"name": "hoge", "age": 29}}'
```

問題 4

```
curl --location --request POST 'http://localhost:80/post' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'name=hoge'
```

### curl に関するクイズ

```
クイズ: なぜWarningが出てくるのでしょうか。

$ curl localhost:8080 -X POST -F "hoge=fuga" -d "fuga=piyo"
$ Warning: You can only select one HTTP request method! You asked for both POST
$ Warning: (-d, --data) and multipart formpost (-F, --form).

答え：
-F では Content-Type: multipart/form-data で、
-d では Content-Type: application/x-www-form-urlencodedになる。
どちらもHTTPリクエストのボディをセットするが、どちらか一つを選べば問題ない。
```

### postman に関するクイズ

1. 2023 年にパフォーママンステスト昨日が[リリース](https://learning.postman.com/docs/collections/performance-testing/testing-api-performance/)されました。実際に使ってみてください。
