/*
 * @description 详细
 */
var book = require('../spider/book');

module.exports = function *(){
	var result={},list=[];
	result = yield book.detail(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;
	var title = result.title;


	this.render({
		list: list,
		title: title
	},'detail');
};