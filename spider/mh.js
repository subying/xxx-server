/*
 * @description yomanga.co 漫画
 */
const cheerio = require('cheerio');
//const Iconv = require('iconv-lite');//处理中文编码
//const _ = require('lodash');
const cache = require('../libs/cache');
const tool = require('../libs/tool');
const siteUrl = 'https://yomanga.co/reader/';

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
        _href = '/'+_href.replace(siteUrl+'read','mh/detail').replace('en/0/','')+list.length;
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
 * @description 抓取详细页面
 * @param {string} name 名称
 * @param {number} page 章节数
 * @returns {Voild}
*/
function *detailSpider(name,page){
    const _url = siteUrl+'read/'+ name +'/en/0/'+page+'/page/1';//获取第一页
    const listId = `mh-${name}-${page}`;
    const listData = yield cache.get(listId);
    let _arr = [];

    if(!listData){
        const content = yield tool.getHttpContent(_url,{});
        const $ = cheerio.load(content);
        const len = $('#psel option').length;

        let imgSrc = $('#page img').attr('src');
        imgSrc = imgSrc.replace(siteUrl,'').replace(/\//g,'+');
        imgSrc = '/mh/resource/'+imgSrc;
        _arr.push(imgSrc);

        for(let i=1; i<len; i++){
            const _furl = siteUrl+'read/'+ name +'/en/0/'+page+'/page/'+(i+1);
            const _fcon = yield tool.getHttpContent(_furl,{});
            const _$doc = cheerio.load(_fcon);

            imgSrc = _$doc('#page img').attr('src');
            imgSrc = imgSrc.replace(siteUrl,'').replace(/\//g,'+');
            imgSrc = '/mh/resource/'+imgSrc;
            _arr.push(imgSrc);
        }
        // imgSrc = imgSrc.replace(/\d{1,3}\.jpg/,'');
        // imgSrc = imgSrc.replace(siteUrl,'').replace(/\//g,'+');
        // imgSrc = '/mh/resource/'+imgSrc;
        //
        //
        // for(let i=0; i<len; i++){
        //     if(page>0 && i+1<10){
        //         _arr[i] = imgSrc+'0'+(i+1)+'.jpg';
        //     }else{
        //         _arr[i] = imgSrc+(i+1)+'.jpg';
        //     }
        // }
        yield cache.set(listId,JSON.stringify(_arr));
    }else{
        _arr = JSON.parse(listData);
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
