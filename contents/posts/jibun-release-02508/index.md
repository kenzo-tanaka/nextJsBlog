---
title: 自分リリースノート v 0.25.08
date: "2021-02-27"
category: "work"
---

## 👨‍💻 技術関連

- 仕事では shrine と uppy を使った動画アップロード機能の実装をした。
- Next.js の翻訳プロジェクト 2 記事目の翻訳を一旦 PR 出すところまで完了させた。
- [GitHub Issue のコメント body をクリックしたら即編集できるようにする JavaScript](https://gist.github.com/kenzo-tanaka/7f0681cd33230c63c338df5faeaaa044) を作成して Bookmarklet で使っている
- ブログにカテゴリーを実装した。
- ブログに関連記事を実装した。
- ジャーナリングをリマインドする GitHub Actions を書いて、GitHub Actions について少し理解した。
- react-markdown の README で 404 のリンクがあったので修正する Issue/[PR](https://github.com/remarkjs/react-markdown/pull/543)を作成した。
- ブログの画像ファイルなどの管理を各 slug/ 下に画像を入れて相対パスで読める状態にした。
  - [Next.js ブログにおける画像ファイル管理](https://kenzoblog.vercel.app/posts/nextjs-blog-asset) 記事にした。
  - その後更に改良して URL も指定できる形に変更した。
- 記事中にツイートを埋め込みできるようにした。
- ブログのスタイリングを Tailwind CSS を使って修正

## 📕 読書

**読了**

- 三体

**読んでいる**

- 認知バイアス 心に潜むふしぎな働き

**積読**

- なし

## 📝 アウトプットした記事

- [Alfred のスニペットと VSCode の拡張機能「Markdown All in One」が干渉する件の解決策](https://kenzoblog.vercel.app/posts/alfred-conflicts-vscode-extension)
- [RubyMine の annotate から GitHub でコミットを確認する方法](https://kenzoblog.vercel.app/posts/rubymine-to-github)
- [Kezo Blog を支える技術](https://kenzoblog.vercel.app/posts/blog-dev-stack)
- [【翻訳】NextJS と TypeScript のプロジェクトで Google Analytics を使用する](https://kenzoblog.vercel.app/posts/next-ga)
- [できるだけ苦しまず RubyMine に入門する。](https://kenzoblog.vercel.app/posts/rubymine-catch-up)
- [Next.js ブログに Tailwind CSS を導入した際、記事のスタイルがリセットされる問題](https://kenzoblog.vercel.app/posts/update-style-with-tailwind)
- [【Rails】distinct を使った合計値の計算で意図しない値を返す挙動について調べた。](https://kenzoblog.vercel.app/posts/rails-scope-distinct)
- [Next.js のドキュメント翻訳プロジェクトに参加した。](https://kenzoblog.vercel.app/posts/next-doc-translation)
- [Next.js ブログでマークダウンの記事にツイートの埋め込む](https://kenzoblog.vercel.app/posts/tweet-embed-nextjs)
- [変数とメモリ、ガベージコレクタなどをざっくばらんにまとめる。](https://kenzoblog.vercel.app/posts/var-and-memory)
- [Next.js ブログにおける画像ファイル管理](https://kenzoblog.vercel.app/posts/nextjs-blog-asset)
- [Bookmarklet を使って GitHub をちょっとだけ使いやすくする。](https://kenzoblog.vercel.app/posts/bookmarklet)

## 🐕 振り返り

**Keep**

- 記事のアウトプットを多く出せた。
- 睡眠時間を削らず、毎日しっかり眠れた。
- 開発で詰まった時、他の開発メンバーにヘルプを依頼できた。
- 漫画にハマって余暇の時間も楽しく過ごせた。

**Problem**

- 睡眠の質をより高めたい。
- OSS のコードリーディングの時間を取りたい。
- CS の勉強をしたいがどこからやれば良いか分かっていない。

**Try**

- 21 時からはデジタルデトックスを行う。
- [RubyGem コードリーディングのすすめ](https://blog.freedom-man.com/try-rubygem-codereading)
- CS の勉強の仕方先輩に聞く。

## 🐈 所感

今月は、海外の記事を許可を取って翻訳する、という新しいことにもチャレンジできました。

タスク管理の方法にしばらく迷っていたのですが、エディタでタスク管理する方法が自分には一番しっくりきました。これについては、また後日記事を書きます。

RubyMine, Alfred など今まであまり使いこなしていなかったツールも導入しました。ストレスなく開発を楽しめる環境を徐々に整えていこうと思います。

社会人学生としてどこか通信制の大学で、CS の勉強をするか迷っています。今後数十年エンジニアとしてやっていくならば、まだ若い今の時点で CS の勉強をしておいた方が良さそうだなとぼんやり考えています。
