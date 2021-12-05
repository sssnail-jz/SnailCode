const {GitUser}= require('../../model/gituser');

module.exports = async function(req, res){
	
	// 获得从 git 服务器获得的用户信息
	var gituserinfo = JSON.parse(req.query.gituserinfo);
	console.log(gituserinfo);

	// 先在数据库当中查找一下此 git 用户
	var gituser = await GitUser.findOne({node_id: gituserinfo.node_id});

	// 如果用户存在，说明用户已经登录过本服务器了
	if(gituser){
		// 记录用户已经登录的标志
		req.session.node_id = gituserinfo.node_id;

		// 将用户的信息保存进全局
		req.app.locals.userInfo = gituser;

		res.redirect('/home/');
	}else{ // 否则用户第一次登录的本服务器，记录 git 用户进数据库
		// 数据库新建此用户
		var newuser = await GitUser.create({
			node_id: gituserinfo.node_id,
			login: gituserinfo.login,
			avatar_url: gituserinfo.avatar_url,
			html_url: gituserinfo.html_url
		});

		// 将用户的信息保存进全局
		req.app.locals.userInfo = newuser;

		res.redirect('/home/');
	}
}