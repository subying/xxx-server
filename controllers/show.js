/*
 * @description 内容
 */
const book = require('../spider/book');

module.exports = function *(){
    let result={};
    let content='';
    result = yield book.show(this.params);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    content = result.data;
    const title = result.title;

    this.render({
        content: content,
        title: title
    },'show');
};
