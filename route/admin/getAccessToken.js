const request = require('request');

// GitHub登录
const loginconfig = {
    client_id: 'b7acf6ece76078645f4f',
    client_secret: '852e1df426b00767367b1c7629dc62ba00c513ed'
}

module.exports = async function(req, res){
	const code = req.query.code;
	console.log('[ github code 获取成功: ] ' + code);
	const params = {
		client_id: loginconfig.client_id,
		client_secret: loginconfig.client_secret,
		code: code
	}
	let result = await request.post({
		url: 'https://github.com/login/oauth/access_token', 
		method: 'post',
		json: true,
		headers: {
			"content-type": "application/json"
		},
		body: params
	},function(error, response, body) {
		if(body == undefined){
			res.redirect('/admin/login');
		}
		else{
			console.log('[ github access_token 获取成功: ] ' + body.access_token);
			request.get({
				url: 'https://api.github.com/user?',
				method: 'get',
				headers: {
					"Authorization": 'token '+ body.access_token,
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2763.0 Safari/537.36'
				}
			},
			function(error, response, body){
				res.redirect('/admin/gitlogin?gituserinfo=' + body);
			});
		}
	});
};
