---
title: Bookmarklet を使って GitHub をちょっとだけ使いやすくする。
date: "2021-02-03"
category: "work"
---

Chrome のブックマークから JavaScript を実行できる Bookmarklet を使って、GitHub をちょっとだけ使いやすくしたのでメモを残しておきます。

## ブックマークレットとは

> ブックマークレット (Bookmarklet) とは、ユーザーがウェブブラウザのブックマークなどから起動し、なんらかの処理を行う簡易的なプログラムのことである[注釈 1]。
> [ブックマークレット - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%AC%E3%83%83%E3%83%88)

## GitHub を使いやすくしてみる

Issue のコメント文章をクリックしたら即編集できるようにします。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">GitHub Issueのコメントをクリックしたら即編集できるようにしたかったので、JavaScriptを書いた。Bookmarkletを使ってブックマークから実行できるようにすると便利。<br><br>コード: <a href="https://t.co/f1NktnLzCE">https://t.co/f1NktnLzCE</a> <a href="https://t.co/cSbNzKwYlv">pic.twitter.com/cSbNzKwYlv</a></p>&mdash; 田中建蔵 (@kenzoooooB) <a href="https://twitter.com/kenzoooooB/status/1356594913782075397?ref_src=twsrc%5Etfw">February 2, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

```js
document.querySelectorAll(".comment-body").forEach((comment) => {
  comment.addEventListener("click", (e) => {
    const editLink = e.target
      .closest(".edit-comment-hide")
      .parentElement.querySelectorAll(".timeline-comment-action")[1];
    editLink.click();
    setTimeout(() => {
      editLink.parentElement.querySelector(".js-comment-edit-button").click();
    }, 1000);
  });
});
```

処理としては単純で各コメントの body に対して、クリック時に発火するイベントリスナーを仕込んでいます。
body がクリックされたらコメントヘッダーの三点をまずはクリックします。これをまずクリックしないと「Edit」の DOM はレンダリングされません。

`setTimeout`で時差実行しているのは、アニメーションが完了して Edit リンクがレンダリングされるのを待つ時間です。

## ブックマークレットにコードを仕込む

```js
javascript: (function () {
  document.querySelectorAll(".comment-body").forEach((comment) => {
    comment.addEventListener("click", (e) => {
      const editLink = e.target
        .closest(".edit-comment-hide")
        .parentElement.querySelectorAll(".timeline-comment-action")[1];
      editLink.click();
      setTimeout(() => {
        editLink.parentElement.querySelector(".js-comment-edit-button").click();
      }, 1000);
    });
  });
})();
```

上記コードをそのままブックマークの URL に入れても動くのですが、若干不安定でした。
[Closure Compiler Service](https://closure-compiler.appspot.com/home) を使ってコードをコンパイルしてから、動かしたところかなり安定しているのでこちらがおすすめです。

```js
javascript: (function () {
  document.querySelectorAll(".comment-body").forEach(function (b) {
    b.addEventListener("click", function (c) {
      var a = c.target
        .closest(".edit-comment-hide")
        .parentElement.querySelectorAll(".timeline-comment-action")[1];
      a.click();
      setTimeout(function () {
        a.parentElement.querySelector(".js-comment-edit-button").click();
      }, 1e3);
    });
  });
})();
```
