/*
 * @description 首页
 */
var book = require('../spider/book');
var React=require('react');
var ReacDOMServer = require('react-dom/server');
// 服务端引入MyComponent组件
var BookList =  React.createFactory(require('../components/index.jsx'))

module.exports = function *(){
	var result={},list=[];

	result = yield book.index();
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;

    var html = ReacDOMServer.renderToString(BookList({list:list}));

	this.render({
		list: list,
        outputHtml: html
	},'index');
};
