/*
 * @description 列表
 */
var video = require('../spider/video');

module.exports = function *(){
	var result={},list=[];
    var page = this.params.page || 1;
	result = yield video.list(page);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	list = result.data;

	this.render({
		list: list,
		title: 'video test'
	},'videoList');
};
