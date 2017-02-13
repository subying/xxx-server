/*
 * @description 播放
 */
const request = require('request');
const cache = require('../libs/cache');
const setting = require('../libs/setting');
const proxyHost = setting.proxyHost;
const Agent = require('socks5-http-client/lib/Agent');
const Agents = require('socks5-https-client/lib/Agent');
//const Url = require('url');

module.exports = function *(){
    const _id = 'videoPid'+this.params.id;
    const _quality = this.params.quality==='hd'?'hd':'sd';

    let playData = yield cache.get(_id);

    if(playData){
        playData = JSON.parse(playData);
        const playUrl = playData[_quality];
        if(playUrl){
            const options = {
                url: playUrl,
                headers: {
                    'User-Agent': 'subying-req',
                    Range: this.headers['range']
                }
            };

            //如果有代理
            if(proxyHost && proxyHost.host && proxyHost.port){
                options.agentClass = playUrl.indexOf('https')>-1?Agents:Agent;
                options.agentOptions = {
                    socksHost: proxyHost.host, // Defaults to 'localhost'.
                    socksPort: proxyHost.port // Defaults to 1080.
                };
            }

            this.type = 'video/mp4';
            const x = request(options);
            this.body = x;
        }
    }

    //request('http://statics.subying.com/resource/vi.mp4').pipe(this.res);
};
