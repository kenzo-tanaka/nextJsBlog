const axios = require('axios').default;
const _ = require('lodash');
import fs from "fs-extra";
import { ExternalPostData } from "@types";
import { config } from "../site.config";

const articleJsonPath: string = './contents/zenn/articles.json'
const pastPosts: ExternalPostData[] = fs.readJSONSync(articleJsonPath);

const getPosts = async (url: string) => {
	const response = await axios.get(url);
	return response.data;
}

const main = async () => {
	try {
		const posts = await getPosts(`https://zenn.dev/api/articles?username=${config.zennId}&order=latest`);
		const currentPosts: ExternalPostData[] = posts['articles'].map((element: { title: string, created_at: string, url: string }) => {
			return {
				'title': element['title'],
				'created_at': element['created_at'],
				'url': element['url'],
			}
		});
		if (_.isEqual(pastPosts, currentPosts)) {
			console.log('Zennの記事は更新がなかったのでファイルを更新しませんでした。')
		} else {
			fs.writeJsonSync(articleJsonPath, currentPosts);
			console.log('Zennの新しい記事を反映しました。');
		};
	} catch (error) {
		console.log(error);
	}
};

main();
