---
title: 'test-profを試していたら、let!の挙動を勘違いしていることに気がついた'
date: '2022-02-12'
category: 'dev'
---

## これは何

`test-prof`というGemを試してみた。`let!`の挙動を勘違いしていることに気がついた。

## test-profとは

テストのパフォーマンスを計測できるGem。

- GitHub: [test-prof/test-prof: Ruby Tests Profiling Toolbox](https://github.com/test-prof/test-prof)
- Doc: [TestProf: Ruby tests profiling and optimization toolbox](https://test-prof.evilmartians.io/#/)

テストからのフィードバックの速さは開発者の生産性に影響するので、パフォーマンス改善は重要。DiscourseやDev.toなどのOSSで活用されている。

## Install

```rb
group :test do
  gem "test-prof", "~> 1.0"
end
```

## テストパフォーマンスを計測

`EVENT_PROF`, `FPROF` 変数を渡すと、factory-botでどれくらいデータを生成しているかを計測し、結果を表示してくれる。

- [Event Profiler - TestProf: Ruby tests profiling and optimization toolbox](https://test-prof.evilmartians.io/#/profilers/event_prof?id=quotfactorycreatequot)
- [Factory Profiler - TestProf: Ruby tests profiling and optimization toolbox](https://test-prof.evilmartians.io/#/profilers/factory_prof?id=instructions)

```rb
require 'rails_helper'

RSpec.describe Article, type: :model do
  let!(:articles) { create_list(:article, 10) }

  it { expect(true).to eq true }
  it { expect(true).to eq true }
  it { expect(true).to eq true }
  it { expect(true).to eq true }
end
```

```shell
EVENT_PROF=factory.create FPROF=1 bundle exec rspec /spec/models/article_spec.rb
[TEST PROF INFO] Factories usage

 Total: 40
 Total top-level: 40
 Total time: 00:00.137 (out of 00:00.552)
 Total uniq factories: 1

   total   top-level     total time      time per call      top-level time               name

      40          40        0.1377s            0.0034s             0.1377s            article
```

## let!の挙動を勘違いしていた

上記を走らせたとき`articles`は最初だけ評価されて、Factoryの生成は10では？と最初思っていた。
idとcountを出してみる。

```rb
it do
  expect(true).to eq true
  puts "count: #{Article.count}"
  puts Article.pluck(:id)
end

it do
  expect(true).to eq true
  puts "count: #{Article.count}"
  puts Article.pluck(:id)
end
```

```shell
bundle exec rspec /spec/models/article_spec.rb
count: 10
261
262
...
270
  is expected to eq true
count: 10
271
272
...
280
```

自分がlet!の挙動を勘違いしていたことに気づいた。
`let!`はすべてのexampleの前で呼び出される。RubyMineを使っていれば、RSpec logからも挙動を確認できる。

なので、共通で使うデータを`let!`で定義して、その下で context や it を書きまくるとINSERTが何度も走るので、テストのパフォーマンスが落ちる。

## パフォーマンスを改善するには

共通で使うデータを一度だけINSERTされるようにするには、どうすれば良いか。  
結論、test-profが提供している`before_all`が良さそうな気がしている。

```rb:rails_helper.rb
require "test_prof/recipes/rspec/before_all"
```

```rb
before_all do
  let!(:articles) { create_list(:article, 10) }
end
```

ちなみに、rspecが`before(:all)`というのを提供しているが、これはDBにデータが残り続けるので厄介そうなので使いたくない。
