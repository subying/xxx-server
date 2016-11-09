/*
 * @description 播放
 */
var request = require('request');

module.exports = function *(){
    var options = {
        url: 'https://book.subying.com/video/play/4709',
        headers: {
            'User-Agent': 'subying-req',
            'Range': this.headers['range']
        }
    };
    this.type = 'video/mp4';
    var x = request(options);
    this.body = x;


};
