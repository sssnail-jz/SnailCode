const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 20
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	// admin
	// normal
	role: {
		type: String,
		required: true
	},
	state: {
		type: Number,
		default: 0
	}
});

const User = mongoose.model('User', userSchema);
	
async function createUser(){
	const salt = await bcrypt.genSalt(10);
	const result = await bcrypt.hash('123456', salt);
	const user = await User.create({
		username: 'JackZheng',
		email: 'JackZheng@qq.com',
		password: result,
		role: 'admin',
		state: '0'
	});
}
	
// createUser();

var validateUser = function(user){
	// 定义验证规则
	const schema = {
		username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合要求')),
		email: Joi.string().email().required().error(new Error('邮箱不符合要求')),
		password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
		role: Joi.string().valid('normal', 'admin').required().error(new Error('角色不符合要求')),
		state: Joi.number().valid(0, 1).required().error(new Error('状态不符合要求'))
	};
	
	return Joi.validate(user, schema);
}

module.exports = {
	User,
	validateUser
}