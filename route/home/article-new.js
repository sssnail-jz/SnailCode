const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');

module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	res.render('home/article-new', {articleNew: true});
}