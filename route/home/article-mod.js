const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const parseOriginOneArticle = require('../../tools/parseOriginOneArticle');
const mongoose = require('mongoose');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	const id = req.query.id;
	// 查找到这篇文章
	var article = await Article.findOne({_id: mongoose.Types.ObjectId(id)}).populate('author'); 
 
	console.log(article);

	res.render('home/article-mod', {
		articleMod: true,
		article:parseOriginOneArticle(article)
	});
}