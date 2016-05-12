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
	var indexData = yield cache.get('indexData'),_arr=[],content='';
	if(!indexData){
		content = yield tool.getHttpContent(siteUrl,{});
		content = Iconv.decode(content,'gb2312');
		var $ = cheerio.load(content);
		var list = $('#subnav .hd p').eq(0).find('a');

		list.map((index,obj)=>{
			var $elem = $(obj);
			if(index>0){
				_arr.push({
					href: $elem.attr('href').replace(/\.htm[l]?/g,'').replace('xiaoshuo','list'),
					text: $elem.text()
				});
			}
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
	var listId = 'list-'+params.id+'-'+params.page,_arr=[],title='';
	var listData = yield cache.get(listId);

	if(!listData){
		var _url = siteUrl+'xiaoshuo/'+params.id+'/'+params.page+'.htm';
		var content = yield tool.getHttpContent(_url,{});
		var $ = cheerio.load(Iconv.decode(content,'gb2312'));

		var title = $('#content h2').text();
		var list = $('#content li');
		list.map((index,obj)=>{
			var $elem = $(obj).find('a').eq(0);
			var _href = $elem.attr('href');
			_href = '/'+_href.replace(/\.htm[l]?/g,'').replace('files/article/info','detail').replace(siteUrl,'')
			_arr.push({
				href: _href,
				text: $elem.text()
			});
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
	var detailId = 'detail-'+params.id+'-'+params.sid,_arr=[],title='';
	var detailData = yield cache.get(detailId);

	if(!detailData){
		var _upath = params.id+'/'+params.sid;
		var _url = siteUrl+'files/article/html/'+ _upath +'/index.html';

		var content = yield tool.getHttpContent(_url,{});
		var $ = cheerio.load(Iconv.decode(content,'gb2312'));

		var title = $('title').text().split('_')[0];
		var list = $('table.acss .ccss a');
		list.map((index,obj)=>{
			var $elem = $(obj);
			var _href = $elem.attr('href');
			if(_href){
				var page = _href.replace(/\.htm[l]?/g,'');
				_arr.push({
					href: '/show/'+ _upath +'/'+page,
					text: $elem.text(),
					page: parseInt(page,10)
				});
			}

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
	var showId = 'show-'+params.id+'-'+params.sid+'-'+params.page,_arr=[],title='';
	var showData = yield cache.get(showId);

	if(!showData){
		var _upath = params.id+'/'+params.sid+'/'+params.page;
		var _url = siteUrl+'files/article/html/'+ _upath +'.html';
		console.log(_url);
		var content = yield tool.getHttpContent(_url,{});
		var $ = cheerio.load(Iconv.decode(content,'gb2312'));

		var title = $('title').text().split('-在线')[0];
		var conElem = $('#contentsea3c');
		conElem.find('span').remove();
		conElem.find('font').remove();
		var con = conElem.html();
		con = con.replace(/&#xA0;&#xA0;/g,'&#xA0;');

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
