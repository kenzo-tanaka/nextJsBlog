# !/bin/bash

if [ $# != 1 ]; then
  echo "記事のスラグとなる引数を1つ指定して下さい。"
  exit 1
fi

mkdir contents/posts/$1
touch contents/posts/$1/index.md
echo "記事作成が正常終了しました。"
exit 1
