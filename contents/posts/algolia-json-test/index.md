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

```js:builders/algolia.ts
const createJson = () => {
  const newFile = generateFilename();
  const data = generatePostsGap();

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
