---
title: Shrineとuppyを使ってuploaderごとに事前署名付きURLを設定する
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
  companionUrl: "/s3/presign/",
});
```

複数の uploader でアップロードするディレクトリの出し分けをしつつ、uppy の事前署名付き URL を使いたい場合の設定方法がネットにも情報がほぼなかったので書いておきます。

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

`default_storage` を使った実装例は GitHub で検索するといくつかヒットするので参考になると思います。  
[Search · "plugin :default_storage"](https://github.com/search?q=%22plugin+%3Adefault_storage%22&type=code)

## uppy の companionUrl に合わせるため routes.rb の設定を変更

まず uppy の companionUrl に設定したパスには、自動で`/s3/params`が付与されます。GitHub で調べてみたのですが、関連する実装としてはこの辺りかなと思います。

[uppy/index.js at transloadit/uppy](https://github.com/transloadit/uppy/blob/d4e9e2ed21d94b8e54f513cc88d75efc7a25a943/packages/%40uppy/aws-s3/src/index.js#L130)

事前署名付き URL を発行するエンドポイントを uploader ごとに動的に設定するため、以下では引数を式展開しています。

```js
// uploader は引数とかで受け取っている想定
// 例: /presigns/videos
uppy.use(Uppy.AwsS3, {
  companionUrl: `/presign/${uploader}`,
});
```

routes.rb の設定も上記のエンドポイントを考慮して設定する必要があります。`presign_endpoint`は uploader ごとの設定が可能なため、以下のように設定します。

```rb:routes.rb
# uploader ごとに presign_endpoint を設定
# 末尾に /s3/params と付けているのはuppyのcompanionUrlに合わせるため
mount VideoUploader.presign_endpoint(:cache) => '/presign/videos/s3/params'
mount ImageUploader.presign_endpoint(:cache) => '/presign/images/s3/params'
```

[Presign Endpoint Setup · Shrine](https://shrinerb.com/docs/plugins/presign_endpoint#setup)
