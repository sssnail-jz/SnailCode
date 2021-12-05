const {Article} = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async function(req, res){
	
	var page = req.query.page;
	
	// 表示当前页面应该是文章管理页面
	req.app.locals.currentLink = 'article';
	
	// 【？？】.populate('author')崩溃
	// page: 指定当前页
	// size: 指定每页显示的数据条数
	// display: 当前显示的页码
	var articles = await pagination(Article).find().page(page).size(10).display(3).exec();
	var articleCount = await Article.countDocuments({});
	
	res.render('admin/article',{
		articles:articles,
		articleCount: articleCount
	});
}