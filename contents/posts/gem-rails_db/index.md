---
title: "Gem rails_db を触ってみた。"
date: "2021-06-10"
category: "dev"
---

GitHub Explore で流れてきた Gem[igorkasyanchuk/rails_db](https://github.com/igorkasyanchuk/rails_db)を触ってみた。

## 導入

Rails 6.0.3.7 を使っているので以下を Gemfile に追記して、`bundle install`実行。

```rb
# Rails >= 6
gem 'rails_db', '>= 2.3.1'
```

`http://localhost:3000/rails/db`にアクセスするとダッシュボードを見れる。とても簡単。
