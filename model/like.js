const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
	// 关联到用户
	uid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GitUser', 
		required: true
	},
	// 关联到文章
	aid: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article',
		required: true
	}
});

const Like = mongoose.model('Like', likeSchema);

module.exports = {
	Like
}