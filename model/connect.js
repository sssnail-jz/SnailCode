const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog', {useNewUrlParser : true})
.then(function(){
	console.log('数据库连接成功');
})
.catch(function(){
	console.log('数据库连接失败');
}); 