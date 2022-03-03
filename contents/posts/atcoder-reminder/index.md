---
title: 'Atcoderで間違えた問題を復習する仕組みを作った'
date: '2022-03-03'
category: 'dev'
---

Atcoderで間違えた問題を復習する仕組みを作ったので、それの実装メモです。

[kenzo-tanaka/my-atcoder: Submissions of Atcoder.](https://github.com/kenzo-tanaka/my-atcoder)

## モチベーション

- Atcoderで間違えた問題を復習したいが、手動で管理するのは辛い
- 非公式APIを使って、自動で間違えた問題をとってきてほしい

## 実装

Rubyスクリプトが非公式のAPIを叩いて自分のSubmissionをとってきます。  
[AtCoderProblems/api.md at master · kenkoooo/AtCoderProblems](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md)

```rb:request_atcoder.rb
class RequestAtcoder
  def self.get_body(date:)
    unixtime = date.to_time.to_i
    uri = URI("https://kenkoooo.com/atcoder/atcoder-api/v3/user/submissions?user=kenzo1995&from_second=#{unixtime}")
    res = Net::HTTP.get_response(uri)
    res.body
  end

  def self.get_problems(date:)
    prev_day = date
    next_day = date + 1
    result = JSON.parse(get_body(date: prev_day)) - JSON.parse(get_body(date: next_day))
    result = result.select { |x| x["result"] != "AC" }
    result.uniq { |x| [x["contest_id"], x["problem_id"]] }
  end

  def self.yesterday_report
    print get_problems(date: Date.today - 1).to_json
  end

  def self.one_week_ago_report
    print get_problems(date: Date.today - 7).to_json
  end

  def self.one_month_ago_report
    print get_problems(date: Date.today - 30).to_json
  end
end
```

[my-atcoder/request_atcoder.rb at main · kenzo-tanaka/my-atcoder](https://github.com/kenzo-tanaka/my-atcoder/blob/main/request_atcoder.rb)

unixtimeの指定で「昨日間違えた問題」みたいな絞り込みをします。例えば、7日前に間違えた問題は

```shell
7日前に間違えた問題 - 6日前に間違えた問題
```

みたいな感じです。それぞれのメソッドは to_json して出力しています。この出力結果をbashスクリプトでjqコマンドを使って整形します。

```shell:request_atcoder.sh
md_list_format='"- [ ] https://atcoder.jp/contests/" + (.contest_id|tostring) + "/tasks/" +  .problem_id'
echo -e "## 7日前に間違えた問題👨‍💻\n"
ruby -r './request_atcoder' -e 'RequestAtcoder.one_week_ago_report' | jq -r ".[] | .result = $md_list_format | .result"
```

[my-atcoder/request_atcoder.sh at main · kenzo-tanaka/my-atcoder](https://github.com/kenzo-tanaka/my-atcoder/blob/main/request_atcoder.sh)

こんな感じの出力になります。
```md
## 7日前に間違えた問題👨‍💻

- [ ] https://atcoder.jp/contests/tenka1-2015-qualb/tasks/tenka1_2015_qualB_a
```

このbashスクリプトをGitHub Actionで定時実行し、結果の文字列を本文にしてIssueを作成します。

```yml:.github/workflows/atcoder-reminder.yml
name: run reminder
on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  build:
    name: run script
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Get today's date
        id: date
        run: |
          echo "::set-output name=today::$(date "+%Y/%m/%d")"
      - name: Run script
        id: script
        run: |
          chmod +x ./request_atcoder.sh 
          description=$(bash ./request_atcoder.sh)
          description="${description//'%'/'%25'}"
          description="${description//$'\n'/'%0A'}"
          description="${description//$'\r'/'%0D'}"
          echo $description
          echo "::set-output name=body::$description"
      - name: Create an issue
        uses: actions-ecosystem/action-create-issue@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          title: "Atcoder復習✍️ ${{ steps.date.outputs.today }}"
          body: |
            ${{ steps.script.outputs.body }}
```

こんな感じのIssueが毎朝9時くらいに自動作成されます。  
[Atcoder復習✍️ 2022/03/03 · Issue #19 · kenzo-tanaka/my-atcoder](https://github.com/kenzo-tanaka/my-atcoder/issues/19)


