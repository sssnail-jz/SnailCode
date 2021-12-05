const {User}= require('../../../model/user');
const bcrypt = require('bcrypt');

module.exports = async function(req, res){
	var {email, password} = req.body;
	// if(email.trim().length == 0 || password.trim().length == 0){
	// 	return res.status(400).render('admin/error', {msg: '用户名或者密码输入错误！'});
	// }
	var user = await User.findOne({email});
	if(user){
		
		var isvalid = await bcrypt.compare(password, user.password);
		
		if(isvalid){
			req.session.username = user.username;
			req.session.role = user.role;
			
			// 将用户信息保存到全局对象 app 中
			req.app.locals.userInfo = user;
			
			if(user.role == 'admin'){
				res.redirect('/admin/user');
			}else{
				res.redirect('/home/');
			}
		}else{
			res.status(400).render('admin/error', {msg:'邮箱地址或者密码错误'});
		}
	}else{
		res.status(400).render('admin/error', {msg: '邮箱地址或者密码错误'});
	}
}