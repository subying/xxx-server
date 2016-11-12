/*
 * @description 列表
 */
var img = require('../spider/img');

module.exports = function *(){
	var result={},list=[],page=this.params.page || 1;
	result = yield img.list(page);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;

	this.render({
		list: list,
		title: 'img test'
	},'imgList');
	//this.body=list;
};
