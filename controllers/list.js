/*
 * @description 列表
 */
var book = require('../spider/book');

module.exports = function *(){
	var result={},list=[];
	result = yield book.list(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;

	this.render({
		list: list
	},'list');
};