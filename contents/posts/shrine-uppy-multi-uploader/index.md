---
title: Shrineとuppyを使ってuploaderごとに署名付きURLを設定する
date: "2021-03-13"
category: "dev"
---

Shrine の`presign_endpoint`を使うと S3 へのダイレクトアップロードを実装できます。

```rb
plugin :presign_endpoint
```

```rb:routes.rb
Rails.application.routes.draw do
  mount Shrine.presign_endpoint(:cache) => "/s3/presign"
end
```

[shrine/direct_s3.md at master · shrinerb/shrine](https://github.com/shrinerb/shrine/blob/master/doc/direct_s3.md)

Shrine は uppy という JavaScript のファイルアップローダーとの相性が良く、Shrine でダイレクトアップロードを実装する際には、下記のように書くことで対応できます。

```js
uppy.use(Uppy.AwsS3, {
  companionUrl: "/photos/presign/",
});
```

しかし、複数の uploader でアップロードするディレクトリの出し分けを行いたい場合、上記の設定では動作せずネットにも情報がほぼなかったので書いておきます。

## 前提

- [Shrine](https://github.com/shrinerb/shrine): v3.3
- [Rails](https://github.com/rails/rails): 6.0.3.4
- [uppy](https://github.com/transloadit/uppy): ^1.25.0

## やりたいこと

- uppy を使ったダイレクトアップロードを採用する
- Shrine の uploader ごとにアップロードするディレクトリを変えたい
  - `VideoUploader` → /videos
  - `ImageUploader` → /images
  - みたいな感じ

## uploader ごとにディレクトリを分ける

Shrine 側の設定で uploader ごとにディレクトリを変えるのはそこまで複雑ではなく、以下の 2 通りのやり方があります。

- プラグインの `default_storage` を使う
- uploader ごとに `@storages` 変数を上書きする

参考:
[Default Storage · Shrine](https://shrinerb.com/docs/plugins/default_storage)  
[Ruby:Shrine で Uploader 個別にアップロード先を設定するメモ - Madogiwa Blog](https://madogiwa0124.hatenablog.com/entry/2018/05/26/101109)
