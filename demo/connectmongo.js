const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testdb', {useNewUrlParser : true})
.then(function(){
	console.log('数据库连接成功');
})
.catch(function(){
	console.log('数据库连接失败');
}); 

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String
	}
});

const User = mongoose.model('User', userSchema);
	

module.exports = { User }