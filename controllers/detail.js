/*
 * @description 详细
 */
const book = require('../spider/book');

module.exports = function *(){
    let result={};
    let list=[];
    result = yield book.detail(this.params);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;
    const title = result.title;


    this.render({
        list: list,
        title: title
    },'detail');
};
