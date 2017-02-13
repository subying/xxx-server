/*
 * @description 列表
 */
const book = require('../spider/book');
const React=require('react');
const ReacDOMServer = require('react-dom/server');
// 服务端引入MyComponent组件
const BookList =  React.createFactory(require('../components/list.jsx'));

module.exports = function *(){
    let result={};
    let list=[];
    let title='';
    result = yield book.list(this.params);
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;
    title = result.title;

    const html = ReacDOMServer.renderToString(BookList({list:list}));

    this.render({
        list: list,
        title: title,
        outputHtml: html
    },'list');
};
