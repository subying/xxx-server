/*
 * @description 首页
 */
const book = require('../spider/book');
const React=require('react');
const ReacDOMServer = require('react-dom/server');
// 服务端引入MyComponent组件
const BookList =  React.createFactory(require('../components/index.jsx'));

module.exports = function *(){
    let result={};
    let list=[];

    result = yield book.index();
    result = JSON.parse(result);

    if(Number(result.code)) throw Error('err');

    list = result.data;

    const html = ReacDOMServer.renderToString(BookList({list:list}));

    this.render({
        list: list,
        outputHtml: html
    },'index');
};
