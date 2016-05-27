/*
 * @description 详情
 */
var video = require('../spider/video');

module.exports = function *(){
	var result={},videoUrl=[],title='';
	result = yield video.show(this.params);
	result = JSON.parse(result);

	if(Number(result.code)) throw Error('err');

    console.log(result);

	videoUrl = result.videoUrl;
    title = result.title;

	this.render({
		videoUrl: videoUrl,
		title: title
	},'videoShow');
};
