/*
 * @description 漫画章节详情
 */
const mh = require('../spider/mh');

module.exports = function *(){
    let result={};
    let list=[];
    const name = this.params.name;
    const page = this.params.page;
    result = yield mh.detail(name,page);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;

    this.render({
        list: list,
        title: name
    },'mhDetail');
    //this.body=list;
};
