module.exports = function(req,res){
	req.session.destroy(function(){
		res.clearCookie('connect.sid');
		if(req.app.locals.userInfo){
			console.log(req.app.locals.userInfo.login + ' 用户退出');
			req.app.locals.userInfo = null;
		}
		res.redirect('/admin/login');
	});
}