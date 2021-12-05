const guard = function(req,res,next){

	console.log('[ middleware            ]  ');
	console.log('[ req.session.node_id : ]  ' + req.session.node_id);
	console.log('[ req.url :             ]  ' + req.url);
	console.log('[ middleware            ]  ');

	if(req.url.indexOf('/home') != -1 && req.session.node_id == undefined){
		return res.redirect('/admin/login');
	}
	next();
}

module.exports = guard;
