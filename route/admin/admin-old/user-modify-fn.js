const {User, validateUser}= require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async function(req, res, next){
	// 拿到表单对象
	const body = req.body;
	// 拿到路由参数
	const id = req.query.id;
	// 数据库中根据 id 查找单例
	var user = await User.findOne({_id : id});
	
	// 开始验证
	try{
		await validateUser(req.body);
	}catch(e){
		var obj = {path: '/admin/user-edit', message: e.message , id : id};
		return next(JSON.stringify(obj));
	}
	
	// 如果能通过 email 查出用户，说明输入的用户要验证
	// 如果和自己本来的 email 相同，可以，不能和别人的 email 相同
	var _user = await User.findOne({email: req.body.email});
	if(_user && user.email.toString() != body.email.toString()){
		var obj = {path: '/admin/user-edit', message: "邮箱已经存在", id : id};
		return next(JSON.stringify(obj));
	}
	
	// 比对密码
	var isValid = await bcrypt.compare(body.password, user.password);
	
	if(isValid){
		await User.updateOne({_id : id},{
			username: body.username,
			email: body.email,
			role: body.role,
			state: body.state
		});
		// 如果修改的是全局对象，修改全局对象	
		if(id.toString() == req.app.locals.userInfo._id.toString()){
			req.app.locals.userInfo = await User.findOne({_id : id});
		}
		
		res.redirect('/admin/user');
	}else{
		var obj = {path: '/admin/user-edit', message: "密码比对错误，请确认密码", id : id};
		return next(JSON.stringify(obj));
	}
}