/*
 * @description haxsk.com
 */
const cheerio = require('cheerio');
const Iconv = require('iconv-lite');//处理中文编码
const _ = require('lodash');

const tool = require('../libs/tool');
const siteUrl = 'http://www.haxsk.com/';

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

	return JSON.stringify({
		code:0,
		data: _arr
	});
}

function *listSpider(params){
	var _url = siteUrl+'xiaoshuo/'+params.id+'/'+params.page+'.htm';
	var content = yield tool.getHttpContent(_url,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

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
		data: _arr
	});
}


function *detailSpider(params){
	var _upath = params.id+'/'+params.sid;
	var _url = siteUrl+'files/article/html/'+ _upath +'/index.html';

	var content = yield tool.getHttpContent(_url,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

	var list = $('table.acss .ccss a');
	var _arr = [];
	list.map((index,obj)=>{
		var $elem = $(obj);
		var page = $elem.attr('href').replace(/\.htm[l]?/g,'');
		_arr.push({
			href: '/show/'+ _upath +'/'+page,
			text: $elem.text(),
			page: page
		});
	});

	_arr = _.sortBy(_arr,'page');

	return JSON.stringify({
		code:0,
		data: _arr
	});
}

function *showSpider(params){
	var _upath = params.id+'/'+params.sid+'/'+params.page;
	var _url = siteUrl+'files/article/html/'+ _upath +'.html';

	console.log(_url);
	var content = yield tool.getHttpContent(_url,{});
	var $ = cheerio.load(Iconv.decode(content,'gb2312'));

	var con = $('#contentsea3c').html();
	con = con.replace(/&#xA0;&#xA0;/g,'&#xA0;');

	return JSON.stringify({
		code:0,
		data: con
	});
}

module.exports = {
	index: indexSpider,
	list: listSpider,
	detail: detailSpider,
	show: showSpider
};