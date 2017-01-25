/*
 * @description yomanga.co 漫画
 */
const cheerio = require('cheerio');
//const Iconv = require('iconv-lite');//处理中文编码
//const _ = require('lodash');

const tool = require('../libs/tool');
const siteUrl = 'https://raws.yomanga.co/';

/**
 * @description 抓取列表
 * @param {number} page 页数
 * @returns {Voild}
*/
function *listSpider(page){
    const _url = siteUrl+'latest/'+ page +'/';

    const content = yield tool.getHttpContent(_url,{});

    const $ = cheerio.load(content);
    const list = $('#content .list .group');

    const _arr = [];
    list.map((index,obj) => {
        const $elem = $(obj).find('.title a');
        let _href = $elem.attr('href');
        _href = '/'+_href.replace(siteUrl,'mh/');
        _arr.push({
            href: _href,
            text: $elem.text()
        });
        return true;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
}

/**
 * @description 抓取章节列表
 * @param {string} name 名称
 * @returns {Voild}
*/
function *seriesSpider(name){
    const _url = siteUrl+'series/'+ name +'/';

    const content = yield tool.getHttpContent(_url,{});

    const $ = cheerio.load(content);
    const list = $('#content .element');

    const _arr = [];
    list.map((index,obj) => {
        const $elem = $(obj).find('.title a');
        let _href = $elem.attr('href');
        _href = '/'+_href.replace(siteUrl+'read','mh/detail').replace('ko/0/','');
        _arr.push({
            href: _href,
            text: $elem.text()
        });
        return true;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
}

/**
 * @description 抓取列表
 * @param {string} name 名称
 * @param {number} page 章节数
 * @returns {Voild}
*/
function *detailSpider(name,page){
    const _url = siteUrl+'read/'+ name +'/ko/0/'+page+'/page/1';//获取第一页

    const content = yield tool.getHttpContent(_url,{});

    const $ = cheerio.load(content);
    const len = $('#psel option').length;
    let imgSrc = $('#page img').attr('src');
    imgSrc = imgSrc.replace(/\d{1,2}\.jpg/,'');

    const _arr = [];
    for(let i=0; i<len; i++){
        _arr[i] = imgSrc+(i+1)+'.jpg';
    }

    return JSON.stringify({
        code:0,
        data: _arr
    });
}

module.exports = {
    list: listSpider,
    series: seriesSpider,
    detail: detailSpider
};
