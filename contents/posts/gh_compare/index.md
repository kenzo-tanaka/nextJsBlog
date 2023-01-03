---
title: 'GitHubのcommit比較URLを発行するGemを作ったが、bash scriptで十分だった。'
date: '2021-12-21'
category: 'dev'
---

最近GitHubのcommit間の比較URLを発行するGemを作ってみました。

- [kenzo-tanaka/gh_compare: Generate GitHub comparison url.](https://github.com/kenzo-tanaka/gh_compare)

作ってみて「これは単純なロジックなのでbash scriptで十分では..」と思い直して、書き直してみると10数行で書けてしまいました...

- [dotfiles/gh-compare.sh at master · kenzo-tanaka/dotfiles](https://github.com/kenzo-tanaka/dotfiles/blob/master/utils/gh-compare.sh)

curlして実行することができます。
```shell
# 3コミット前〜HEADまでの差分URLを発行する
bash <(curl -s https://raw.githubusercontent.com/kenzo-tanaka/dotfiles/master/utils/gh-compare.sh) 3
```

Gem作りも全く学びがなかったわけではなくて、Ruby の `OptionParser` というClassの存在を知りました。自分でCLIライブラリを作るときなどは、オプションによって挙動を変えたいことがあると思うのですが、そういうときに使えそうです。

- [class OptionParser (Ruby 3.0.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/class/OptionParser.html)


## さいごに
shell芸力を上げていきたい。

