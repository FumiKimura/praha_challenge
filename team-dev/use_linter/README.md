# linterを使おう

## 課題1(質問)

### ESLintが定義するルールの中から、最重要だと感じるルールを5つ挙げてください
1. no-cond-assign
    - if、for、while、do...while文の条件文における代入を許可しない
    - `if(x = 3)`のような
2. no-dupe-else-if
    - if-else-ifで重複した条件を許可しない
3. no-duplicate-case
    - switch文ないの重複条件を許可しない
4. no-debugger
    - debugger文を許可しない
5. eqeqeq
    - `===`と`!==`を強制する

### このconfigを読み込んで、適当なプロジェクトでlintをかけてみましょう

```
const http = require("http");

const PORT = 3000;

function handleRequest(request, response) {
  if (request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello World");
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("Not Found");
  }
}

http.createServer(handleRequest).listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

var unusedVar = "This variable is not used";
```

```
/Users/fumi.kimura/repos/praha_challenge/team-dev/use_linter/sample/index.js
   1:22  error    Strings must use singlequote                                     quotes
   6:23  error    Strings must use singlequote                                     quotes
   7:31  error    Strings must use singlequote                                     quotes
   7:47  error    Strings must use singlequote                                     quotes
   8:18  error    Strings must use singlequote                                     quotes
  10:31  error    Strings must use singlequote                                     quotes
  10:47  error    Strings must use singlequote                                     quotes
  11:18  error    Strings must use singlequote                                     quotes
  16:3   warning  Unexpected console statement                                     no-console
  16:15  error    Unexpected string concatenation                                  prefer-template
  16:15  error    Strings must use singlequote                                     quotes
  19:1   error    All 'var' declarations must be at the top of the function scope  vars-on-top
  19:1   error    Unexpected var, use let or const instead                         no-var
  19:5   error    'unusedVar' is assigned a value but never used                   no-unused-vars
  19:17  error    Strings must use singlequote                                     quotes

✖ 15 problems (14 errors, 1 warning)
  12 errors and 0 warnings potentially fixable with the `--fix` option.
```