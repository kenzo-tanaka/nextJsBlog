---
title: "Heroku dataclipが便利という話"
date: "2021-04-15"
category: "dev"
---

Heroku を使って長らく開発をしているのですが、社内から〇〇のデータを CSV で吐き出せるようにしてほしいという要望が出てくることがあります。
Rails では CSV 出力は比較的容易に実装できますが、頻繁に使われる機能でないならば Dataclips を使う方が得策だと思います。
[Sharing Query Results with Dataclips | Heroku Dev Center](https://devcenter.heroku.com/articles/dataclips)

Dataclip を使うと、DB に保存されているデータに対して SQL を書いてデータを出力できます。SQL を書く際は、入力補助がついていたり、Tab キーでインデントできたりと結構リッチな動きをしてくれます。

![](https://devcenter1.assets.heroku.com/article-images/1589213475-autocomplete.png)
https://devcenter.heroku.com/articles/dataclips

出力したデータは CSV か JSON 形式でダウンロードできます。
