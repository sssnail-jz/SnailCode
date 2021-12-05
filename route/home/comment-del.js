const {Article} = require('../../model/article');
const {Comment} = require('../../model/comment');
const {GitUser}= require('../../model/gituser');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const parseOriginCommentArr = require('../../tools/parseOriginCommentArr');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	// 评论id
	const id = req.query.id;
	// 文章 id
	const aid = req.query.aid;
	const newcommentflags = req.query.newcommentflags;

	console.log('[ comment-del 评论 id: ]' + id);
	console.log('[ comment-del 文章 id: ]' + aid);

	await Comment.deleteOne({_id: mongoose.Types.ObjectId(id)});

	// newcommentflags 为了新增评论时候定位到最底部
	res.redirect('/home/article?id=' + aid + '&newcommentflags=true');
};