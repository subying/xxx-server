/*
 * @description 列表
 */
var book = require('../spider/book');
var React=require('react');
var ReacDOMServer = require('react-dom/server');
// 服务端引入MyComponent组件
var BookList =  React.createFactory(require('../components/list.jsx'))

module.exports = function *(){
	var result={},list=[],title='';
	result = yield book.list(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;
	title = result.title;

    var html = ReacDOMServer.renderToString(BookList({list:list}));

	this.render({
		list: list,
		title: title,
        outputHtml: html
	},'list');
};
