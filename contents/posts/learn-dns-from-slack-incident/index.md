---
title: 'Slackの障害からDNSを復習する'
date: '2021-10-01'
category: 'dev'
---

## Slackの障害があった。

今日(2021/10/01)にSlackの障害がありました。  
何回か経験していたので「またかー」くらいの感覚だったのですが、今回は一部のユーザにしか影響が出ていないような状況でした。

> Less than 1% of users may be experiencing trouble connecting to Slack  
> [Status Site](https://status.slack.com/2021-09/06c1e17de93e7dc2)

今回の障害は一部のDNSで発生していて、パブリックDNSを使えば解消できました。

[Get Started | Public DNS | Google Developers](https://developers.google.com/speed/public-dns/docs/using#macos)

パブリックDNSの役割などがいまいちピンと来なかったので、調べた内容をメモしておきます。

## フルリゾルバーの配置、アクセス制限

スタブリゾルバーはWebブラウザやアプリがサイトに到達するために、フルリゾルバーに対して名前解決要求を出します。

通信時間を短縮するため、通常ISPはフルリゾルバーを顧客用ネットワーク内に配置します。  

フルリゾルバーは顧客ネットワーク内に配置され、ISPであれば自社の顧客・社内ネットワークであれば社内からのアクセスにのみ対応ができればよく、逆にどこからでもアクセスができるような状態だと攻撃の踏み台にされる可能性があります。
