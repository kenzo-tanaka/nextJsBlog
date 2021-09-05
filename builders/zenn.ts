const request = require('request');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath: string = './contents/zenn/articles.json'
const pastPosts: ExternalPostData[] = fs.readJSONSync(articleJsonPath);
const newPostPresent = (past: string, current: string): boolean => {
	return past !== current;
}

request(`https://zenn.dev/api/articles?username=${config.zennId}&order=latest`, function (_error: any, _response: any, body: string) {
	const currentPosts: ExternalPostData[] = JSON.parse(body)['articles'].map((element: { title: string, created_at: string, slug: string }) => {
		return (
			{
				'title': element['title'],
				'created_at': element['created_at'],
				'url': 'https://zenn.dev/kenzo/articles/' + element['slug'],
			}
		)
	});

	if (newPostPresent(JSON.stringify(pastPosts), JSON.stringify(currentPosts))) {
		fs.writeJsonSync(articleJsonPath, currentPosts);
		console.log('Zennの新しい記事を反映しました。');
	} else {
		console.log('Zennの記事は更新がなかったのでファイルを更新しませんでした。')
	}
})
