const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article');

module.exports = function(req, res){
	const form = new formidable.IncomingForm();
	form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
	form.keepExtensions = true;
	
	form.parse(req, async function(err, fields, files){
		console.log(fields);

		// 将文章信息写入数据库
		var article = await Article.create({
			title: fields.title,
			author: req.app.locals.userInfo._id,
			publishDate: fields.publishDate,
			content: fields.content,
			label: fields.label
		});
		res.redirect('/home/article?id=' + article._id);
	});
}