---
title: "Ransackでチェックボックス検索を実装した時にはまったこと"
date: "2021-05-22"
category: "dev"
---

最近 Ransack でチェックボックスの検索を実装した時に少し嵌ったので、メモを残しておきます。

## 前提

こんな感じのモデルがあるとして、`premier`のプロダクトだけを調べるためのチェックボックスを実装する想定。

```rb
class Product < ApplicationRecord
  enum status: { normal: 0, premier: 1 }
end
```

View では下記のようにチェックボックスを実装。

```slim
= f.check_box :status_eq
span Published
```

## 問題

上記の実装だとチェックをつけたときに、プレミアムだけの絞込みはうまく機能します。  
しかし、チェックを外したとき、`normal`だけの絞り込みになってしまいます。理由は、チェックを外したとき、`status_eq=0`が hidden フィールドで送信されるためです。

## 解決策

`include_hidden: false`を指定するか、`f.check_box :status_eq, {}, 1, nil`のような指定をすれば解消できます。ただし、`ransackable_scopes`を使っている場合だと、後者の指定だとチェック状態が検索結果画面で維持できなかったため、僕は`include_hidden: false`で対応しました。

参考

- [predicate present or true with null checkbox · Issue #434 · activerecord-hackery/ransack](https://github.com/activerecord-hackery/ransack/issues/434)
- [ActionView::Helpers::FormHelper - check_box](https://api.rubyonrails.org/classes/ActionView/Helpers/FormHelper.html#method-i-check_box)
