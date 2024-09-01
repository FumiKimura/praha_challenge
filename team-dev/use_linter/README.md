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

## 課題2（実装）

### pre-commit hookを作成
huskyとlint-stagedを追加しpre-commit時にlinterを走らせるように変更
```
package.json

    "husky": "^9.1.5",
    "lint-staged": "^15.2.9"
  },
  "lint-staged": {
    "*.{js,ts}": "npx eslint"
  }
```

```> git -c user.useConfigOnly=true commit --quiet --allow-empty-message --file -
[STARTED] Preparing lint-staged...
[COMPLETED] Preparing lint-staged...
[STARTED] Hiding unstaged changes to partially staged files...
[COMPLETED] Hiding unstaged changes to partially staged files...
[STARTED] Running tasks for staged files...
[STARTED] package.json — 3 files
[STARTED] *.{js,ts} — 1 file
[STARTED] npx eslint
[FAILED] npx eslint [FAILED]
[FAILED] npx eslint [FAILED]
[COMPLETED] Running tasks for staged files...
[STARTED] Applying modifications from tasks...
[SKIPPED] Skipped because of errors from tasks.
[STARTED] Restoring unstaged changes to partially staged files...
[SKIPPED] Skipped because of errors from tasks.
[STARTED] Reverting to original state because of errors...
[COMPLETED] Reverting to original state because of errors...
[STARTED] Cleaning up temporary files...
[COMPLETED] Cleaning up temporary files...

✖ npx eslint:

/Users/fumi.kimura/repos/praha_challenge/team-dev/use_linter/sample/index.js
   1:22  error    Strings must use singlequote                                     quotes
   3:7   error    'PORt' is assigned a value but never used                        no-unused-vars
   6:23  error    Strings must use singlequote                                     quotes
   7:31  error    Strings must use singlequote                                     quotes
   7:47  error    Strings must use singlequote                                     quotes
   8:18  error    Strings must use singlequote                                     quotes
  10:31  error    Strings must use singlequote                                     quotes
  10:47  error    Strings must use singlequote                                     quotes
  11:18  error    Strings must use singlequote                                     quotes
  15:41  error    'PORT' is not defined                                            no-undef
  16:3   warning  Unexpected console statement                                     no-console
  16:15  error    Unexpected string concatenation                                  prefer-template
  16:15  error    Strings must use singlequote                                     quotes
  16:43  error    'PORT' is not defined                                            no-undef
  19:1   error    All 'var' declarations must be at the top of the function scope  vars-on-top
  19:1   error    Unexpected var, use let or const instead                         no-var
  19:5   error    'unusedVar' is assigned a value but never used                   no-unused-vars
  19:17  error    Strings must use singlequote                                     quotes

✖ 18 problems (17 errors, 1 warning)
  12 errors and 0 warnings potentially fixable with the `--fix` option.
```

### ローカル環境でのpre-commit hookには、どんな問題点があるでしょうか?

- 異なる設定でpre-commit hookを実行する可能性
- 開発者が意図的にpre-commit hookを無効にすることが可能
- 異なるローカル環境でpre-commit hookが実行されるため、環境によって結果が異なる可能性がある
