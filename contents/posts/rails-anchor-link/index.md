---
title: "Railsアプリケーションでscroll-behaviorが正常に動作しない場合の対処"
date: "2021-04-10"
category: "dev"
---

## scroll-behavior: smooth

`scroll-behavior: smooth`を使うとページ内のアンカーリンクへのスクロールを実装できます。  
[scroll-behavior - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)

```html
<nav>
  <a href="#about">About</a>
  <!-- これをクリックすると -->
  <a href="#feature">Feature</a>
</nav>

<div class="container">
  <h2 id="about">About</h2>
  <!-- この位置までスクロールされる -->
  <h2 id="feature">Header</h2>
</div>
```

```css
.container {
  overflow-y: scroll;
  scroll-behavior: smooth;
}
```

## 事象

しかし **Turbolinks がオンになっている Rails アプリケーションでは、スクロールが正しく動作しません**。具体的な動きとしては、以下のようになりました。

- Nav のリンククリック → スクロールが 1 回目は成功する
- 2 回目以降のリンククリックはスクロールされずページトップに戻ってしまう

## 解決策

自分は上記の動作が Turbolink の影響と分かるまで時間がかかりましたが、すでに GitHub ではかなりディスカッションされているようでした。

[Turbolinks should follow same-page anchor links without reloading the page · Issue #75 · turbolinks/turbolinks](https://github.com/turbolinks/turbolinks/issues/75)

上記 Issue を見ている感じだと Turbolinks 側でなにか対応された形跡がないので、現状の解決策としては `data-turbolinks="false"` を設定することだと思います。

```html
<nav>
  <a href="#about">About</a>
  <!-- これをクリックすると -->
  <a data-turbolinks="false" href="#feature">Feature</a>
</nav>
```

Issue にも書いてある通り`<a href='#hoge'>`のリンクを踏んだ際、通常のアンカーリンクの動きならスクロールされるところを Turbolinks がそれを遮って別の HTTP リクエストを作成してしまうことが原因のようです。

Issue の最後の方で「Turbolinks はアクティブに開発されていないので、解決されることはないでしょう」と書かれていました。[hotwired/turbo](https://github.com/hotwired/turbo)では解決されているそうです。

> Turbolinks is no longer under active development so no one should expect this issue to be resolved.  
> On a positive note, it looks like this issue was fixed in the successor to this library ([hotwired/turbo#125](https://github.com/hotwired/turbo/pull/125)).
