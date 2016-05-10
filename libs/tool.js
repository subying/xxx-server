/*
 * @description tool 工具类
 */
const http = require('http');
const https = require('https');
const Url = require('url');
const queryStr = require('querystring');

const _ = require('lodash');
var BufferHelper = require('bufferhelper');

/*
 *@description 获取网页内容
 */
exports.getUrl = (url, headers,callback, errback)=>{
	var bufferHelper = new BufferHelper(),
		option = Url.parse(url);
	option.method = 'GET';
	option.headers = {};
	var httpType = option.protocol.indexOf('https')>-1?https:http;
	var req = httpType.request(option,(res)=>{
		res.on('data',(chunk)=>{
			bufferHelper.concat(chunk);
		});
		res.on('end',()=>{
			var html = bufferHelper.toBuffer();
			callback && callback(html);
		});
	});
	req.on('error',(e)=>{
        errback && errback(e.message);
    });
    req.end()
};

/*
 * @description 发送post请求
 */
exports.postUrl = (url, data,headers,callback, errback)=>{
	var result,
		option = Url.parse(url);
	option.method = 'POST';
	option.headers = {};
	var httpType = option.protocol.indexOf('https')>-1?https:http;
	var sendData = _.isObject(data)?queryStr.stringify(data):data;
	option.headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Content-Length": sendData.length
    };

	var req = httpType.request(option,(res)=>{
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
			console.log(err);
			reject(err);
		});
	});
};
