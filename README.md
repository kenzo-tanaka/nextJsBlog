## セットアップ

```shell
$ npm install
$ npm run dev
```

## 記事の追加

引数にはスラグにしたい文字列を指定して、シェルスクリプトを実行して下さい。

```shell
$ bash add-post.sh slug
```

もしサムネイルを指定したい場合には、下記のようにサムネイルを相対パスで指定して下さい。

```
---
title: md
date: "2021-02-19"
category: "dev"
thumbnail: "cat.jpg"
---
```

### 画像の追加

`/contents/posts/{slug}`の下に画像を追加し、それを相対パスで読み込んで下さい。

```md
![alt text](image.png)
```

URL の指定でも動作します。

```md
![alt text](http://image-path...)
```

### Twitter の embed

Twitterの埋め込みコードによって、Embedすることができます。
