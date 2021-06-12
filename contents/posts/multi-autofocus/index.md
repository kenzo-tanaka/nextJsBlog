---
title: "autofocusを複数inputに設定していると、iOS Chrome/Safariでページを開けない事象"
date: "2021-06-12"
category: "dev"
---

Rails プロジェクトで複数の input に対して、`autofocus: true`と設定していたとき、iOS Chrome/Safari の環境で以下のページが表示されるエラーとなった。

![](img1.jpeg)

## autofocus は複数のフィールドに設定してよいか

MDN を見ると以下の記述があるため、複数設定することは想定されているはず。下記の引用の通り、複数の指定があったときは、最初の要素にフォーカスされるという仕様。

> もし複数あった場合、属性がセットされた最初の要素 (通常はページの最初の要素) が初期のフォーカスを得ます。
> [HTMLSelectElement.autofocus - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/HTMLSelectElement/autofocus)

## Turbolinks が原因のよう

Turbolinks のリポジトリで同様の事象を再現している Issue を見つけた。2020/11 月に作成されていてまだクローズされていない。  
[multiple autofocus inputs problems in Mobile Safari / embedded webkit in turbolinks-ios · Issue #589 · turbolinks/turbolinks](https://github.com/turbolinks/turbolinks/issues/589)

事象を再現する Demo ページも用意されている。iOS Chrome か Safari で下記サイトのトップページから「Page two」のリンクに遷移すると、上記キャプチャと同じようにページを開けないエラーになる。ちなみに「Page two」のリンクを直接踏んだときはエラーにならない。
[Page Two | Turbolinks Demo](https://turbolinks-ios14-autofocus.glitch.me/)

上記 Issue のコメントにて「Turbolinks をオフにしたりすれば動作するので、Turbolinks が原因だよね」と。

> Definitely seems to be turbolinks related because on hard refresh the page works and adding `data: { turbolinks: "false" }` to my signup links worked as a hotfix for me.
> [Comment](https://github.com/turbolinks/turbolinks/issues/589#issuecomment-738755245)

## 対処法

- 対象リンク`data: { turbolinks: "false" }`を付与する
- `autofocus`を複数の input にセットするのをやめる
