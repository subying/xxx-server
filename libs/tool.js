/*
 * @description tool 工具类
 */
const http = require('http');
const https = require('https');
const Url = require('url');
const queryStr = require('querystring');

const _ = require('lodash');
var BufferHelper = require('bufferhelper');

const setting = require('./setting');
var cache = require('./cache');
var proxyHost = setting.proxyHost;

const shttp = require('socks5-http-client');
const shttps = require('socks5-http-client');
var Agent = require('socks5-http-client/lib/Agent');
var Agents = require('socks5-https-client/lib/Agent');
var request = require('request');
request = request.defaults({jar: true});


exports.getUrl = function(url,headers,callback,errback){
	var option = {
		method:'GET',
		url:url,
		headers:{
			'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
		},
		encoding: null
	};
	var bufferHelper = new BufferHelper();

	//如果有代理
	if(proxyHost && proxyHost.host && proxyHost.port){
		option.agentClass = url.indexOf('https')>-1?Agents:Agent;
		option.agentOptions = {
			socksHost: proxyHost.host, // Defaults to 'localhost'.
			socksPort: proxyHost.port // Defaults to 1080.
		}
	}


	request(option,function(error, response, body){
		if(error){
			errback(error);
		}else{
			callback(body);
		}
	});
}

/*
 *@description 获取网页内容
 */
exports.getUrls = function (url, headers,callback, errback){
	var bufferHelper = new BufferHelper(),
	option ={};
    var httpType = url.indexOf('https')>-1?https:http;

    option = Url.parse(url);
	var sname = option.host+'-cookie';
	var scookie = global.scookie[sname];


    //如果有代理
    if(proxyHost && proxyHost.host && proxyHost.port){
        //option.hostname = proxyHost.host;
        //option.port = proxyHost.port;
        //httpType = url.indexOf('https')>-1?https:http;
        //option.path = url;
        //option.protocol = 'http:';

        option.socksHost  = proxyHost.host;
        option.socksPort  = proxyHost.port;
        httpType = url.indexOf('https')>-1?shttps:shttp;
    }

	option.method = 'GET';
	option.headers = {
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
	};
	if(scookie){
		option.headers['Cookie']=scookie;
	}


	//var httpType = option.path.indexOf('https')>-1?https:http;
	var req = httpType.request(option,function (res){
		//console.dir(res.headers);
		if(res.headers['set-cookie']){
			global.scookie[sname] = res.headers['set-cookie'];
		}
		console.log(res.headers)

		res.on('data',(chunk)=>{
				bufferHelper.concat(chunk);
		});
		res.on('end',()=>{
				var html = bufferHelper.toBuffer();
				callback && callback(html);
		});
	});
	req.on('error',(e)=>{
		console.log(e);
	    errback && errback(e.message);
    });
    req.end()
};

/*
 * @description 发送post请求
 */
exports.postUrls = function *(url, data,headers,callback, errback){
    var bufferHelper = new BufferHelper(),
	option =Url.parse(url);

    //如果有代理
    if(proxyHost && proxyHost.host && proxyHost.port){
        option.host = proxyHost.host;
        option.port = proxyHost.port;
        option.path = url;
        option.protocol = url.indexOf('https')>-1?'https:':'http:';
    }

	option.method = 'POST';

	var sendData = _.isObject(data)?queryStr.stringify(data):data;
	option.headers = {
		"Content-Type": 'application/x-www-form-urlencoded',
    	"Content-Length": sendData.length,
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
	};

	var req = httpType.request(option,function *(res){
		res.setEncoding('utf8');
		res.on('data',(data)=>{
				result += data;
		});
		res.on('end',()=>{
				callback && callback(result);
		});
	});
	req.on('error',(e)=>{
    	errback && errback(e.message);
    });
    req.write(sendData+'\n');
    req.end()
};


/*
 * 获取网页内容
 */
exports.getHttpContent = (url,headers)=>{
	return new Promise(function(resolve, reject) {
		exports.getUrl(url, headers,function(content) {
			resolve(content);
		}, function(err) {
			console.log('getHttpErr='+err,url);
			reject(err);
		});
	});
};
