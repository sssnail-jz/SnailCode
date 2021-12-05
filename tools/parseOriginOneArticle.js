const moment = require('moment');

function parseOriginOneArticle(a){
	return {
		_id: a._id,
		title: a.title,
		authorlogin: a.author.login,
		publishDate: parseDate(a.publishDate),
		content: a.content,
		label: a.label
	};
}

function parseDate(originDate){
	const date = new Date(originDate);
	var timeNum = Date.parse(date);
	return moment(timeNum).format('YYYY-MM-DD');
}

module.exports = parseOriginOneArticle