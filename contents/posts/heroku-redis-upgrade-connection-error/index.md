---
title: 'Heroku Redisをアップグレードするとコネクションエラーになる件'
date: '2021-10-23'
category: 'dev'
---

Heroku RedisをHobby devプランからPremium0にアップグレードすると、コネクションエラーになる事象があったのでメモです。

## 再現手順

- Heroku RedisのHobby DevプランからPremium0にアップグレードする
- Redisを使った処理を走らせてみる(Sidekiqなど)

[Heroku Redis - Add-ons - Heroku Elements](https://elements.heroku.com/addons/heroku-redis)

## エラーログ

```bash
in `connect_nonblock': SSL_connect returned=1 errno=0 state=error: certificate verify failed (self signed certificate in certificate chain) (OpenSSL::SSL::SSLError)
```

## 原因

HobbyプランではTLSと非暗号化接続両方をサポートしているが、プロダクションプラン（Premiumなど）ではTLS接続が必要。プレミアムプランではRedis6に接続するために、クライアント側でTLSを有効化する必要がある。

[Heroku Redis | Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-redis#provisioning-the-add-on)

Herokuは内部的にはSSLを使用おらず、ルーターのレイヤーでSSL認証してHTTPでアプリケーションにリクエストを転送する。

> From version 6 and above, Redis requires using TLS to connect. However, Heroku does not use SSL internally. They terminate SSL at the router level and forward requests from there to your application via HTTP which is safe as all these do happen behind Heroku’s firewall.

[How to solve the SSL error for Redis 6 on Heroku? | ogirginc](https://ogirginc.github.io/en/heroku-redis-ssl-error)

> インバウンドリクエストは、SSL ターミネーションを提供するロードバランサーによって受信されます。リクエストは、ここから一連のルータに直接渡されます。
ルーターは、アプリケーションの Web ​dyno​ の場所を判断し、これらの dyno のいずれかに HTTP リクエストを転送する役割を担います。

[HTTP ルーティング | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/http-routing)

## 対処

SidekiqでRedisを使用しているので下記の設定を追加する。

```rb
# config/initializers/sidekiq.rb
Sidekiq.configure_server do |config|
  config.redis = { ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end

Sidekiq.configure_client do |config|
  config.redis = { ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end
```

ここで`config.redis`に渡すハッシュはSidekiqの処理の中で`Redis.new`するときのパラメータとして渡る。redis-rbのコードを読むと、`ssl_params`は`OpenSSL::SSL::SSLContext.new`のオブジェクトのパラメータとしてセットされている。

```rb
def self.connect(host, port, timeout, ssl_params)
  # Note: this is using Redis::Connection::TCPSocket
  tcp_sock = TCPSocket.connect(host, port, timeout)

  ctx = OpenSSL::SSL::SSLContext.new

  # The provided parameters are merged into OpenSSL::SSL::SSLContext::DEFAULT_PARAMS
  ctx.set_params(ssl_params || {})
  # ...
end
```

https://github.com/redis/redis-rb/blob/506f9228cc106d1364040a73fb2366cf99e94207/lib/redis/connection/ruby.rb#L227

`OpenSSL::SSL::SSLContext#verify_mode=`のドキュメントがここ。 
[OpenSSL::SSL::SSLContext#verify_mode= (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/OpenSSL=3a=3aSSL=3a=3aSSLContext/i/verify_mode=3d.html)

`OpenSSL::SSL::VERIFY_NONE`の設定はサーバーモードでは証明書を要求せず、クライアントモードでは証明書を検証するが失敗してもハンドシェイクを継続するとのこと。

[OpenSSL::SSL::VERIFY_NONE (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/OpenSSL=3a=3aSSL/c/VERIFY_NONE.html)

## 関連記事

- [Redis Connection Issues - Heroku Help](https://help.heroku.com/HC0F8CUS/redis-connection-issues)
- [Heroku Redis | Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-redis#connecting-in-ruby)
- [Redis 6 on Heroku Premium breaks ActionCable config · Issue #2420 · chatwoot/chatwoot](https://github.com/chatwoot/chatwoot/issues/2420)
- SSL Terminationとは: [ELBでSSL Termination後の内部通信を暗号化する | DevelopersIO](https://dev.classmethod.jp/articles/elb-ssl-termination/)


