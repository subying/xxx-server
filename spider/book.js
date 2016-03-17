/*
 * @description haxsk.com
 */
const cheerio = require('cheerio');
const Iconv = require('iconv-lite');//处理中文编码
const _ = require('lodash');

const tool = require('../libs/tool');
var cache = require('../libs/cache');
const siteUrl = 'http://www.haxsk.com/';


/*
 * @description 抓取首页分类
*/
function *indexSpider(){
	var content = yield tool.getHttpContent(siteUrl,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

	var list = $('#subnav .hd p').eq(0).find('a');
	var _arr = [];
	list.map((index,obj)=>{
		var $elem = $(obj);
		if(index>0){
			_arr.push({
				href: $elem.attr('href').replace(/\.htm[l]?/g,'').replace('xiaoshuo','list'),
				text: $elem.text()
			});
		}
	});

	console.log(yield cache.set('key','test123'))



	return JSON.stringify({
		code:0,
		data: _arr
	});
}

/*
 * @description 抓取列表
*/
function *listSpider(params){
	var _url = siteUrl+'xiaoshuo/'+params.id+'/'+params.page+'.htm';
	var content = yield tool.getHttpContent(_url,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

	var title = $('#content h2').text();
	var list = $('#content li');
	var _arr = [];
	list.map((index,obj)=>{
		var $elem = $(obj).find('a').eq(0);
		var _href = $elem.attr('href');
		_href = '/'+_href.replace(/\.htm[l]?/g,'').replace('files/article/info','detail').replace(siteUrl,'')
		_arr.push({
			href: _href,
			text: $elem.text()
		});
	});

	return JSON.stringify({
		code:0,
		data: _arr,
		title: title
	});
}


function *detailSpider(params){
	var _upath = params.id+'/'+params.sid;
	var _url = siteUrl+'files/article/html/'+ _upath +'/index.html';

	var content = yield tool.getHttpContent(_url,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

	var title = $('title').text().split('_')[0];
	var list = $('table.acss .ccss a');
	var _arr = [];
	list.map((index,obj)=>{
		var $elem = $(obj);
		var page = $elem.attr('href').replace(/\.htm[l]?/g,'');
		_arr.push({
			href: '/show/'+ _upath +'/'+page,
			text: $elem.text(),
			page: parseInt(page,10)
		});
	});

	_arr = _.sortBy(_arr,'page');

	return JSON.stringify({
		code:0,
		data: _arr,
		title: title
	});
}

function *showSpider(params){
	var _upath = params.id+'/'+params.sid+'/'+params.page;
	var _url = siteUrl+'files/article/html/'+ _upath +'.html';

	var content = yield tool.getHttpContent(_url,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

	var title = $('title').text().split('-在线')[0];
	var conElem = $('#contentsea3c');
	conElem.find('span').remove();
	conElem.find('font').remove();
	var con = conElem.html();
	con = con.replace(/&#xA0;&#xA0;/g,'&#xA0;');

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