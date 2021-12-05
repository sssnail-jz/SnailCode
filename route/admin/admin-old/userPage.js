const {User}= require('../../model/user');
module.exports = async function(req, res){
	
	// 表示当前页面应该是用户管理页面
	req.app.locals.currentLink = 'user';
	
	var pageNo = req.query.page || 1;
	var pagesize = 10;
	var userCount = await User.countDocuments({});
	var pageToatal = Math.ceil(userCount / pagesize);
	var start = (pageNo - 1) * pagesize;
	
	
	// 发送用户列表页面
	var users = await User.find({}).limit(pagesize).skip(start);
	
	res.render('admin/user', {
		users: users, // 用户集合
		pageNo: pageNo, // 页码
		pageToatal: pageToatal ,// 总页数
		userCount: userCount
		});
}