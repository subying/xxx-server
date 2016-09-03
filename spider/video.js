/*
 * @description youav.com
 */
const cheerio = require('cheerio');
const _ = require('lodash');

const tool = require('../libs/tool');
var cache = require('../libs/cache');
const siteUrl = 'http://www.youav.com';

/*
 * @description 抓取列表
*/
function *listSpider(page){
    var _url = siteUrl+'/videos?o=mr&page='+page,_arr=[];
    var content = yield tool.getHttpContent(_url,{});
    var $ = cheerio.load(content);
    var list = $('.well-sm a');


    list.map((index,obj)=>{
	    var $elem = $(obj);
		var _href = $elem.attr('href');
        _href = _href.replace(/video\/(\d+)\/(.*)/,'$1_$2').replace('/','');
        var _infoArr = _href.split('_');

		_href = '/video/show/'+ _infoArr[0];
		_arr.push({
			href: _href,
			text: _infoArr[1]
		});
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
    var _url = siteUrl+'/load.php?pid='+params.id+'',title='',videoUrl='',_id='videoPid'+params.id;
    // var showData = yield cache.get(_id);
    // if(!showData){
        var content = yield tool.getHttpContent(_url,{});
        var str = content.toString().replace(/[\s\r]*/g,'');
        var regx = /https\:\/\/(\d|[a-zA-Z]|=|%|-|&|\.|\/|\?|_)+/g;
        var arr = str.match(regx);

        yield cache.set(_id,JSON.stringify({sd: arr[0],hd: arr[1]}));

        videoUrl = arr[1];
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
