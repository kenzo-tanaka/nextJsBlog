---
title: 'DockerでFTPサーバーを立ててRubyでアクセスする'
date: '2021-08-26'
category: 'dev'
---

業務でテスト用FTPサーバーを用意してそこからファイルをダウンロードして処理する.. といったことをやったので、その時に調べたことのメモです。
前提として本番環境でアクセスするFTPサーバーがあり、それに対してのアクセスなどを開発環境で再現するコードを書いていきます。


## Dockerで即席のFTPサーバーを構築する

[Docker Pure-ftpd Server](https://github.com/stilliard/docker-pure-ftpd)を使うと、Docker環境上でFTPサーバーを簡単に構築することができます。

まずは最新のDockerイメージをPullしてきます。
```shell
docker pull stilliard/pure-ftpd
```

デタッチモード（バックグランド）でコンテナを立ち上げて、FTPサーバーを起動します。このときホストは`localhost`でポート番号は`21`とします。

```shell
docker run -d --name ftpd_server -p 21:21 -p 30000-30009:30000-30009 -e "PUBLICHOST=localhost" stilliard/pure-ftpd
```

```shell
15:22:05: tanakakenzou $ docker ps
CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                                                                                                      NAMES
4a2afbad395c   stilliard/pure-ftpd   "/bin/sh -c '/run.sh…"   2 minutes ago   Up 2 minutes   0.0.0.0:21->21/tcp, :::21->21/tcp, 0.0.0.0:30000-30009->30000-30009/tcp, :::30000-30009->30000-30009/tcp   ftpd_server
```

ユーザーを作成してパスワードを設定します。

```shell
docker exec -it ftpd_server /bin/bash
root@aaa:/# pure-pw useradd test -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -u ftpuser -d /home/ftpusers/test
```

動作確認としてなにかファイルをアップロードしてみます。
`ftp`コマンドを使うために [tnftp — Homebrew Formulae](https://formulae.brew.sh/formula/tnftp) からインストールしておきます。

```shell
brew install tnftp
```

```shell
ftp -p localhost 21
# 設定したユーザー名、パスワードでログイン
# ローカルにある hoge.txt  ファイルをアップロードする
put hoge.txt
```

## FTPサーバーにRubyでアクセスする

Railsのバッチ処理内でFTPサーバーにアクセスして、ファイルを取得してくる処理です。
下記のバッチ処理を実行するとプロジェクトルート直下に取得したファイルが置かれます。第2引数を`/tmp/hoge.txt`などとすることでファイルの置き場を変更できます。

```rb
require 'net/ftp'

class GetFile
  def self.execute
    ftp = Net::FTP.new
    ftp.connect('localhost', 21)
    ftp.login('test', 'pass')
  
    ftp.get('hoge.txt', 'hoge.txt')
    ftp.close
  end
end
```
