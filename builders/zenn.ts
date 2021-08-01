const request = require('request');
import fs from "fs-extra";

request('https://zenn.dev/api/articles?username=kenzo&order=latest', function (error: any, response: any, body: any) {
	const data = JSON.parse(body)
	const articles = data['articles']

	fs.writeJsonSync("test.json", articles);
})
