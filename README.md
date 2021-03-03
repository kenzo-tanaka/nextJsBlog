## Setup

```shell
$ npm install
$ npm run dev
```

## How to add post

Make directory in `/contents/posts/`, then add `index.md` inside that.

If you want to set thumbnail, add a image to `slug` directory and set thumbnail as follows.

```
---
title: md
date: "2021-02-19"
category: "dev"
thumbnail: "cat.jpg"
---
```

### Add image

Add image inside `/contents/posts/{slug}`, then read with relative path.

```md
![alt text](image.png)
```

Also you can use absolute path.

```md
![alt text](http://image-path...)
```

### Add Twitter embed

Add `twitter` code block, and write id.

````md
```twitter
1353188620912402433
```
````

## Output pdf resume

```shell
$ md-to-pdf contents/pages/about/index.md
```

## GitHub Actions

The workflow named `create issue` will create issue every month on the 27th. The purpose of these issues is to check my growth as a engineer by myself.
