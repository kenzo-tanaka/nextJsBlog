---
title: "RailsプロジェクトにおけるJavaScript管理方法"
date: "2020-01-21"
category: "dev"
---

「Rails のプロジェクトでの JavaScript 管理方法」について、備忘録も兼ねて書いておきます。あくまで一例なのでもっと良いやり方があれば、教えて頂けると嬉しいです。

まず一番シンプルに「全ての JavaScript コードを`packs/application.js`に書く」というやり方があります。

```js
// ページAで実行したい処理
// ページBで実行したい処理
```

小規模な開発ならこのやり方でいけるのですが、ページ数が増えてくると影響範囲をコントロールできなくなります。  
ページ A の処理がページ B で走ってしまうなどが発生し、意図せぬ挙動があったときに原因の調査も難しくなります。

---

対策として JavaScript の[名前空間](https://developer.mozilla.org/ja/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)を使い、影響範囲をコントロールします。

以下、ざっくりとしたやり方です。

1. view 単位で JS ファイルを作成していきます。  
   例: `welcome#index`ページであれば、packs/javascripts/views/welcome/index.js を作成。
2. `application.js`で view の単位で名前空間を切り、1 の処理を突っ込む
3. view で名前空間に突っ込んだ処理を呼び出す

```js:packs/javascripts/views/welcome/index.js
export default function () {
  // 実装
}
```

```js:packs/application.js
window.HOGE = window.HOGE || {};

import welcomeIndex from "./welcome/index";
window.HOGE.Welcome = window.HOGE.Welcome || {};
window.HOGE.Welcome.Index = window.HOGE.Welcome.Index || {};
window.HOGE.Welcome.Index = welcomeIndex;
```

```slim:app/views/welcome/index.html.slim
javascript:
  window.HOGE.Welcome.Index();
```

上記がベースとなる管理方法で、複数の view で読み込みたい処理がある場合には、その機能単位で JS ファイルを作成します。それを 1 の view 単位の JS ファイルで読み込みます。

```js:packs/javascripts/shared/videoPlayer.js
export default function () {
  // Plyrを使ってvideoタグを装飾する処理
}
```

```js:packs/javascripts/views/welcome/index.js
import videoPlayer from "../../shared/videoPlayer";

export default function () {
  videoPlayer();
}
```

---

ページごとに名前空間を切っていくので、ページを跨いで JavaScript が影響するということを避けられます。  
また View で JS を読み込む際に引数をわたし、それを使って JS の処理を走らせるなども可能になります。

```slim:app/views/videos/show.html.slim
javascript:
  window.HOGE.Videos.Show("#{@video.id}");
```

```js:packs/javascripts/views/videos/show.js
export default function (videoId) {
  // videoIdを使った処理
}
```

View が増えるごとに名前空間を切るため、`application.js`の記述量と JS のファイル数は増えますが、以下の点がメリットとなります。

- 影響範囲を絞れること
- 共通化しすぎると JS の処理の中で条件分岐を書かないといけなくなることがある

この辺りの理由から、基本的には View ごとでファイルを作成するという方針に従った方が良いと考えています。
