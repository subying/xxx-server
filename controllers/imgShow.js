/*
 * @description 列表
 */
const img = require('../spider/img');

module.exports = function *(){
    let result={};
    let list=[];
    let title='';
    result = yield img.show(this.params);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;
    title = result.title;

    this.render({
        list: list,
        title: title
    },'imgShow');
    // this.body={
    //     list: list,
    //     title: title
    // }
};
