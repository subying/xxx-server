/*
 * @description 播放
 */
const request = require('request');

module.exports = function *(){
    const options = {
        url: 'https://book.subying.com/video/play/4709',
        headers: {
            'User-Agent': 'subying-req',
            Range: this.headers['range']
        }
    };
    this.type = 'video/mp4';
    const x = request(options);
    this.body = x;
};
