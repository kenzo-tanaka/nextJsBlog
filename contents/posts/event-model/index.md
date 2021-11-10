---
title: 'イベント系エンティティとの出会い'
date: '2021-11-10'
category: 'dev'
---

「**イベント系エンティティ**」という概念がとても面白く、為になったので、紹介してみたいと思います。恐らくRailsから入った人はなかなか辿り着きにくい概念なのではと思っています。

- https://scrapbox.io/kawasima/イミュータブルデータモデル
- [3. Low-Code Development by texta.fm](https://anchor.fm/textafm/episodes/3--Low-Code-Development-emr6k3)
- [27. 論理削除とは何か？どのような解法があるのか？ w/ twada | fukabori.fm](https://fukabori.fm/episode/27)

## 「データ」と「情報」の違い

前段として「**データ**」と「**情報**」の違いを整理します。

- **データ**: 意思を持たない事実の積み重ね、DBに保存される各レコード
- **情報**: 意思を持った人間がある視点からSQL等で抽出したもの

必要な情報は状況や時間軸によって変化するものなので、事前に予測することは難しいです。また特定の情報取得だけを想定したテーブルは、その用途以外では使えないものになってしまいます。  
(e.g. 平均気温だけを記録するテーブルはそれ以外の用途で使えない)

なので、**情報を取得したいと思ったとき正確に取得ができるようにデータを保存しておく**必要があります。

## 「出来事」をテーブルとして設計する

情報の取得のためにデータが重要です。データの欠損によって情報を適切に取得できない場合、企業の信頼性やビジネス機会の損失に繋がることがあります。  
では**どういう時にデータが失われるのか**を考えてみると、それはSQLの`UPDATE`と`DELETE`です。

`DELETE`はレコードの削除なので、そのままです。**`UPDATE`も更新される以前のデータを失ってしまいます**。

> 例えば、上司との関係を持つ社員テーブルがあったとして、`上司ID`をUPDATEしてしまうと、それ以前に誰が上司だったのかが分からなくなります。これが分からないと「社員のパフォーマンスと上司との関係性」などの情報を調べることができません。  
> [3. Low-Code Development by texta.fm](https://anchor.fm/textafm/episodes/3--Low-Code-Development-emr6k3)の話から引用

UPDATEはどういう時に起こるかを考えてみると、その裏には現実世界での「**出来事**」が存在する場合があります。上記の引用の例では、上司の「解任」や「着任」などの出来事です。

こういった「出来事」をテーブルとして切り出したものを**イベント系エンティティ**と呼びます。

## イベント系エンティティを実例で考える

実際の例でイベント系エンティティを考えてみます。

ECサイトなどで**決済テーブル**があるとします。決済テーブルには、決済金額などのデータが格納されています。

```rb
# == Schema Information
#
# Table name: payments
#
#  id             :bigint           not null, primary key
#  amount         :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Payment < ApplicationRecord
end
```

ここに「**返金**」を実装していくことを考えてみます。  
返金を決済データの状態遷移として捉えて、返金されたときにはステータスを更新するような設計だと以下のようになります。これはイベント系エンティティを見落としている実装例です。

```rb
# == Schema Information
#
# Table name: payments
#
#  id             :bigint           not null, primary key
#  amount         :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  status         :integer          default("succeeded"), not null
#
class Payment < ApplicationRecord
  enum status: { succeeded: 1, refunded: 10 }
end
```

上記の実装はいくつか問題があると思います。

まずこのままの状態では「返金日時」を正確に保存できていません。返金の後にも更新されたとすると、返金日時のデータは完全になくなってしまいます。

また、Paymentが決済情報の保存以外に返金に関する処理もするので、単一責任ではなくなります。今の実装では気にならない程度かもしれないですが、「返金日時」「返金理由」などのカラムが入り始めると明らかに多責任になって、見通しが悪くなります。

返金を出来事としてモデリングするともう少しスッキリします。

```rb
# == Schema Information
#
# Table name: refunds
#
#  id             :bigint           not null, primary key
#  payment_id     :bigint           not null
#  amount         :integer          not null
#  reason         :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Refund < ApplicationRecord
  belongs_to :payment
end
```

返金日時は`created_at`で正確に残るようになります。また、ほぼすべてのカラムをNOT NULL制約を入れられるようになります。
返金に関するカラムやメソッド群は全てRefundに移動するので、モデルが単一責任になり、コードの見通しも良くなります。

## Railsで開発を始めた人はこの発想にたどり着きにくいのでは

Railsで開発を始めた人は、上記のようなイベントモデルの発想にはたどり着きにくいのではないかと思います。

- Railsでは `scaffold` すると日時カラムが自動で入り、データを上書きして最新の事実だけが残せば良いというバイアスを生んでいる(気がする)
- イベント系エンティティはエンタープライズシステムでのDB設計から出てきた話なので、Webシステムだけやっているとそもそも出会わない
- Web上の情報や書籍を見つけづらい

なお書籍については、[楽々ERDレッスン](https://amzn.to/3HbhkM6)がまさにイベント系エンティティを取り扱っているのですが、タイトルからは分からないと思います。

また[パーフェクト Ruby on Rails 【増補改訂版】](https://amzn.to/30bJbeo)でもチラッと書いてあるのですが、読んでみないと気づかないと思います。

## 最後に

Web上としては以下のPodcastや記事が非常に参考になります。DB設計をするうえではとても有用な考え方なので、もっと広まれば良いなと個人的には思っています。

- https://scrapbox.io/kawasima/イミュータブルデータモデル
- [3. Low-Code Development by texta.fm](https://anchor.fm/textafm/episodes/3--Low-Code-Development-emr6k3)
- [27. 論理削除とは何か？どのような解法があるのか？ w/ twada | fukabori.fm](https://fukabori.fm/episode/27)
