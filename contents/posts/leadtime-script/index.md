---
title: 'リードタイムを返すスクリプトを書いた'
date: '2022-04-17'
category: 'dev'
---

チームでリードタイムの可視化を始めていて、それを実現するミニマムなスクリプトを書いた。  
[dotfiles/gh-leadtime.rb](https://github.com/kenzo-tanaka/dotfiles/blob/master/utils/gh-leadtime.rb)

## 使い方

こんな感じで使う。

```shell
USERS=kenzo-tanaka FROM=2022-04-07 TO=2022-04-12 ACCESS_TOKEN=xxx OWNER=kenzo-tanaka REPO=dotfiles BASE=master ruby <(curl -s https://raw.githubusercontent.com/kenzo-tanaka/dotfiles/master/utils/gh-leadtime.rb)

# pulls: 指定した期間でマージされたPRの本数
# nums: PRの番号
# leadtime: リードタイム(PRの作成-Mergeされるまで)の平均
# diff_average: diff(additions+deletions)の平均
pulls: 2, nums: 25834 25790, leadtime: 48.89, diff_average: 246
```

## 最小限の実装だけした

リードタイムの可視化などは社内で実績がなく、かなり手探りで進めていくことになりそうだったので、初手は大きく作りすぎないように心掛けた。  
上記のように最小限のデータだけを返して、それをスプシに貼り付けてビジュアル化などをおこなっている。
