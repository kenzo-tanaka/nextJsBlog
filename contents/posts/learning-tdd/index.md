---
title: 'TDDを書籍と動画から学ぶ'
date: '2021-11-06'
category: 'dev'
---

ここ1ヶ月くらいTDDについて学んでいます。

- [テスト駆動開発 - kindle](https://amzn.to/3bN4u8y)
- [TDD Boot Camp 2020 Online #1 基調講演/ライブコーディング - YouTube](https://amzn.to/3bN4u8y)

改めて書籍を読んだり[t-wadaさん](https://twitter.com/t_wada)の動画を観たりすると、TDDは自分が思っていたよりも全然奥が深くて様々な発見がありました。

この記事では、書籍や動画から学んだことの中で特に大事だと思ったことをまとめます。

## 最初にわざと失敗し、初歩的なミスを潰す

TDDで最初にテストを書くとき、「**必ず失敗するテスト**」を書きます。

```java
class FizzBuzzTest {
  @Test
  void test() {
    fail("これは失敗するはず");
  }
}
```

この時点で `これは失敗するはず` 以外の理由でテストが落下したとすると、それはテスティングフレームワークが機能していないことになります。

これから大量にテストを書いていくのであれば、テスティングフレームワークのセットアップミスなどは最初に潰すべき問題です。

こういったテストを書く前に潰しておくべき問題をあぶり出すために、わざとテストを失敗させるという手順が有効です。

## テストから書くことで「使う側の視点」に立てる

まだ存在しないクラスやメソッドに対して最初にテストを書くと、そのメソッドを**使う側の視点**に立てます。

> テストを書くときに想像するのは、用途に合った完璧なインターフェースだ。外部から見た振る舞いはどのようなものであるかを想像しよう。  
> [テスト駆動開発](https://amzn.to/3bN4u8y) P.4

使う側の視点に立ち設計を考えることができるので、「作りやすさ」よりも「使いやすさ」を優先したインターフェースを考える機会を提供します。

🙅‍♂️ `hogehoge`メソッドなんて欲しくない

```java
FizzBuzz fizzbuzz = new FizzBuzz();
String actual = fizzbuzz.hogehoge(1);
assertEquals("1", actual);
```

🙆‍♂️ `convert`メソッドにしよう

```java
FizzBuzz fizzbuzz = new FizzBuzz();
String actual = fizzbuzz.convert(1);
assertEquals("1", actual);
```

TDDは設計を駆動する開発手法ともいえます。

## 手が止まったら抽象度を行き来する

TDDを実装を始める前に、やることをTODOリストに書き出します。

```md
- [ ] 数を文字列に変換する
```

```java
class FizzBuzzTest {
  @Test
  void 数を文字列に変換する() throws Exception {

    // テストを書こうとして手が止まる..
    // 具体的に何をやれば良いか分からない
    assertEquals(expected, actual);
  }
}
```

TODOが抽象的な場合、実装で手が止まることがあります。そういった場合は、TODOをより具体化し入力と出力をはっきりさせます。これであれば淀みなく手を動かすことができます。

```md
- [ ] 数を文字列に変換する
  - [ ] 1を文字列1に変換する
```

## テストコードのテスト

テストを書いたら、そのテストを成功させる最もシンプルな実装をします。

```java
class FizzBuzzTest {
  @Test
  void _1を渡すと文字列1を返す() throws Exception {
    FizzBuzz fizzbuzz = new FizzBuzz();
    String actual = fizzbuzz.convert(1);
    assertEquals("1", actual);
  }
}
```

```java
// 作り込み過ぎない
public class FizzBuzz {
  public String convert(int i) {
    return "1";
  }
}
```

こういったテストを通すために書くリファクタ前の実装を「仮実装」と呼びます。仮実装は正しく動くことを疑いようがないほど、シンプルにします。

仮実装の段階でもテストを走らせます。疑いようがないほどシンプルな実装をテストする目的は、「**テストコードのテスト**」のためです。

プロダクションコードは疑いようがないため、この時点でテストが落ちたとするとその原因はテストコードにあります。  
この時点でテストが期待通りにグリーンを返すことを確認することで、「テストコードのテスト」という厄介な問題に対処できます。

## アサーションルーレット

1つのテストメソッドの中に複数のアサートを並べるアンチパターンを、アサーションルーレットと呼びます。

```java
class FizzBuzzTest {
  @Test
  void _1を渡すと文字列1を返す() throws Exception {
    FizzBuzz fizzbuzz = new FizzBuzz();

    // この行で失敗したとすると...
    assertEquals("2", fizzbuzz.convert(2));

    // この行は実行されない
    assertEquals("1", fizzbuzz.convert(1));
  }
}
```

一般的なテスティングフレームワークではアサートが失敗した時点以降のアサートが実行されません。アサートをテストメソッド内に縦に並べると、以下のことが起きます。

- 失敗したとき途中までしかテストできていない状態になる
- 失敗したときデバッグが必要になる
- 色々なことをやり過ぎていて、動作するドキュメントとしての可読性が落ちる


## 動作するドキュメントとしてのテストコードにする

TDDのために具体的で実装しやすいテストコードは、仕様を表現するものに書き換える必要があります。

```java
class FizzBuzzTest {

  // 具体的でTDDしやすかったが、テストから仕様が読み取れない..
  @Test
  void _1を渡すと文字列1を返す() throws Exception {
    // ...
  }

  @Test
  void _3を渡すとFizzを返す() throws Exception {
    // ...
  }
}
```

テスティングフレームワークが用意しているツリー構造を使って、最初にTODOに書き出した仕様をうまくテストに反映させます。テストには将来の自分も含めた読み手がいるので、これも重要なステップです。

## 関連

TDDを実践しつつ、Gitのコミットをどうするかについて話されている動画で、こちらも面白かったです。  
僕はこの動画を参考にGitコマンドのaliasを設定したりしました。

[TDD with git. Long live engineering. / Koichi ITO - YouTube](https://www.youtube.com/watch?v=fyvUDLJvpp8)
