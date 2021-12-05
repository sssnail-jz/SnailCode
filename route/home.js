const express = require('express');

const home = express.Router();

home.get('/', require('./home/index'));

// 个人信息展示
home.get('/userinfo', require('./home/userinfo'));
// 文章详情
home.get('/article', require('./home/article'));
// 提交文章评论
home.post('/comment-new', require('./home/comment-new'));
// 删除评论路由
home.get('/comment-del', require('./home/comment-del'));

// 喜欢文章路由
home.get('/article-like', require('./home/article-like'));

// 新建文章 get 路由
home.get('/article-new', require('./home/article-new'));
// 文章数据提交路由
home.post('/article-submit', require('./home/article-new-fn'));

// 修改文章 get 路由
home.get('/article-mod', require('./home/article-mod'));
// 文章数据修改提交路由
home.post('/article-mod-fn', require('./home/article-mod-fn'));

// 删除文章 get 路由
home.get('/article-del', require('./home/article-del'));

module.exports = home;