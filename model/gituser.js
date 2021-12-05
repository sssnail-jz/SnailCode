// user 数据库设计
// {
// 	_id: 'akdhskfjlsdjfsjfdjslfj', // 用于集合关联
// 	node_id: '唯一标识git用户的ID', // 用于识别用户

// 	// 以下为信息字段
// 	login: 'git用户名',
// 	avatar_url: 'git用户的头像',
// 	html_url: 'git用户的主页'
// } 

const mongoose = require('mongoose');

const GitUserSchema = new mongoose.Schema({
	node_id: {
		type: String,
		required: true,
		unique: true
	},
	login: {
		type: String,
		required: true
	},
	avatar_url: {
		type: String,
		required: true
	},
	html_url: {
		type: String,
		required: true
	}
});

const GitUser = mongoose.model('GitUser', GitUserSchema);
 
module.exports = {
	GitUser
}