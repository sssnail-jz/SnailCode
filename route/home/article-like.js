const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const {Like}= require('../../model/like');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	// 用户 id
	const uid = req.query.uid;
	// 文章 id
	const aid = req.query.aid;

	// 查找到这篇文章
	var like = await Like.findOne({
		uid: mongoose.Types.ObjectId(uid), 
		aid: mongoose.Types.ObjectId(aid)});
	
	if(like != null){
		await Like.deleteOne(like);
	}else
	{
		await Like.create({
			uid: mongoose.Types.ObjectId(uid),
			aid: mongoose.Types.ObjectId(aid)
		});
	}
	res.redirect('/home/article?id=' + aid + '&newcommentflags=true');
}