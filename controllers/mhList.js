/*
 * @description 漫画列表
 */
const mh = require('../spider/mh');

module.exports = function *(){
    let result={};
    let list=[];
    const page=this.params.page || 1;
    result = yield mh.list(page);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;

    this.render({
        list: list,
        title: page+'-mh test'
    },'mhList');
    //this.body=list;
};
