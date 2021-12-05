module.exports = function(req, res){
	
	// 表示当前页面应该是文章管理页面
	req.app.locals.currentLink = 'article';
	
	res.render('admin/article-edit');
}