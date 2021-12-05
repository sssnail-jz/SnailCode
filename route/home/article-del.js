const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');
const mongoose = require('mongoose');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res, next) => {
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});

	const id = req.query.id;
	var page = req.query.page;
	await Article.deleteOne({_id: mongoose.Types.ObjectId(id)});

	var articles = await pagination(Article).
		find({author: req.app.locals.userInfo._id}).
		populate('author').page(page).size(4).display(5).exec();;	

    res.render('home/userinfo', {
		pageinfo: {
			page: articles.page,
			pages: articles.pages,
			size: articles.size,
			total: articles.total,
			display: articles.display
		},
		userinfoshow: true,
		// 传递用户信息到用户信息模板
		userInfo_: req.app.locals.userInfo,
		// 传递此用户相关的文章列表到模板
		articles: await parseOriginArticleArr(articles.records),
		// 是否是用户自己查看了自己的信息
		onlineUserFlags: true
	});
}