const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

request(`https://zenn.dev/api/articles?username=${config.zennId}&order=latest`, function (error: any, response: any, body: any) {
	const data = JSON.parse(body)
	const articles: ExternalPostData[] = [];

	data['articles'].forEach((element: any) => {
		const article = {
			'title': element['title'],
			'created_at': element['created_at'],
			'url': 'https://zenn.dev/kenzo/articles/' + element['slug'],
		}
		articles.push(article)
	});

	// @see: https://github.com/jprichardson/node-fs-extra/blob/master/docs/writeJson.md
	fs.writeJsonSync("./contents/zenn/articles.json", articles);
})
