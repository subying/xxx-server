/*
 * @description 播放
 */
var request = require('request');
var cache = require('../libs/cache');
const setting = require('../libs/setting');
var proxyHost = setting.proxyHost;
var Agent = require('socks5-http-client/lib/Agent');
var Agents = require('socks5-https-client/lib/Agent');
var Url = require('url');

module.exports = function *(){
    var _id = 'videoPid'+this.params.id;
    var _quality = this.params.quality=='hd'?'hd':'sd';

    var playData = yield cache.get(_id);

    if(playData){
        playData = JSON.parse(playData);
        var playUrl = playData[_quality];
        if(playUrl){
            var _opt = Url.parse(playUrl);
            var scookie = yield cache.get(_opt.host+'-cookie');
            var options = {
                url: playUrl,
                headers: {
                    'User-Agent': 'subying-req',
                    'Range': this.headers['range']
                }
            };
            if(scookie){
                options.headers['Cookie']=scookie;
            }

            //如果有代理
            if(proxyHost && proxyHost.host && proxyHost.port){
                options.agentClass = playUrl.indexOf('https')>-1?Agents:Agent;
                options.agentOptions = {
                    socksHost: proxyHost.host, // Defaults to 'localhost'.
                    socksPort: proxyHost.port // Defaults to 1080.
                }
            }

            this.type = 'video/mp4';
            var x = request(options);
            this.body = x;
        }

    }

    //request('http://statics.subying.com/resource/vi.mp4').pipe(this.res);
};
