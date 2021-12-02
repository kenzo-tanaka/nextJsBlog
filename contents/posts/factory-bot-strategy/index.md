---
title: 'factory_botと学ぶデザインパターン [Strategyパターン]'
date: '2021-12-02'
category: 'dev'
---

最近[factory_bot](https://github.com/thoughtbot/factory_bot)のコードを読み始めました。
factory_botにはいくつかのデザインパターンが実装されていて、`create`や`build`メソッドの定義には、Strategyパターンが使われています。

factory_botのコードを追いながら、Strategyパターンについて学ぶ記事です。

## Strategyパターンの紹介

**ポリモーフィズムを使ってアルゴリズムの切り替えを可能にするデザインパターン**です。簡略化したコードでは以下のようなイメージです。呼び出し側は、状況に応じてどのアルゴリズムを使うかを選択してアルゴリズムの切り替えができます。

```rb
class AlgorithmA
  def print_name
    p 'AlgorithmA'
  end
end

class AlgorithmB
  def print_name
    p 'AlgorithmB'
  end
end

class Main
  attr_reader :algorithm

  def initialize(algorithm)
    @algorithm = algorithm
  end

  def execute
    algorithm.print_name
  end
end

# Client
Main.new(AlgorithmA.new).execute
Main.new(AlgorithmB.new).execute
```

もしStrategyパターンを使わないとすると条件分岐が`Main#execute`の中に入ってきます。

```rb
class Main
  def execute
    if some_condition
      AlgorithmA.new.print_name
    else
      AlgorithmB.new.print_name
    end
  end
end
```

こうなるとアルゴリズムのパターンが増えたときには条件分岐が増え、可読性・保守性が下がります。なので、`execute`の中の条件分岐を外(AlgorithmA, AlgorithmB)に追いやり、責務を移譲するのがStrategyパターンです。

結城浩さんのデザインパターンの本では、じゃんけんの戦略を呼び出し側で切り替えする実装例が紹介されています。

[増補改訂版 Java言語で学ぶデザインパターン入門](https://amzn.to/31hNANH)


## factory_botの`create`メソッド

factrory_botを使うと以下のように書いて、インスタンスの生成ができます。

```rb
let(:user) { create(:user) }
```

`create`メソッドは、factory_botが`FactoryBot::Syntax::Methods`モジュールに定義されているメソッドです。include することによって使えるようになります。

```rb:rails_helper.rb
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

## Strategyパターンを使った`create`メソッドの定義

`FactoryBot::Syntax::Methods`に`create`メソッドが直接書かれている訳ではなく、実装は外から[`define_method`](https://docs.ruby-lang.org/ja/latest/method/Module/i/define_method.html)によって定義されています。Strategyパターンを使って実装されています。

`FactoryBot::Internal.register_default_strategies`で、メソッド名に対応するクラスを指定しています。

```rb:lib/factory_bot/internal.rb
def register_default_strategies
  register_strategy(:build, FactoryBot::Strategy::Build)
  register_strategy(:create, FactoryBot::Strategy::Create)
  register_strategy(:attributes_for, FactoryBot::Strategy::AttributesFor)
  register_strategy(:build_stubbed, FactoryBot::Strategy::Stub)
  register_strategy(:null, FactoryBot::Strategy::Null)
end
```

各メソッドを`FactoryBot::Syntax::Methods`に定義するのは、`lib/factory_bot/strategy_syntax_method_registrar.rb`で行われます。

```rb:lib/factory_bot/strategy_syntax_method_registrar.rb
def define_singular_strategy_method
  strategy_name = @strategy_name

  define_syntax_method(strategy_name) do |name, *traits_and_overrides, &block|
    FactoryRunner.new(name, strategy_name, traits_and_overrides).run(&block)
  end
end

def define_syntax_method(name, &block)
  FactoryBot::Syntax::Methods.module_exec do
    if method_defined?(name) || private_method_defined?(name)
      undef_method(name)
    end

    define_method(name, &block)
  end
end
```
