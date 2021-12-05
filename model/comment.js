const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
	// 关联到文章
	aid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article',
		required: true
	},
	// 关联到用户
	uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GitUser', 
		required: true
	},
	// 关联到所回复的评论
	rid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},
	time: {
		type:Date
	},
	content: {
		type: String
	}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = {
	Comment
}