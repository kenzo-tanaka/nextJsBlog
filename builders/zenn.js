const request = require('request');

request('https://zenn.dev/api/articles?username=kenzo&order=latest', function (error, response, body) {
	jsonBody = JSON.parse(body)
	console.log(jsonBody['articles'][0]['title'])
})
