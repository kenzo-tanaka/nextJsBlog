---
title: Herokuのログ確認方法や監視について
date: "2021-01-24"
---

Herokuで不具合等があった際などにログを確認する方法についてです。

## Rollbarを入れておく

Herokuのアドオンとして提供されているRollbarを入れておくと、エラーの検知がしやすくなります。  
[Rollbar - Add-ons - Heroku Elements](https://elements.heroku.com/addons/rollbar)

アプリケーションで例外が生じたときに、メールやSlackなどで通知させることができます。
またRailsアプリケーションでRollbarのGemを入れておけば、エラー捕捉時に任意のメッセージとともにRollbarに通知させるということもできます。

```rb
begin
 # 省略
rescue NoMethodError => e
  Rollbar.error(e)

  # 説明も送信
  Rollbar.error(e, 'The user info hash doesn\'t contain the correct data')
end
```

`ActiveRecord::RecordNotFound`や`ActionController::RoutingError`を拾いたくないという場合には、`rollbar.rb`に設定を加えることで検知しないように設定できます。

[Exception level filters - Ruby](https://docs.rollbar.com/docs/ruby#exception-level-filters)


## HerokuダッシュボードのMetricsを見る

HerokuダッシュボードのMetricsタブからWarningやCriticalなイベントが起こっているタイミング、メモリ消費、レスポンスタイムを確認できる。
- 期間を過去2時間から過去7日間まで変えて確認が可能
- タイムゾーンをAsia/Tokyoにすると確認がしやすい

R14等のエラーコード一覧はこちらで確認できます。  
参考：[Heroku Error Codes | Heroku Dev Center](https://devcenter.heroku.com/articles/error-codes)

僕は以下のような使い方をしています。
- H12(Request timeout)が起こった時間帯にどういうリクエストがあったかを確認する
- R14が常態化している場合は、アクセスが集中しているか・Herokuのスペックがアクセス量に対して足りていないか・DDoS攻撃を受けているかなどを調査


## Herokuダッシュボードから確認する方法

![スクリーンショット 2020-11-15 13 56 06](https://user-images.githubusercontent.com/33926355/99171593-fbc63200-274c-11eb-9e1e-d1bc23e14ae8.png)

Herokuダッシュボードページの右上あたり「View logs」からログの確認ができます。  
僕が使うときは「Autoscroll with output」のチェックをオフにして、自動でスクロールされないようにしてログをじっくり見るようにしています。

![スクリーンショット 2020-11-15 13 57 54](https://user-images.githubusercontent.com/33926355/99171571-fa950500-274c-11eb-8360-4b843d3914bd.png)

HerokuでApplication Errorが出た場合には、ここで吐き出されているログをみて何が原因かを推測することができます。  
また、上記で書いたエラーコードもこのログには表示されるので、エラーコードが出ているタイミングでどういうリクエストが走っているのかを確認することもできます。


## ターミナルからログを確認する方法

上記のWeb UIから確認したログを手元のターミナルからも確認することができます。

```shell
heroku login # cliからまだログインしていない場合は左記コマンド実行
heroku logs --tail --app app_name # app_nameはアプリケーション名
```

--tailというオプションをつけておくことで、リアルタイムのログを追跡して確認することができます。  
また -n オプションで行数を指定してログを出すこともできます。

```shell
heroku logs -n 200
```

参考：[Logging | Heroku Dev Center](https://devcenter.heroku.com/articles/logging)


##  アドオン(Papertrail)を使ってログを確認する方法

HerokuのアドオンであるPapertrailを入れておくとログの確認や、エラーの検知がしやすくなります。  
[Papertrail - Add-ons - Heroku Elements](https://elements.heroku.com/addons/papertrail)

- 検索キーワードを含む行だけを表示
- H, R 系のエラー発生時にはメール通知

無料プランでは上限があるので、規模が大きくなってきたら有料に乗り換えた方が良いかもしれません。
