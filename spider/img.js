/*
 * @description mm131.com
 */
const cheerio = require('cheerio');
const Iconv = require('iconv-lite');//处理中文编码
const _ = require('lodash');

const tool = require('../libs/tool');
const siteUrl = 'http://www.mm131.com/xinggan/';

/*
 * @description 抓取列表
*/
function *listSpider(){
    var _url = siteUrl,_arr=[];
    var content = yield tool.getHttpContent(_url,{});
    var $ = cheerio.load(Iconv.decode(content,'gb2312'));
    var list = $('.list-left dd').not('.page');


    list.map((index,obj)=>{
	    var $elem = $(obj).find('a').eq(0);
		var _href = $elem.attr('href');
		_href = '/'+_href.replace(/\.htm[l]?/g,'').replace(siteUrl,'img/show/')
		_arr.push({
			href: _href,
			text: $elem.text()
		});
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
    var _url = siteUrl+params.id+'.html',_arr=[],title='';
    var content = yield tool.getHttpContent(_url,{});
    var $ = cheerio.load(Iconv.decode(content,'gb2312'));
    var page = $('.page-ch').eq(0).text().replace(/[^\d]*(\d+)[^\d]*/,'$1');
    var imgUrl = $('.content-pic img').eq(0).attr('src').replace(/(.*)\/\d\.jpg/,'$1');
    title = $('h5').text();
    page = parseInt(page,10);

    for(let i=1;i<=page;i++){
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
