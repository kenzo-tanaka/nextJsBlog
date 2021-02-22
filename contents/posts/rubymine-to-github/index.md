---
title: RubyMineのannotateからGitHubでコミットを確認する方法
date: "2021-02-22"
category: "dev"
---

RubyMine の annotate から GitHub のコミットや Pull Request を開く方法について書きます。

適当なファイルを開いて annotate で行ごとのコミットを確認します。annotate コマンドは Keymap から自分で登録できます。僕は cmd + shfit + b に設定しています。
![](image1.png)

日付と名前になっている箇所をクリックすると、下記キャプチャのようなモーダルが開きます。キャプチャで印をつけた時計マークみたいなやつをクリックすると、Git のウィンドウを開きます。
![](image2.png)

左側の方に GitHub のアイコンがあるので、これをクリックすると Pull Request をブラウザで開くことができます。
![](image3.png)
