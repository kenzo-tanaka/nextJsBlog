---
title: "position: stickyでNavbarを固定したい"
date: "2021-05-15"
category: "dev"
---

Navbar をページトップに固定する実装で、`position: sticky`を使おうとしたところ、思いの外苦戦したためそのメモです。

## `position: sticky`の基本

`position: fixed`で Navbar をページトップに固定したりすると、その下の要素が画面上部に詰まって隠れてしまうので`margin-top`とかで調整する必要があります。
これを`position: sticky`を使うと、`margin-top`の調整などが不要になります。

Mozilla のサイトでは「Sticky は `position: relative`と`position: fixed`のハイブリッド」とのこと。

> Sticky positioning can be thought of as a hybrid of relative and fixed positioning.  
> [position - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position)

## `position: sticky`が動かない場合

`sticky`は親要素に`overflow`の指定があったりすると、固定が正常に動作しないので注意が必要です。僕はこれになかなか気付かず、かなり時間を消費しました..。

> - Position sticky will most probably not work if overflow is set to hidden, scroll, or auto on any of the parents of the element.
> - Position sticky may not work correctly if any parent element has a set height.
> - Many browsers still do not support sticky positioning. Check out which browsers support position: sticky.
>   [Creating a sticky sidebar | Webflow University](https://university.webflow.com/lesson/create-a-sticky-sidebar#:~:text=Troubleshooting%20position%20sticky,-Sometimes%2C%20position%20sticky&text=That%20can%20happen%20for%20many,element%20has%20a%20set%20height.)

```css
body {
  overflow: hidden;
}

.navbar {
  /* 固定されない */
  position: sticky;
  top: 0;
  width: 100%;
}
```

仕事で書いているコードでは画面左右に余白が生じないように、`body`に`overflow`を書いていて、これを剥がすとスマホで表示した時に横スクロールが発生したりする状況でした。

また、Bulma を使っている場合だと、Bulmaa が`html`要素の`overflow-x` `overflow-y`に当てているスタイルが干渉することもあるので、更に注意が必要です。  
CSS フレームワークとして Bulma を使っている場合には、`sticky`を使うのは諦めて、`fixed`を使った Navbar を実装するのが良いでしょう。

[Navbar | Bulma: Free, open source, and modern CSS framework based on Flexbox](https://bulma.io/documentation/components/navbar/#fixed-navbar)
