/*
 * @description 列表
 */
const img = require('../spider/img');
const querystring = require('querystring');
const request = require('request');

module.exports = function *(){
    let result={};
    let list=[];
    let title='';
    const _search = this.request.search.replace('?','');
    const query = querystring.parse(_search);

    const _surl = query.surl; //访问的图片来自哪个页面
    const _src = query.src;//需要访问的图片地址

    // 如果是没有src 参数则表示获取列表页面
    if(!_src){
        result = yield img.show(this.params);
        result = JSON.parse(result);

        if(Number(result.code)) throw Error('err');

        list = result.data;
        title = result.title;

        this.render({
            list: list,
            title: title
        },'imgShow');
        // this.body={
        //     list: list,
        //     title: title
        // }
    }else{
        const options = {
            url: _src,
            headers: {
                Referer: _surl,
                'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
            }
        };

        this.type = 'image/jpeg';
        const x = request(options);
        this.body = x;
    }
};
