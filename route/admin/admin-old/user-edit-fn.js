const {User, validateUser}= require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async function(req, res, next){
	
	// 开始验证
	try{
		await validateUser(req.body);
	}catch(e){
		return next(JSON.stringify({path: '/admin/user-edit', message: e.message}));
	}
	
	// 验证邮箱是否存在
	var user = await User.findOne({email: req.body.email});
	if(user){
		return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}));
	}
	
	// 将密码加密存储
	const salt = await bcrypt.genSalt(10);
	const password = await bcrypt.hash(req.body.password, salt);
	req.body.password = password;
	await User.create(req.body);
	
	// req.app.locals.userInfo = await User.findOne({email: req.body.email});
	
	// 将页面重定向到用户列表页面
	res.redirect('/admin/user');
}