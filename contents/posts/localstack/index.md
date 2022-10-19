---
title: 'LocalStackを調べたのでまとめ'
date: '2022-02-01'
category: 'dev'
---

Localstackについて調べてみたので、まとめる。

## Localstackとは何か

PCやCI環境で動作するクラウドサービスのemulater(ソフトウェアを擬似実行できるようにするもの)  
AWSのサービスをPC上で再現することができる。SQS, SNSなど幅広いサービスに対応している。

- GitHub: [localstack/localstack: 💻 A fully functional local AWS cloud stack. Develop and test your cloud & Serverless apps offline!](https://github.com/localstack/localstack)
- Document: [Overview | Docs](https://docs.localstack.cloud/overview/)

## インストール

```shell
pip install localstack
python3 -m pip install awscli-local
```

```shell
localstack start -d
```

```shell
# 利用可能、起動中のサービスを確認
localstack status services
```

Localstackを使うための`aws`コマンドのラッパーツール`awscli-local`を使うとSQSのエンキューなどができる。  
[localstack/awscli-local: 💲 "awslocal" - Thin wrapper around the "aws" command line interface for use with LocalStack](https://github.com/localstack/awscli-local)

```shell
pip install awscli-local
```

LocalStack CLIなしでDockerで起動

```shell
docker run --rm -it -p 4566:4566 -p 4571:4571 localstack/localstack
```

## SQSを使う

awslocalはawsコマンドのラッパーなので、同じコマンドを使える。

キューの作成：

```shell
awslocal sqs create-queue --queue-name sample-queue --region ap-northeast-1
```

キューの取得：

```shell
awslocal sqs list-queues  --region ap-northeast-1
```

```shell
awslocal sqs receive-message --queue-url 'http://localhost:4566/00000000000/sample-queue'  --region ap-northeast-1
```

## `aws-sdk-ruby`から使う

これを使ってエンキュー、デキューをやってみる。  
[aws/aws-sdk-ruby: The official AWS SDK for Ruby.](https://github.com/aws/aws-sdk-ruby)

```rb
require 'aws-sdk'
require 'aws-sdk-core'
require 'dotenv'
Dotenv.load

client = Aws::SQS::Client.new(
  region: 'ap-northeast-1',
  access_key_id: ENV['ID'],
  secret_access_key: ENV['KEY']
)

client.send_message({
                      queue_url: "http://localhost:4566/000000000000/foo",
                      message_body: "bar"
                    })

message = client.receive_message({
                              queue_url: "http://localhost:4566/000000000000/foo"
                            })

puts message.messages
```

こんな感じの結果が返される。
```shell
{:message_id=>"xxx", :receipt_handle=>"xxx", :md5_of_body=>"xxx", :body=>"bar", :attributes=>{}, :md5_of_message_attributes=>nil, :message_attributes=>{}}
```

