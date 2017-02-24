/*
 * @description 漫画图片资源
 */
let request = require('request');
request = request.defaults({jar: true});
const setting = require('../libs/setting');
const proxyHost = setting.proxyHost;
const Agent = require('socks5-http-client/lib/Agent');
const Agents = require('socks5-https-client/lib/Agent');

module.exports = function *(){
    const name = this.params.name;
    const _url = 'https://yomanga.co/reader/'+name.replace(/\+/g,'/');

    const options = {
        method:'GET',
        url: _url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
        },
        encoding: null
    };

    //如果有代理
    if(proxyHost && proxyHost.host && proxyHost.port){
        options.agentClass = _url.indexOf('https')>-1?Agents:Agent;
        options.agentOptions = {
            socksHost: proxyHost.host, // Defaults to 'localhost'.
            socksPort: proxyHost.port // Defaults to 1080.
        };
    }

    this.type = 'image/jpeg';
    const x = request(options);
    this.body = x;
};
