const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');
const {GitUser}= require('../../model/gituser');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const parseOriginCommentArr = require('../../tools/parseOriginCommentArr');
const mongoose = require('mongoose');
const pagination = require('mongoose-sex-page');
const { Like } = require('../../model/like');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	const id = req.query.id;
	var page = req.query.page;
	
	var islike = await Like.findOne({
		uid: req.app.locals.userInfo._id,
		aid: mongoose.Types.ObjectId(id)
	});

	console.log('[ islike : ]' + islike);

	// 为了新增评论时候定位到最底部
	const newcommentflags = req.query.newcommentflags;

	// 查找到这篇文章
	var originArticle = await Article.findOne({_id: mongoose.Types.ObjectId(id)}).populate('author'); 
	// 查找到这篇文章的所有评论
	var comments = await pagination(Comment).find({aid: id}).populate('uid').page(page).size(4).display(5).exec();
	// 找到写这篇文章的人的信息
	var userinfoarticle = await GitUser.findOne({_id: originArticle.author._id});

	if(newcommentflags == null)
	{
		res.render('home/article', {
			article: parseOriginOneArticle(originArticle),
			userinfoarticle, userinfoarticle,
			pageinfo: {
				page: comments.page,
				pages: comments.pages,
				size: comments.size,
				total: comments.total,
				display: comments.display
			},
			comments: parseOriginCommentArr(comments.records),
			islike: islike
		});
	}
	else{
		res.render('home/article', {
			article: parseOriginOneArticle(originArticle),
			pageinfo: {
				page: comments.page,
				pages: comments.pages,
				size: comments.size,
				total: comments.total,
				display: comments.display
			},
			comments: parseOriginCommentArr(comments.records),
			userinfoarticle, userinfoarticle,
			newcommentflags: newcommentflags,
			islike: islike
		});
	}
}
