## リクエストをパースする WEB サーバを作ってみる

### 課題 1

```
const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (req, res) => {
  const response = { text: 'hello world' };
  res.status(200).send(JSON.stringify(response));
});

app.post('/', (req, res) => {
  const headers = req.headers;

  if (headers['content-type'] !== 'application/json') {
    res.status(400);
    res.send('Header is not application/json');
  } else {
    res.status(201).send(JSON.stringify(req.body));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

#### 仕様確認

```
norifumikimura@MacBook-Pro parse_request_web_server % curl localhost:8080 -H "Content-Type: application/json"
{"text":"hello world"}%
```

```
norifumikimura@MacBook-Pro parse_request_web_server % curl localhost:8080 -d '{"name": "hoge"}' -H "Content-Type: application/json"
{"name":"hoge"}%
```

```
url -v localhost:8080 -d '{"name": "hoge"}'
*   Trying 127.0.0.1:8080...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> POST / HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.1.2
> Accept: */*
> Content-Length: 16
> Content-Type: application/x-www-form-urlencoded
>
< HTTP/1.1 400 Bad Request
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 30
< ETag: W/"1e-zydEhZfXjAZGjITTI5Tu/0c6nks"
< Date: Sat, 13 Jul 2024 11:54:13 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
Header is not application/json%
```

### 課題 2

- application/x-www-form-urlencoded はキーと値のペアの形式
- application/json はオブジェクトや配列で階層的なデータ構造を表現
