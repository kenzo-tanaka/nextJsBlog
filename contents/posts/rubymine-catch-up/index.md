---
title: できるだけ苦しまずに RubyMine に入門する。
date: "2021-02-18"
category: "work"
---

仕事で Ruby を書きはじめて 1 年以上 VSCode を使ってたのですが、定義元まで辿ってコードを確かめたいことが増えてきたので、RubyMine に今更入門しました。

ショートカットを覚えるのが面倒なので、ツールをいっぱい使うのは好きじゃないタイプです..。今回はそんな自分ができるだけ苦しまず RubyMine に入門した方法を書きます。

## 前提としてやっておいたほうがいいこと

何か開発系ツールを導入する際には、先輩や同僚あるいはオンラインの動画などで「そのツールでどういうことができるか」を先に把握しておくと、自分でやるときも調べやすいです。

例えば、「RubyMine で Git のコミットメッセージを行ごとに表示できる」と知っていたので `rubymine view commit message` みたいな感じで検索できました。

## 対応方針

- 最低限やりたいことを先に列挙しておいて、覚えることを増やさない
- 慣れている VSCode のキーバインドと RubyMine のキーバインドをあわせる
- それでいて RubyMine の便利機能はしっかり使う

### VSCode でできることを RubyMine でもやる

Preferences → Keymap → 検索などを繰り返しながら、設定しました。`ctrl + d` や `cmd + ↓` などが効かないのは驚きでした。Keymap の検索で探してもなかなか見つからないものを Google で検索して対応しました。

- 設定ウィンドウをショートカットで呼び出せる(cmd + ,)
- データベースへ接続して中身の確認できる
- ターミナルを開く、閉じるをショートカットで呼び出せる(cmd + j で VSCode に合わせた)
- サイドメニューを開くがショートカットで呼び出せる
- ファイル検索をショートカットからできる(cmd + p で VSCode に合わせた)
- ctrl + d で前方消去する
- ctrl + k で前方の行を消去する
- cmd + ↓ でファイル末尾移動ができる
- cmd + d でマルチカーソルにできる
- コミットを実行できる(cmd + k)
- push を実行できる(cmd + shift + k)

### 便利機能を使う

- action → view への移動ができる（一応できたけど、ショートカット検討）
- 実装の定義元へ移動するショートカットが使えている
- commit 履歴を見れるようになっている (cmd + shift + b)
- commit メッセージも辿れるようになっている
- 最近開いたファイルを開ける

### 参考

- [Rails ナビゲーション — RubyMine](https://pleiades.io/help/ruby/product-specific-navigation.html#navigate_shortcut)
- [RubyMine で簡単に行ごとのコミットログを見る方法 (Annotate,Blame) - Qiita](https://qiita.com/spring_aki/items/04c229a771e44396c4fd)
- [忙しい人のための IntelliJ IDEA ショートカット集（´-`） - Qiita](https://qiita.com/yoppe/items/f7cbeb825c071691d3f2#-%E6%9C%80%E8%BF%91%E9%96%8B%E3%81%84%E3%81%9F%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E8%A1%A8%E7%A4%BArecent-files)
- [忙しい人のための IntelliJ IDEA ショートカット集（´-`） - Qiita](https://qiita.com/yoppe/items/f7cbeb825c071691d3f2#-%E3%83%9E%E3%83%AB%E3%83%81%E3%82%AB%E3%83%BC%E3%82%BD%E3%83%ABadd-selection-for-next-occurrence)
- [RubyMine で ctrl+d で前方消去をしたいときの keymap の設定 - Qiita](https://qiita.com/sukebeeeeei/items/456acd50f2256861334d)
- [Is there to invoke "scroll to the end" button in console – IDEs Support (IntelliJ Platform) | JetBrains](https://intellij-support.jetbrains.com/hc/en-us/community/posts/206111519-Is-there-to-invoke-scroll-to-the-end-button-in-console)
