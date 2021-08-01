const request = require('request');
import fs from "fs-extra";

request('https://zenn.dev/api/articles?username=kenzo&order=latest', function (error: any, response: any, body: any) {
	const data = JSON.parse(body)

	const articles: { title: string; created_at: string; slug: string; }[] = [];

	data['articles'].forEach((element: any) => {
		const article = {
			'title': element['title'],
			'created_at': element['created_at'],
			'slug': element['slug'],
		}
		articles.push(article)
	});

	// @see: https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md
	fs.writeJsonSync("./contents/zenn/articles.json", articles);
})
