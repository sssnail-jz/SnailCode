const {Article} = require('../../model/article');
const {GitUser}= require('../../model/gituser');
const parseOriginArticleArr = require('../../tools/parseOriginArticleArr');
const assignArticleInfoToUser = require('../../tools/assignArticleInfoToUser');
const pagination = require('mongoose-sex-page');

/***
 * 1，查出所有的文章
 * 2，查出所有的用户[每个用户拥有的文章总数]
 */
module.exports = async function(req, res){
	req.app.locals.userInfo = await GitUser.findOne({node_id: req.session.node_id});
	
	var label = req.query.label;
	var page = req.query.page;
	var articles = null;
	if(label == null){
		articles = await pagination(Article).find().populate('author').page(page).size(4).display(5).exec();
	}else{
		articles = await pagination(Article).find({label: label}).populate('author').page(page).size(4).display(5).exec();
	}

	res.render('home/index', {
		pageinfo: {
			page: articles.page,
			pages: articles.pages,
			size: articles.size,
			total: articles.total,
			display: articles.display
		},
		articles: await parseOriginArticleArr(articles.records),
		users: await assignArticleInfoToUser()
	});
}
