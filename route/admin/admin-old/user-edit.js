const {User}= require('../../model/user');
module.exports = async function(req, res){
	
	// 表示当前页面应该是用户管理页面
	req.app.locals.currentLink = 'user';
	
	// 分为添加操作和修改操作
	const { message, id} = req.query;
	
	if(id){ // 修改
		var user = await User.findOne({_id: id});
		res.render('admin/user-edit', 
		{
			message: message,
			user: user,
			link: '/admin/user-modify?id=' + id,
			buttonText: '修改'
		});
	}else{ // 添加
		res.render('admin/user-edit',
		{
			message: message,
			link:'/admin/user-edit',
			buttonText: '添加'
		});
	}
}