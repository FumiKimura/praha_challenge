## 課題 1

`useEffectの中で何らかの関数を返すことがあります（cleanupと呼ばれる処理）。なぜこのような処理が必要なのでしょうか？`

現在の仕様では、依存配列が変更された再レンダー時には、React は古い値を使ってクリーンアップ関数を(あれば)実行し、新しい値を使ってセットアップ関数を実行します。こうすることでメモリ内の古いステート情報を消去(クリーンアップ)してメモリーリークを防ぎ、パフォーマンスを向上させることができます。

- useEffect の第 2 引数に
  - 何も指定しなかった場合 -> コンポーネントがレンダリングされるたびに処理が走る
  - 空の配列（[]）を指定した場合 -> コンポーネントのマウント時のみに処理が走る

参考: [React useEffect Cleanup Function](https://refine.dev/blog/useeffect-cleanup/#introduction)

## 課題 2

someFlag が True の際にのみ count を加算する処理を追加。

```
import { useState, useEffect } from "react";

export const SomeComponent = ({ someFlag }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (someFlag) {
      setCount((curCount) => curCount + 1);
    }
  }, [someFlag, count]);

  return <p>レンダリング回数: {count}</p>;
};
```

## 課題 3

第２引数に空配列を指定することでマウント時のみにフックが処理される。

```
import { useEffect, useState } from "react";

export const FetchComponent = () => {
  const [data, setData] = useState({
    subscribers: 0,
    stars: 0,
  });

  // ここでuseEffectを  使ってstar数を取得してみましょう!
  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData({
          subscribers: data["subscribers_count"],
          stars: data["watchers_count"],
        });
      })
      .catch(() => {
        console.log("failed to fetch data");
      });
  }, []);

  return (
    <div>
      <p>ここにReactのGitHubレポジトリに付いたスターの数を表示してみよう</p>
      <p>{data.stars} stars</p>
    </div>
  );
};
```

## 課題 4

`useEffectに関するクイズを作成してください`

count が 0 から 1 に変化した場合の出力はどうなりますか。

```
useEffect(() => {
  console.log('side effect count: ' count)
  return () => {
    console.log('cleanup count: ', count);
  };
}, [count]);
```

答え:
cleanup count: 0
side effect count: 1
