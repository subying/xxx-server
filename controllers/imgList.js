/*
 * @description 列表
 */
var img = require('../spider/img');

module.exports = function *(){
	var result={},list=[];
	result = yield img.list();
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;

	this.render({
		list: list,
		title: 'img test'
	},'imgList');
};