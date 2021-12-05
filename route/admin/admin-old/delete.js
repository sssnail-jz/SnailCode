const {User}= require('../../model/user');
module.exports = async function(req, res){
	
	var user = await User.findOne({_id: req.body.id});

	if(user._id.toString() != req.app.locals.userInfo._id.toString()){
		await User.findOneAndDelete({_id: req.body.id});
	}
	res.redirect('/admin/user');
}