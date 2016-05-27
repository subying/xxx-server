/*
 * @description 播放
 */
var request = require('request');
var cache = require('../libs/cache');

module.exports = function *(){
    var _id = 'videoPid'+this.params.id;
    var playData = yield cache.get(_id);

    console.log(playData && playData.hd);
    if(playData && playData.hd){
        var options = {
            url: playData.hd,
            headers: {
                'User-Agent': 'subying-req',
                'Range': this.headers['range']
            }
        };
        var x = request(options);
        this.body = x;
    }

    //request('http://statics.subying.com/resource/vi.mp4').pipe(this.res);
};
