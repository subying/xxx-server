/*
 * @description 播放
 */
var request = require('request');
var cache = require('../libs/cache');

module.exports = function *(){
    var _id = 'videoPid'+this.params.id;
    var _quality = this.params.quality=='hd'?'hd':'sd';

    var playData = yield cache.get(_id);

    if(playData){
        playData = JSON.parse(playData);
        if(playData[_quality]){
            var options = {
                url: playData[_quality],
                headers: {
                    'User-Agent': 'subying-req',
                    'Range': this.headers['range']
                }
            };
            var x = request(options);
            this.body = x;
        }

    }

    //request('http://statics.subying.com/resource/vi.mp4').pipe(this.res);
};
