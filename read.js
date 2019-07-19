const request = require('request');
const j = request.jar();
const cookie = request.cookie('ZFSESSID=4u7t67kh9p315b8g75mvrsrtm6');
const url = 'https://m.socialpeta.com/crotalus/ajax-get-creative-detail?id=1d751c298bab256f5e52aab6571d7b5f&channel=3&region=0&apptype=1';
j.setCookie(cookie, url);

request({
    method:'GET',
    url: url,
    jar: j,
    gzip: true,//网页使用gzip进行了压缩 所以要增加这个
    headers:{
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36'
    },
},function(error, response, body){
    console.log(body);
});