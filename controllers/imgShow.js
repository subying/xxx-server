/*
 * @description 列表
 */
var img = require('../spider/img');

module.exports = function *(){
	var result={},list=[],title='';
	result = yield img.show(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;
    title = result.title;

	this.render({
		list: list,
		title: title
	},'imgShow');
};
