/*
 * @description haxsk.com
 */
const cheerio = require('cheerio');
const Iconv = require('iconv-lite');//处理中文编码
const _ = require('lodash');

const tool = require('../libs/tool');
const cache = require('../libs/cache');
const siteUrl = 'http://www.woqudu.net/';


/*
 * @description 抓取首页分类
*/
function *indexSpider(){
    const indexData = yield cache.get('indexData');
    let _arr=[];
    let content='';
    if(!indexData){
        content = yield tool.getHttpContent(siteUrl,{});
        content = Iconv.decode(content,'gb2312');
        const $ = cheerio.load(content);
        const list = $('table tr').eq(4).find('a');

        list.map((index,obj) => {
            const $elem = $(obj);
            let _match = [];
            let _href;
            if(index>0){
                _href = $elem.attr('href');
                //_match = _href.match(/class=(\d+)/);
                _match = _href.match(/\/catalog\/(\d+)\.html/);
                _arr.push({
                    href: '/list/'+_match[1],
                    text: $elem.text()
                });
            }
            return $elem;
        });
        yield cache.set('indexData',JSON.stringify(_arr));
    }else{
        _arr = JSON.parse(indexData);
    }


    return JSON.stringify({
        code:0,
        data: _arr
    });
}

/*
 * @description 抓取列表
*/
function *listSpider(params){
    const _page = params.page || 1;
    const listId = 'list-'+params.id+'-'+_page;
    let _arr=[];
    let title='';
    let listData = yield cache.get(listId);

    if(!listData){
        const _url = siteUrl+'modules/article/articlelist.php?class='+params.id+'&page='+_page;

        const content = yield tool.getHttpContent(_url,{});
        const $ = cheerio.load(Iconv.decode(content,'gb2312'));

        title = $('title').text().split('-')[0];
        const list = $('.newborder .font14');
        list.map((index,obj) => {
            const $elem = $(obj);
            let _href = $elem.attr('href');
            const _match = _href.match(/\/book\/(\d+)\.html/);

            _href = '/detail/'+_match[1];
            _arr.push({
                href: _href,
                text: $elem.text()
            });
            return $elem;
        });

        yield cache.set(listId,JSON.stringify({data: _arr,title: title}));
    }else{
        listData = JSON.parse(listData);
        _arr = listData.data;
        title = listData.title;
    }

    return JSON.stringify({
        code:0,
        data: _arr,
        title: title
    });
}


function *detailSpider(params){
    const _id = params.id+'';
    const sid = _id.slice(0,_id.length>4?2:1);

    const detailId = 'detail-'+params.id+'-'+sid;
    let _arr=[];
    let title='';
    let detailData = yield cache.get(detailId);

    if(!detailData){
        const _upath = sid+'/'+params.id;
        const _url = siteUrl+'files/article/html/'+ _upath +'/index.html';

        const content = yield tool.getHttpContent(_url,{});
        const $ = cheerio.load(Iconv.decode(content,'gb2312'));

        title = $('title').text().split('-')[0];
        const list = $('table.acss .ccss a');
        list.map((index,obj) => {
            const $elem = $(obj);
            const _href = $elem.attr('href');
            if(_href){
                const page = _href.replace(/\.htm[l]?/g,'');
                _arr.push({
                    href: '/show/'+ _upath +'/'+page,
                    text: $elem.text(),
                    page: parseInt(page,10)
                });
            }
            return $elem;
        });

        _arr = _.sortBy(_arr,'page');
        yield cache.set(detailId,JSON.stringify({data: _arr,title: title}));
    }else{
        detailData = JSON.parse(detailData);
        _arr = detailData.data;
        title = detailData.title;
    }


    return JSON.stringify({
        code:0,
        data: _arr,
        title: title
    });
}

function *showSpider(params){
    const showId = 'show-'+params.id+'-'+params.sid+'-'+params.page;
    let title='';
    let showData = yield cache.get(showId);
    let con;

    if(!showData){
        const _upath = params.id+'/'+params.sid+'/'+params.page;
        const _url = siteUrl+'files/article/html/'+ _upath +'.html';

        const content = yield tool.getHttpContent(_url,{});
        const $ = cheerio.load(Iconv.decode(content,'gb2312'));

        title = $('title').text().split('-我去读文学网')[0];
        const conElem = $('#content');
        con = conElem.html();

        yield cache.set(showId,JSON.stringify({data: con,title: title}));
    }else{
        showData = JSON.parse(showData);
        con = showData.data;
        title = showData.title;
    }


    return JSON.stringify({
        code:0,
        data: con,
        title: title
    });
}

module.exports = {
    index: indexSpider,
    list: listSpider,
    detail: detailSpider,
    show: showSpider
};
