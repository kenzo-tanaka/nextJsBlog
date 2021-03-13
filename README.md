## セットアップ

```shell
$ npm install
$ npm run dev
```

## 記事の追加

引数にはスラグにしたい文字列を指定して、シェルスクリプトを実行して下さい。

```shell
$ ./add-post.sh slug
```

作成したディレクトリの下に、`index.md` を作成して下さい。

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

`twitter` のコードブロックを作成し、ツイート ID を記述して下さい。

````md
```twitter
1353188620912402433
```
````

## 履歴書を PDF で出力

下記を実行して、`/contents/pages/about/index.pdf`を確認して下さい。

```shell
$ md-to-pdf contents/pages/about/index.md
```

## GitHub Actions

`create issu` というワークフローが毎月 27 日に実行されます。これは、月次の振り返りをする自分リリースノート執筆リマインダーです。
