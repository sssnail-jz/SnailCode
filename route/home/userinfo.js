const { Article } = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const mongoose = require('mongoose');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');
const pagination = require('mongoose-sex-page');

module.exports = async function(req, res) {
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});

	// 用户id
	// 有 id 的时候说明是当前用户查看别的用户的信息
	// 没有说明是用户查看自己的用户信息，此时根据 cookie 知道当前用户
	var id = req.query.id;
	var page = req.query.page;
	// 是在线用户自己请求自己的用户信息页面
	var onlineUserFlags = false;
	var onlineUser = await GitUser.findOne({node_id: req.session.node_id});

	if(id == undefined){
		id = onlineUser._id;
	}

	// 用户从主页面点了自己的个人信息
	if(id == onlineUser._id){
		onlineUserFlags = true;
	}

	var label = req.query.label;
	var articles = null;
	
	console.log('[ (userinfo) label checkout :  ]' + label);
	console.log('[ (userinfo) userid checkout : ]' + id);
	
	// 查找到此用户对应的文章列表
	if(label == null){
		articles = await pagination(Article).find({
			author: mongoose.Types.ObjectId(id)}).populate('author').page(page).size(4).display(5).exec();
	}else{
		articles = await pagination(Article).find({
			label: label,
			// 这里 将 id 转换为 ObjectId 在进行比较 
			author: mongoose.Types.ObjectId(id)}).populate('author').page(page).size(4).display(5).exec();
	}
	
	// 查找到此用户的信息
	var userInfo_ = await GitUser.findOne({_id: id});

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
		userInfo_: userInfo_,
		// 传递此用户相关的文章列表到模板
		articles: await parseOriginArticleArr(articles.records),
		// 是否是用户自己查看了自己的信息
		onlineUserFlags: onlineUserFlags
	});
} 