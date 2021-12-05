const express = require('express');
const path = require('path');
const {User} = require('./connectmongo');

const app = express();
app.use(express.json());

app.get('/', function(req, res){
	res.send('ok');
});

app.post('/register', async function(req, res){
	const user = await User.create(req.body);

	res.send(user);
});

// 监听端口
app.listen(2000);

console.log('server start success..');