---
title: "Heroku Dataclipsが便利という話とPostgreSQLで力技でデータをソートした話"
date: "2021-04-15"
category: "dev"
---

## Heroku Dataclips が便利

Heroku を使って長らく開発をしているのですが、社内から〇〇のデータを CSV で吐き出せるようにしてほしいという要望が出てくることがあります。
Rails では CSV 出力は比較的容易に実装できますが、頻繁に使われる機能でないならば Dataclips を使う方が得策だと思います。SQL の勉強にもなり、とても便利なので僕はよく使っています。  
[Sharing Query Results with Dataclips | Heroku Dev Center](https://devcenter.heroku.com/articles/dataclips)

Dataclips を使うと、DB に保存されているデータに対して SQL を書いてデータを出力できます。SQL を書く際は、入力補助がついていたり、Tab キーでインデントできたりと結構リッチな動きをしてくれます。

![](https://devcenter1.assets.heroku.com/article-images/1589213475-autocomplete.png)
参照: https://devcenter.heroku.com/articles/dataclips

出力したデータは CSV か JSON 形式でダウンロードできます。

また Dataclip の URL を共有することで、出力結果を共有することもできます。
![](https://devcenter3.assets.heroku.com/article-images/1596470518-share-link.png)
参照: https://devcenter.heroku.com/articles/dataclips

ただ上記で**生成した URL は特に認証などなしで誰でも参照できてしまう**ので、個人的にはあまり使わない方が良いかなと考えています。CSV でダウンロードした結果を Google SpreadSheet とかに貼り付けて共有する方がセキュアかなと思います。

> Keep these URLs secret. Anyone with the shareable URL can view your dataclip’s results without authenticating.
> [Sharing Query Results with Dataclips | Heroku Dev Center](https://devcenter.heroku.com/articles/dataclips)

## 力技でソートする

概要としてはこんな感じです 👇

- 組織の情報を都道府県順で並び替えした結果がほしい
  - ただし組織のテーブルには都道府県に関する情報は保存されていない
- 組織に紐付いた別テーブルのレコード数も取得したい

こういった「カラムに関係ないソートをしたい」みたいな場合を想定して、MySQL では`field`関数というものがあることを知りました。

- [MySQL FIELD() Function](https://www.w3schools.com/sql/func_mysql_field.asp)
- [mysql の order by field で指定の ID 順に並べる - mikami's blog](https://mikamisan.hatenablog.com/entry/2017/03/22/230615)

```sql
-- idを5,4,6の順に並び替えする
select *
from products
order by field(id, 5, 4, 6)
```

これと同じことがどうやら PostgreSQL ではできなさそうなので、下記を参考に力技でソートする方法を採用しました 😅
[Simulating MySQL's ORDER BY FIELD() in Postgresql - Stack Overflow](https://stackoverflow.com/questions/1309624/simulating-mysqls-order-by-field-in-postgresql)

予め組織のデータ(`id`,`name`)を出力しておいて、それらを都道府県順に並べておきます。それらを下記のように順番に`when`で評価してソートするという感じです。

```sql
-- こんな感じ
SELECT organizations.id, organizations.name, count(posts.id)
FROM organizations
FULL OUTER JOIN posts
ON posts.organization_id = posts.id
GROUP BY posts.id
ORDER BY
  CASE
    when organizations.id=5 then 10
    when organizations.id=8 then 20
    -- 続く
  end;
```

10,20 と間隔をあけているのは、この後に組織が新たに追加されたときに書き換える必要があるからです。プロダクトの性質上そこまで組織がガンガン増えていくような感じでもないので、10 間隔で十分だと判断しました。

もうちょっと良い方法などあれば、教えて下さい 🙏
