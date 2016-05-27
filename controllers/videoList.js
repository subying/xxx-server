/*
 * @description 列表
 */
var video = require('../spider/video');

module.exports = function *(){
	var result={},list=[];
	result = yield video.list();
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;

	this.render({
		list: list,
		title: 'video test'
	},'videoList');
};
