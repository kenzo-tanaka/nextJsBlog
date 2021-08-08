const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

request(`https://zenn.dev/api/articles?username=${config.zennId}&order=latest`, function (_error: any, _response: any, body: string) {
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


	const pastPosts = fs.readJSONSync('./contents/zenn/articles.json');
	if (JSON.stringify(pastPosts) === JSON.stringify(articles)) {
		console.log('Zennの記事は更新がなかったのでファイルを更新しませんでした。')
		return;
	} else {
		fs.writeJsonSync("./contents/zenn/articles.json", articles);
	}
})
