---
title: 'リードタイムを返すスクリプトを書いた'
date: '2022-04-17'
category: 'dev'
---

チームでリードタイムの可視化を始めていて、それを実現するミニマムなスクリプトを書いた。  
[dotfiles/gh-leadtime.rb](https://github.com/kenzo-tanaka/dotfiles/blob/master/utils/gh-leadtime.rb)

こんな感じで使う。

```shell
USERS=kenzo-tanaka FROM=2022-04-07 TO=2022-04-12 ACCESS_TOKEN=xxx OWNER=kenzo-tanaka REPO=dotfiles BASE=master ruby <(curl -s https://raw.githubusercontent.com/kenzo-tanaka/dotfiles/master/utils/gh-leadtime.rb)

# 指定した期間でマージされたPRの本数
# PRの番号
# リードタイム(PRの作成-Mergeされるまで)の平均
# diff(additions+deletions)の平均
pulls: 2, nums: 25834 25790, leadtime: 48.89, diff_average: 246
```

データをダッシュボード的に見れるようにするところまでは作っておらず、上記の結果をスプシとかに貼り付けて可視化している。
