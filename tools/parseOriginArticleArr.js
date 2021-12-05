const moment = require('moment');
const {Comment} = require('../model/comment');
const {Like}= require('../model/like');

async function parseOriginArticleArr(articleArr){
	var articles = [];

	for(var i = 0; i < articleArr.length; i++){
		var one = articleArr[i];

		articles.push({
			_id: one._id,
			title: one.title,
			authorid: one.author._id,
			authorlogin: one.author.login,
			publishDate: parseDate(one.publishDate),
			content: one.content,
			label: one.label, 
			commentCount: await Comment.countDocuments({aid: one._id}),
			like: await Like.countDocuments({aid: one._id})
		});
	}
	return articles;
}

function parseDate(originDate){
	const date = new Date(originDate);
	var timeNum = Date.parse(date);
	return moment(timeNum).format('YYYY-MM-DD');
}

module.exports = parseOriginArticleArr