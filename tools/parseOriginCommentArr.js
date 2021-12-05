const moment = require('moment');

function parseOriginCommentArr(comments){

	var resultarr = [];

	for(var i = 0; i < comments.length; i++){
		var one = comments[i];

		resultarr.push({
			_id: one._id, // 评论 id
			aid: one.aid._id, // 文章id
			uid: one.uid._id, // 用户 id

			authorlogin: one.uid.login,
			authorhtml_url: one.uid.html_url, 
			authoravatar_url: one.uid.avatar_url,
			
			time: parseDate(one.time),
			content: one.content
		});

	};
	return resultarr;
}

function parseDate(originDate){
	const date = new Date(originDate);
	var timeNum = Date.parse(date);
	return moment(timeNum).format('YYYY-MM-DD');
}

module.exports = parseOriginCommentArr;