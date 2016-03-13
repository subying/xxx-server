/*
 * @description 内容
 */
var book = require('../spider/book');

module.exports = function *(){
	var result={},content='';
	result = yield book.show(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	content = result.data;
	var title = result.title;


	this.render({
		content: content,
		title: title
	},'show');
};