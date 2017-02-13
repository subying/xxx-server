/*
 * @description 列表
 */
const img = require('../spider/img');

module.exports = function *(){
    let result={};
    let list=[];
    const page=this.params.page || 1;
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
