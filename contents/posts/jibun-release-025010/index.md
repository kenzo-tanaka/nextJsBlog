---
title: 自分リリースノート v 0.25.10
date: "2021-04-27"
category: "dev"
thumbnail: "cat.jpg"
---

## 👨‍💻 技術関連

- 実務ではパフォーマンス改善をいくつかデプロイした。imgix と遅延ロードの導入により PC 環境では以前ほどのもっさり感はなくなったはず
- 社内の色々対応として Heroku Dataclips を使って SQL を書いていた。
- Google Analytics(以下 GA) と Google Tag Manager(以下 GTM) を連携させつつ、コンバージョンを適切に計測できるようにする下地の実装をした。
  - サイト内検索を GA でトラッキングできるようにした。
  - Search Console と GA を連携させた。
  - video タグの動画が再生されたときに、イベントを飛ばす設定を GTM で行った。
  - またこれらの各種設定はネットで手に入りにくい情報だったので社内 Doc にした。
- 仕事で Next.js でサイト作成を開始した。
- ブログに Jest を導入、会社のサイトでもテストを書き始めた。

## 📕 読書

**読了**

- Lean と DevOps の科学
  - デプロイ頻度などの開発の指標が組織の収益性にも紐付いているなど面白い話が書いてあり、社内のメンバーにも軽く共有した。今の会社の開発もかなりデプロイ頻度あげられていて、これは自分のモチベーションにも繋がっていると実感した。
  - [NewsPicks に CTO として入社して 1 年で DX Criteria を大幅改善した話 - Uzabase Tech](https://tech.uzabase.com/entry/2021/01/28/190209)を併せて読むと面白かった。
- 事業をエンジニアリングする技術者たち
  - VOYAGE の開発の様子などがリアルに描画されていて、自分の状況などと照らし合わせながら読むと面白かった。
- DNS がよく分かる教科書(再読)
- サピエンス全史

**読んでいる**

- 息吹
- Netflix コンテンツ帝国の野望

**積読**

## 📝 アウトプットした記事

3/27 - 04/27

- [Next.js x TypeScript のブログに Jest を導入した。](https://kenzoblog.vercel.app/posts/jest-beginner)
- [Ransack の検索結果を Google Analytics で可視化する](https://kenzoblog.vercel.app/posts/ga-ransack)
- [「Engineers in VOYAGE ― 事業をエンジニアリングする技術者たち」を読んだ感想](https://kenzoblog.vercel.app/posts/voyage-book)
- [Heroku Dataclips が便利という話と PostgreSQL で力技でデータをソートした話](https://kenzoblog.vercel.app/posts/heroku-dataclip)
- [ransackable_scopes を使う際の注意点](https://kenzoblog.vercel.app/posts/ransackable-scopes)
- [Rails アプリケーションで scroll-behavior が正常に動作しない場合の対処](https://kenzoblog.vercel.app/posts/rails-anchor-link)
- [Google Tag Manager を使いつつ GA のコンバージョンを確認できるようにする](https://kenzoblog.vercel.app/posts/gtm-conversion)
- [imgix-rails でパフォーマンス改善をする時の設定と注意点](https://kenzoblog.vercel.app/posts/imgix-rails)
- [Rails の asset_host で CloudFront を指定する場合は、Match Viewer の設定が必要](https://kenzoblog.vercel.app/posts/rails-asset-host-cloudfront)

## 🐕 振り返り

**Keep**

- GA や GTM などに関する知見を深めることができた。この辺りはサブスキルとして伸ばしていきたい。
- 社内に共有すべき知見を文書化できている。
- サイト改善についてイニシアチブを取りながらも、社内メンバーの意見を潰さず改善に取り込むよう動くことができた。
- FAQ サイトにがっと集中的に取り組み、形にできた。FAQ のデータをオブジェクトの配列として管理する方法も今の所うまく行っている。
- 週 2 記事のブログ記事も継続できている。
- 就寝前の時間で 15-30 分 ほどは技術書などを読書する習慣がついてきた。「毎日活字に触れておく」ということが読書の効率をあげるためには一番大事と思う。

**Problem**

- 個人開発をやりたいが、いいアイデアが思い浮かばない。

**Try**

- GW で何か作るものを決めて、実装する。

## 🐈 所感

サービスをグロースさせるフェーズに関わっていて、やりたいことができている良い環境。エンジニアとして軸足を置きながらサービスをグロースさせるところもサブスキルとして伸ばしていきたいと考えているので、ここから数ヶ月でその辺りのインプットもしようかなと。

参考：[わりとドライな、人生への投資とコスパの話｜深津 貴之 (fladdict)｜ note](https://note.com/fladdict/n/n518c6914c98f)
