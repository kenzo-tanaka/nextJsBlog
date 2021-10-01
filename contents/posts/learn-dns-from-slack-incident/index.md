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

