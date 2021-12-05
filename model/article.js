const mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
	title: {
		type: String,
		maxlength: 60,
		minlength: 1,
		required: [true, '请填写文章标题']
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GitUser',
		required: [true, '请传递作者']
	},
	publishDate: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String
	},
	label:{
		type: String,
		required: [true, '请填写文章标签']
	}
});

var Article = mongoose.model('Article', articleSchema);

module.exports = {
	Article
}