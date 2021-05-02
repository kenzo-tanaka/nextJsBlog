---
title: "Next.jsのブログにAlgoliaの検索機能を導入した。"
date: "2021-05-02"
category: "dev"
---

Next．js x Vercel で構成されている当ブログに Algolia 検索を導入した時の実装メモです。PR は以下にまとめています。  
[Feat/Algolia by kenzo-tanaka · Pull Request #205 · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/pull/205)

## 必要なパッケージをインストール

```shell
npm install algoliasearch
npm install react-instantsearch-dom
npm install instantsearch.css # 検索をいい感じにスタイリングしてくれるCSSファイル
```

## Algolia に登録/インデックスを追加/検索対象の属性登録

### 登録

[Sign in | Algolia](https://www.algolia.com/users/sign_in)

### インデックスを追加

インデックスの登録。JSON ファイルのアップロードができるので、ブログのマークダウンファイルのメタデータを JSON ファイルに書き出してアップロードする。

```js:functions/test.ts
import fs from "fs";
import { getSortedPostsData } from "../lib/posts";

const getArticleMeta = () => {
  const posts = getSortedPostsData(); // メタデータを取得してくる
  const data = JSON.stringify(posts); // ファイルに書き込みできるよう変換

  fs.writeFile("algolia.json", data, (err) => {
    if (err) throw err;
    console.log("正常に書き込みが完了しました");
  });
};

getArticleMeta();
```

これを npm スクリプトで実行できるよう下準備する。

```json:tsconfig.builder.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "outDir": "dist",
    "noEmit": false
  },
  "exclude": ["node_modules"],
  "include": ["functions/*.ts"]
}
```

```json:package.json
"scripts": {
  "algolia": "ts-node --project tsconfig.builder.json ./functions/test.ts",
},
```

```shell
npm run algolia
```

生成された JSON ファイルをダッシュボードの Upload file でアップロードする。

![](img1.png)

### 検索対象の属性を登録

僕は記事の `slug`と`title`を検索対象としました。

![](img2.png)
