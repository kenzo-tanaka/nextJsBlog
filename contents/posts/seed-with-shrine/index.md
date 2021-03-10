---
title: SeedファイルでShrineのuploadを使うと、IOError closed streamとなる場合の対処
date: "2021-03-10"
category: "dev"
---

Seed ファイルで Shrine の `upload` メソッドを使うと、動画や画像を紐付けたサンプルデータを生成できます。以下は、`seed_fu` を使ってデータを生成しているコードです。

```rb:db/fixtures/hoge.rb
# 全てのレコードで同じ動画を使用
video_file = File.new(Rails.root.join('spec/fixtures/files/sample.mp4'))
sample_video = VideoUploader.new(:store).upload(video_file)

Hoge.seed do |s|
  s.id = 1
  s.video_data = sample_video.to_json
end

Hoge.seed do |s|
  s.id = 2
  s.video_data = sample_video.to_json
end
```

上記のコードだと全てのレコードで同じ動画を使用しているので、1 つのレコードを削除し紐付いている動画も削除されると、他のレコードも参照先がなくなってしまいます。

なので、下記のように Seed を書き換えてみます。

```rb:db/fixtures/hoge.rb
video_file = File.new(Rails.root.join('spec/fixtures/files/sample.mp4'))

# データ生成のたびに動画をアップロードして使用する
Hoge.seed do |s|
  sample_video = VideoUploader.new(:store).upload(video_file)
  s.id = 1
  s.video_data = sample_video.to_json
end

Hoge.seed do |s|
  sample_video = VideoUploader.new(:store).upload(video_file)
  s.id = 2
  s.video_data = sample_video.to_json
end
```

しかし、上記のコードだと `IOError: closed stream` というエラーによってデータの生成に失敗します。エラーになるタイミングは、2 つ目のレコードを生成するところです。これがなぜなのかを追ってみます。

## 原因

`IOError: closed stream` というエラーの内容から 2 回目に `video_file` を参照しようとした際に、`close` されていてアップロードができなかったのかなと思いました。

`rails c` で確認してみます。

```shell
[16] (main)> video_file = File.new(Rails.root.join('spec/fixtures/files/sample.mp4'))

#<File:/xxx/files/sample.mp4>
-rw-r--r--  1 tanakakenzou  staff  3651 Nov 25 11:04 /xxx/files/sample.mp4

[17] (main)> video_file # この時点では参照できることを確認
#<File:/xxx/files/sample.mp4>
-rw-r--r--  1 tanakakenzou  staff  3651 Nov 25 11:04 /xxx/files/sample.mp4

[18] (main)> sample_video = VideoUploader.new(:store).upload(video_file) # upload実行
#<VideoUploader::UploadedFile storage=:store id="01f320594bafdb12f8506477378bee48.mp4" metadata={"filename"=>"sample.mp4", "size"=>3651, "mime_type"=>nil}>

[19] (main)> video_file # ここで参照できなくなっている
(pry) output error: #<IOError: closed stream>
```

上記の通り、`video_file` を参照できなくなっているのは、`upload` を実行した後です。なので、`upload` の挙動を具体的に追ってみます。

定義されているのはこのあたりです。  
[shrine/shrine.rb at master · shrinerb/shrine](https://github.com/shrinerb/shrine/blob/master/lib/shrine.rb)

```rb:lib/shrine.rb
def upload(io, **options)
  _enforce_io(io)

  metadata = get_metadata(io, **options)
  location = get_location(io, **options, metadata: metadata)

  _upload(io, **options, location: location, metadata: metadata)

  self.class::UploadedFile.new(
    id:       location,
    storage:  storage_key,
    metadata: metadata,
    )
end
```

[shrine/shrine.rb at master · shrinerb/shrine](https://github.com/shrinerb/shrine/blob/6c6b80a5ab2a84edf2cf90c75ccec9ecbd319993/lib/shrine.rb#L244)

```rb:
def _upload(io, location:, metadata:, upload_options: {}, close: true, delete: false, **)
  storage.upload(io, location, shrine_metadata: metadata, **upload_options)
ensure
  io.close             if close
  File.unlink(io.path) if delete && io.respond_to?(:path) && File.exist?(io.path)
end
```

上記のように `_upload` メソッドで `io.close` されているため、2 回目以降はファイルを参照できなくなっている、ということが分かりました。

## 対応

各ブロックの中で、`video_file` も定義する形にすると `IOError: closed stream` は発生しなくなります。必要であればメソッドに切り出すなどが良いかと思います。

```rb:db/fixtures/hoge.rb
Hoge.seed do |s|
  video_file = File.new(Rails.root.join('spec/fixtures/files/sample.mp4'))
  sample_video = VideoUploader.new(:store).upload(video_file)
  s.id = 1
  s.video_data = sample_video.to_json
end

Hoge.seed do |s|
  video_file = File.new(Rails.root.join('spec/fixtures/files/sample.mp4'))
  sample_video = VideoUploader.new(:store).upload(video_file)
  s.id = 2
  s.video_data = sample_video.to_json
end
```
