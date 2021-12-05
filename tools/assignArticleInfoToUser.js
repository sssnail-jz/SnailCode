const {Article} = require('../model/article');
const {GitUser}= require('../model/gituser');

async function assignArticleInfoToUser(){

	var users = await GitUser.find();
	var resultarr = [];

	for(var i = 0; i < users.length; i++){
		var one = users[i];

		resultarr.push({
			_id: one._id, 
			node_id: one.node_id,
			login: one.login, 
			avatar_url: one.avatar_url,
			html_url: one.html_url, 

			// 此用户的文章数量
			articleCount: await Article.countDocuments({author: one._id})
		});

	};
	return resultarr;
}

module.exports = assignArticleInfoToUser;