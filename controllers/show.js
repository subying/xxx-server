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


	this.render({
		content: content
	},'show');
};