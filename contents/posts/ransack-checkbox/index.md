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
