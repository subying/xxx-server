/*
 * @description 漫画章节详情
 */
const mh = require('../spider/mh');

module.exports = function *(){
    let result={};
    let list=[];
    const name = this.params.name;
    const page = parseInt(this.params.page,10);
    const total = parseInt(this.params.total,10);
    result = yield mh.detail(name,page);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;

    this.render({
        list: list,
        title: name,
        pageInfo:{
            prev: page>1?'/mh/detail/'+name+'/'+(page-1)+'/'+total:'',
            next: page<total?'/mh/detail/'+name+'/'+(page+1)+'/'+total:''
        }
    },'mhDetail');
    //this.body=list;
};
