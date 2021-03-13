---
title: Shrineとuppyを使ってuploaderごとに署名付きURLを設定する
date: "2021-03-13"
category: "dev"
---

Shrine の`presign_endpoint`を使うと S3 へのダイレクトアップロードを実装できます。

```rb
plugin :presign_endpoint
```
