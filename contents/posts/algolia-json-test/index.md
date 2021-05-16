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

> Uploading a file will add records to this index; it will not erase previous records.
