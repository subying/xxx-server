/*
 * @description 列表
 */
const video = require('../spider/video');

module.exports = function *(){
    let result={};
    let list=[];
    const page = this.params.page || 1;
    result = yield video.list(page);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;

    this.render({
        list: list,
        title: 'video test'
    },'videoList');
};
