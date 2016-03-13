/*
 * @description 列表
 */
var book = require('../spider/book');

module.exports = function *(){
	var result={},list=[],title='';
	result = yield book.list(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;
	title = result.title;

	this.render({
		list: list,
		title: title
	},'list');
};