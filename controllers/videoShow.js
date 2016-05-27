/*
 * @description 详情
 */
var img = require('../spider/video');

module.exports = function *(){
	var result={},videoUrl=[],title='';
	result = yield img.show(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

	videoUrl = result.videoUrl;
    title = result.title;

	this.render({
		videoUrl: videoUrl,
		title: title
	},'videoShow');
};
