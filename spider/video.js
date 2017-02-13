/*
 * @description youav.com
 */
const cheerio = require('cheerio');
//const _ = require('lodash');

const tool = require('../libs/tool');
const cache = require('../libs/cache');
const siteUrl = 'http://www.youav.com';

/*
 * @description 抓取列表
 * @param {Number} page
*/
function *listSpider(page){
    const _url = siteUrl+'/videos?o=mr&page='+page;
    const _arr=[];
    const content = yield tool.getHttpContent(_url,{});
    const $ = cheerio.load(content);
    const list = $('.well-sm a');


    list.map((index,obj) => {
        const $elem = $(obj);
        let _href = $elem.attr('href');
        _href = _href.replace(/video\/(\d+)\/(.*)/,'$1_$2').replace('/','');
        const _infoArr = _href.split('_');

        _href = '/video/show/'+ _infoArr[0];
        _arr.push({
            href: _href,
            text: _infoArr[1]
        });
        return $elem;
    });

    return JSON.stringify({
        code:0,
        data: _arr
    });
}

/*
 * @description 详情
*/
function *showSpider(params){
    const _url = siteUrl+'/load.php?pid='+params.id+'';
    let title='';
    //let videoUrl='';
    const _id='videoPid'+params.id;
    // const showData = yield cache.get(_id);
    // if(!showData){
    const content = yield tool.getHttpContent(_url,{});
    const str = content.toString().replace(/[\s\r]*/g,'');
    const regx = /https:\/\/(\d|[a-zA-Z]|=|%|-|&|\.|\/|\?|_)+/g;
    const arr = str.match(regx);

    yield cache.set(_id,JSON.stringify({sd: arr[0],hd: arr[1]}));

    //videoUrl = arr[1];

    // }else{
    //    showData = JSON.parse(showData);
    //    videoUrl = showData.hd;
    // }

    title = '';

    return JSON.stringify({
        code:0,
        videoUrl: '/video/play/'+params.id,
        title: title
    });
}

module.exports = {
    list: listSpider,
    show: showSpider
};
