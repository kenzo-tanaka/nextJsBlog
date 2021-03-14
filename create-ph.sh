# !/bin/bash

if [ $# != 1 ]; then
  echo "PRのタイトルを入力して下さい。"
  exit 1
fi

# 現在のブランチ名を取り出す
# @see https://stackoverflow.com/questions/2111042/how-to-get-the-name-of-the-current-git-branch-into-a-variable-in-a-shell-script
branch=$(git symbolic-ref --short HEAD)

# ブランチ名からIssue番号を取り出す
if [[ ${branch} =~ [0-9]{1,10} ]]; then
  issue_num=${BASH_REMATCH[0]}
fi

# GitHub CLIでPRを作成する
# TODO: IssueのタイトルをPRのタイトルにする
gh pr create --title "$1" --body "close #$issue_num"
echo "PR created!"
