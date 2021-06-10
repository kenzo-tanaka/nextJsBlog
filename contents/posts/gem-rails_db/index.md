---
title: "Gem rails_db を触ってみた。"
date: "2021-06-10"
category: "dev"
---

GitHub Explore で流れてきた Gem[igorkasyanchuk/rails_db](https://github.com/igorkasyanchuk/rails_db)を触ってみた。
開発環境でのログインを簡単に切り替えできる Gem[igorkasyanchuk/any_login](https://github.com/igorkasyanchuk/any_login)と同じ人が作っているみたい。

[Railsjazz.com - web and mobile development with Ruby on Rails, Flutter](https://www.railsjazz.com/)

## 導入

Rails 6.0.3.7 を使っているので以下を Gemfile に追記して、`bundle install`実行。

```rb
# Rails >= 6
gem 'rails_db', '>= 2.3.1'
```

`http://localhost:3000/rails/db`にアクセスするとダッシュボードを見れる。とても簡単。

## 機能

レコードの CRUD ができる。

![](img1.png)

スキーマを見ることができる。

![](img2.png)

CSV で Export できる。

![](img3.png)

SQL Editor で SQL を叩いて、その結果を Export できる。

![](img4.png)

## 感想

ビジネスサイドからの「こういうデータ欲しいのだけど」という要望に今までは Heroku Dataclips を使っていたのですが、この Gem があれば SQL を一度用意しておけば History に残るので、ビジネスサイドの人たちで作業を完結できるかも、と思いました。

[Heroku Dataclips が便利という話と PostgreSQL で力技でデータをソートした話](https://kenzoblog.vercel.app/posts/heroku-dataclip)
