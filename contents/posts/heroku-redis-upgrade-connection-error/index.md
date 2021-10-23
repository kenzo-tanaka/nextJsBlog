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

HobbyプランではTLSと非暗号化接続両方をサポートしているが、プロダクションプラン（Premiumなど）ではTLS接続が必要。  
プレミアムプランではRedis6に接続するために、クライアント側でTLSを有効化する必要がある。

[Heroku Redis | Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-redis#provisioning-the-add-on)

Herokuは内部的にはSSLを使用おらず、ルーターのレイヤーでSSL認証してHTTPでアプリケーションにリクエストを転送する。

> From version 6 and above, Redis requires using TLS to connect. However, Heroku does not use SSL internally. They terminate SSL at the router level and forward requests from there to your application via HTTP which is safe as all these do happen behind Heroku’s firewall.

[How to solve the SSL error for Redis 6 on Heroku? | ogirginc](https://ogirginc.github.io/en/heroku-redis-ssl-error)

> インバウンドリクエストは、SSL ターミネーションを提供するロードバランサーによって受信されます。リクエストは、ここから一連のルータに直接渡されます。
ルーターは、アプリケーションの Web ​dyno​ の場所を判断し、これらの dyno のいずれかに HTTP リクエストを転送する役割を担います。

[HTTP ルーティング | Heroku Dev Center](https://devcenter.heroku.com/ja/articles/http-routing)

## 対処

```rb
# config/initializers/redis.rb
$redis = Redis.new(url: ENV["REDIS_URL"], ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE })
```

Sidekiqの設定だけ変えたい場合はこんなふうにもできる。

```rb
# config/initializers/sidekiq.rb
Sidekiq.configure_server do |config|
  config.redis = { ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end

Sidekiq.configure_client do |config|
  config.redis = { ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end
```

## 関連記事

- [Redis Connection Issues - Heroku Help](https://help.heroku.com/HC0F8CUS/redis-connection-issues)
- [Heroku Redis | Heroku Dev Center](https://devcenter.heroku.com/articles/heroku-redis#connecting-in-ruby)
- [Redis 6 on Heroku Premium breaks ActionCable config · Issue #2420 · chatwoot/chatwoot](https://github.com/chatwoot/chatwoot/issues/2420)
- SSL Terminationとは: [ELBでSSL Termination後の内部通信を暗号化する | DevelopersIO](https://dev.classmethod.jp/articles/elb-ssl-termination/)


