const {Comment} = require('../../model/comment');
const {GitUser}= require('../../model/gituser');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	const {content, aid} = req.body;
	await Comment.create({
		content: content,
		uid: req.app.locals.userInfo._id,
		aid: aid,
		time: new Date()
	});
	
	// newcommentflags 为了新增评论时候定位到最底部
	res.redirect('/home/article?id=' + aid + '&newcommentflags=true');
};