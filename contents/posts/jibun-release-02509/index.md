---
title: 自分リリースノート v 0.25.09
date: "2021-03-27"
category: "dev"
---

## 👨‍💻 技術関連

- DOGADOZO の速度改善に着手した
  - この際 Google 開発者ツールで画像の処理にどれくらい時間がかかっているかなどを調べる方法を知った
  - Imgix を触り始めた。どの程度速度改善に寄与できるかどうかはまだ見えていない
- ブランチ名に Issue 番号を含める習慣があるため、Issue 番号を切り出して Pull request を作成する Bash スクリプトを書いた
  - [dotfiles/create-pr.sh at master · kenzo-tanaka/dotfiles](https://github.com/kenzo-tanaka/dotfiles/blob/master/utils/create-pr.sh)
- ブログ用の Bash スクリプトも書いた。
  - [nextJsBlog/add-post.sh at main · kenzo-tanaka/nextJsBlog](https://github.com/kenzo-tanaka/nextJsBlog/blob/main/add-post.sh)
- bash から zsh へと切り替えて、設定ファイルを作成した
  - [dotfiles/.zshrc at master · kenzo-tanaka/dotfiles](https://github.com/kenzo-tanaka/dotfiles/blob/master/.zshrc)
  - peco が今までよりサクサク動くようになったので少し快適になった
- 月ごとにタスク管理用 md ファイルを作成する Ruby スクリプトを書いた
  - [todos.rb](https://gist.github.com/kenzo-tanaka/f85997b6232ba9a9bfe0c9793a318b70)
- このブログに Imgbot を入れて、画像の最適化を自動でやってくれるようにした。オープンソースなので無料で使えてとても助かっている
  - [Imgbot · GitHub Marketplace](https://github.com/marketplace/imgbot)
- [#22 「Trello があるので眠れない」 | #omoiyarifm](https://lean-agile.fm/episode/22)に触発されて、毎週 2 記事ブログを書くと決めて月の後半はこれを実行した。また、これを忘れないようにするため GitHub Actions でリマインドするようにした。
- Mac のウィンドウ切り替えを便利にする HyperSwitch を使い始めた。

## 📕 読書

**読了**

- 三体 暗黒森林 Ⅱ

**読んでいる**

- キングダム

**積読**

- パーフェクト Ruby on Rails を買った、まだちゃんと読んでいない。

## 📝 アウトプットした記事

- [Rails の asset_host で CloudFront を指定する場合は、Match Viewer の設定が必要](https://kenzoblog.vercel.app/posts/rails-asset-host-cloudfront)
- [Rails API モードでレスポンスのハッシュに任意の値を持たせつつネストさせたい時の注意点](https://kenzoblog.vercel.app/posts/rails-api-json)
- [Google Chrome をできるだけキーボードのみで操作する](https://kenzoblog.vercel.app/posts/chrome-control-only-keyboard)
- [Shrine の uploader ごとに事前署名付き URL を設定し uppy と組み合わせて使う](https://kenzoblog.vercel.app/posts/shrine-uppy-multi-uploader)
- [Rails でバッチファイルを書く時気にしていること](https://kenzoblog.vercel.app/posts/rails-batch)
- [Seed ファイルで Shrine の upload を使うと、IOError closed stream となる場合の対処](https://kenzoblog.vercel.app/posts/seed-with-shrine)
- [エディターと GitHub でシンプルなタスク管理をする](https://kenzoblog.vercel.app/posts/task-manage-with-editor)

## 🐕 振り返り

**Keep**

- 就寝前にスマホをロックする週間で睡眠の質を高い状態をキープできた（先月の Try を実行できている）
- 週 2 記事ブログを書くと決めて、それを実行できた。またそれを忘れない仕組みを作った
- 朝起きてから 1 時間はスマホをロックして業務に集中する時間を作れた

**Problem**

- Ruby/Rails の定期的な情報収集源がない
- コードリーディングの時間を作っていない
- 業務外でコードを読む、書く時間が体感的に減っている
- 朝始業するまでの時間を使えていない（正直ダラダラしている）

**Try**

- 朝始業するまでの時間でダラダラ時間を昼食の時間まで先延ばしする
- 朝始業するまでの時間で毎日やることを決めておく（あるいは体を動かしながら考える時間を作る）
  - dotfiles を育てる
  - 便利な Gem を調査する
  - 知らない Rails の機能とかを試す

## 🐈 所感

Bash スクリプトに最近ハマり始めて、記事ファイルを作るスクリプトや PR を作成するスクリプトなどある程度形にできたのは良かったです。

週に 2 記事ブログを書くという決まりを作りました。これは割と自分をちょうど良く律してくれている良い習慣になっています。1 つ 1 つの記事の品質は少しずつ高めていきたいと考えています。このブログは Next.js で作られていて、記事の修正 → 反映までを高速にできることが良さなので、過去に書いた記事も時々見返して改善していきたいです。

業務外でのコードを書いたり、読んだりする時間が減っていました。夜の就寝ルーティンは崩したくないので、朝の時間を使って行こうと思っています。 体力があまりないので、自分なりの「持続可能なちょうどいい頑張り具合」を見極めることが、今とても大事だと思っています。
