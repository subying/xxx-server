/*
 * @description mm131.com
 */
const cheerio = require('cheerio');
const Iconv = require('iconv-lite');//处理中文编码
//const _ = require('lodash');

const tool = require('../libs/tool');
const siteUrl = 'http://www.mm131.com/xinggan/';

/*
 * @description 抓取列表
 * @param {Number} page 页数
*/
function *listSpider(page){
    let _url = siteUrl;
    const _arr=[];
    if(page && page>1){
        _url = _url+'list_6_'+ page +'.html';
    }

    const content = yield tool.getHttpContent(_url,{});

    const $ = cheerio.load(Iconv.decode(content,'gb2312'));
    const list = $('.list-left dd').not('.page');


    list.map((index,obj) => {
        const $elem = $(obj).find('a').eq(0);
        const imgSrc = $elem.children().attr('src');

        let _href = $elem.attr('href');
        _href = '/'+_href.replace(/\.htm[l]?/g,'').replace(siteUrl,'img/show/');
        _arr.push({
            href: _href,
            img: imgSrc,
            text: $elem.text()
        });
        return $elem;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
}

/*
 * @description 抓取列表
*/
function *showSpider(params){
    const _url = siteUrl+params.id+'.html';
    const _arr=[];
    let title='';
    const content = yield tool.getHttpContent(_url,{});
    const $ = cheerio.load(Iconv.decode(content,'gb2312'));
    let page = $('.page-ch').eq(0).text().replace(/[^\d]*(\d+)[^\d]*/,'$1');
    const imgUrl = $('.content-pic img').eq(0).attr('src').replace(/(.*)\/\d\.jpg/,'$1');
    title = $('h5').text();
    page = parseInt(page,10);

    for(let i=1; i<=page; i++){
        _arr.push({
            src:imgUrl+'/'+i+'.jpg',
            name:title
        });
    }

    return JSON.stringify({
        code:0,
        data: _arr,
        title: title
    });
}

module.exports = {
    list: listSpider,
    show: showSpider
};
