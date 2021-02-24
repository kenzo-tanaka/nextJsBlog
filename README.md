## Setup

```shell
$ npm install
$ npm run dev
```

## How to add post

Make directory in `/contents/posts/`, then add `index.md` inside that.

### Add image

Add image inside `/contents/posts/{slug}`, then read with relative path.

```md
![alt text](image.png)
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
