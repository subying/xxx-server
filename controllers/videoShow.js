/*
 * @description 详情
 */
const video = require('../spider/video');

module.exports = function *(){
    let result={};
    let videoUrl=[];
    let title='';
    result = yield video.show(this.params);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    videoUrl = result.videoUrl;
    title = result.title;

    this.render({
        videoUrl: videoUrl,
        title: title
    },'videoShow');
};
