var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

http.createServer(function (req, res) {
	request('https://zhongdeming.fun/', function (error, response, body) {
		// res.end(body);
		if(!error && response.statusCode === 200) {
			var $ = cheerio.load(body);
			var news = $(".l_main .post-list .title a");
			console.log("news", news);
			var html = `<head><meta charset='utf-8'></head><body><ul>`;
			for(var i = 0; i < news.length; i++) {
				html += `<li>${news[i].children[0].data}</li>`;
			}
			html += `</ul></body>`;
			res.end(html);
		}
	})
}).listen(3001);
