---
title: "Algoliaに登録するJSONファイルを生成してアップロードするスクリプトを書いた"
date: "2021-05-15"
category: "dev"
---

当ブログでは検索機能で Algolia を使っています。Algolia で検索可能にするため、レコードを登録するスクリプトを書いたのでその実装メモです。Algolia の導入方法は以下の記事にまとめています。  
[【雑メモ】Next.js のブログに Algolia の検索機能を導入した。](https://kenzoblog.vercel.app/posts/next-and-algolia)

## Algolia にレコードを登録する 3 つの方法と注意点

Algolia にレコードを追加するには、3 つ方法があります。

- ダッシュボードから手動で追加
- ダッシュボードから JSON ファイルを選択してアップロード
- API 経由で追加 ([Add Objects | Indexing | Method | API Reference | Algolia Documentation](https://www.algolia.com/doc/api-reference/api-methods/add-objects/))

今回は 3 つ目の方法を使います。

ちなみに 2,3 の方法を使う際の注意点としては、レコードの内容が重複していても登録されてしまうので、差異分だけを登録する必要があります。
ダッシュボードの 1 文 ↓

> Uploading a file will add records to this index; it will not erase previous records.

## 追加記事の検出方法

Algolia にすでに登録済のレコードはアップロードしたくないので、差異を検出するロジックをつくります。

1. すべての記事情報を管理する JSON ファイルを作成しておく
2. 記事を追加した時、1 との差異だけを抽出した JSON ファイルを作成する
3. すべての記事情報を管理する JSON ファイルを更新する

## 実装

[前回の記事](https://kenzoblog.vercel.app/posts/next-and-algolia)で作成したスクリプトに改良を加えていきます。  
インラインでコメントを残しています。

```ts:builders/algolia.ts
// 色々必要なものをimport
import fs from "fs";
import { PostData } from "../types";
// 現在の記事一覧をオブジェクトの配列として返す関数
import { getSortedPostsData } from "../lib/posts";
import algoliasearch from "algoliasearch";

// algoliaのappid,apikeyを.envから読み込むために必要
require("dotenv").config();

// 変数を色々定義
const basicPath = "./data/";
const allArtilcesPath = basicPath + "all-articles.json";
const client = algoliasearch(
  `${process.env.ALGOLIA_APP_ID}`,
  `${process.env.ALGOLIA_ADMIN_KEY}`
);
const index = client.initIndex("kenzo_blog");

// タイムスタンプを含んだファイル名を生成して返す関数
const generateFilename = () => {
  const today = new Date();
  const timeStamp =
    today.getFullYear() +
    String(today.getMonth() + 1).padStart(2, "0") +
    String(today.getDate()).padStart(2, "0") +
    "-" +
    String(today.getTime());
  return basicPath + timeStamp + "-algolia.json";
};

// 既存の「すべての記事」ファイルを読み込んでStringで返す
const generatePastJsonString = () => {
  const pastPostsArray = JSON.parse(fs.readFileSync(allArtilcesPath, "utf8"));
  return JSON.stringify(pastPostsArray);
};

// 既存の「すべての記事」ファイルと
// 現在の「すべての記事」を比較して
// 差分を返す関数
const generatePostsGap = () => {
  const currentAllPostsArray = getSortedPostsData();
  const pastAllPostsString = generatePastJsonString();

  let postsGap: PostData[] = [];
  currentAllPostsArray.forEach((post: PostData) => {
    const stringPost = JSON.stringify(post);

    if (!pastAllPostsString.includes(stringPost)) {
      postsGap.push(post);
    }
  });
  return postsGap;
};

const updateAllArticles = () => {
  const allArtilces = getSortedPostsData();
  fs.writeFile(allArtilcesPath, JSON.stringify(allArtilces), (err) => {
    if (err) throw err;
    console.log(allArtilcesPath + " への書き込みが完了しました。");
  });
};

const createJson = () => {
  const newFile = generateFilename();
  const data = generatePostsGap();

  // 差分があったときのみタイムスタンプ付きのファイルを生成して書き込み & Algoliaへレコードを登録する
  if (data.length !== 0) {
    fs.writeFile(newFile, JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log(newFile + " への書き込みが完了しました。");
    });
    updateAllArticles();
    index
      .saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log(
      "差分が検出されなかったため、JSONファイルは作成されませんでした。"
    );
  }
};

createJson();
```
