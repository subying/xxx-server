/*
 * @description mm131.com
 */
const cheerio = require('cheerio');
const Iconv = require('iconv-lite');//处理中文编码
//const _ = require('lodash');

const tool = require('../libs/tool');
const siteUrl = 'https://m.mm131.net/xinggan/';

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

    const list = $('#content .post-content a');

    list.map((index,obj) => {
        const $elem = $(obj);
        const imgSrc = $elem.children().attr('src');

        let _href = $elem.attr('href');
        _href = '/'+_href.replace(/\.htm[l]?/g,'').replace(siteUrl,'img/show/');
        _arr.push({
            href: _href,
            img: imgSrc,
            text: $elem.children().attr('alt')
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
    let page = $('.paging .rw').eq(0).text().replace(/[\d]*\/([\d]+)[^\d]*/,'$1');
    const imgUrl = $('#content .post-content img').eq(0).attr('src').replace(/(.*)\/\d\.jpg/,'$1');
    title = $('h5').text();
    page = parseInt(page,10);

    for(let i=1; i<=page; i++){
        const _src = imgUrl+'/'+i+'.jpg';
        _arr.push({
            src: '/img/show/?src='+_src+'&surl='+_url,
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
