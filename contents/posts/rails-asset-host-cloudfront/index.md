---
title: Railsのasset_hostでCloudFrontを指定する場合は、Match Viewer の設定が必要
date: "2021-03-27"
category: "dev"
---

## 事象

`asset_host`の設定で CloudFront の設定を入れている。

```rb:production.rb
config.action_controller.asset_host = 'xxx.cloudfront.net'
```

開発者ツールでサイトを確認したとき、CloudFront 経由で配信している画像などが 301 リダイレクトを返していた。リダイレクト先としては、オリジンサーバになっていた。
`curl`コマンドでヘッダーを確認しても 301 リダイレクトを返すことを確認した。

各画像につきリダイレクトが発生してしまうので、これによりパフォーマンスが悪化していた。

## 対応

CloudFront 側の Origins 設定で Match Viewer を選択した。

> WEB サイトが HTTP のみの場合は問題ないと思いますが、HTTPS を使っている場合は念のため動作確認するのをオススメします。私ははじめ「Match Viewer」を選択し忘れたため、コンテンツが CloudFront にキャッシュされずにオリジンサーバにリダイレクトされていました。(^^;)
> [Amazon CloudFront 設定メモ | あぱーブログ](https://blog.apar.jp/web/1245/)
