/*
 * @description controller 控制器
 * @auth subying
 */
//const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const logger = log4js.getLogger('controller');

const setting = require('./setting');

const _controllerPath = '../'+ setting.path.controller +'/';

const controllerMain = {
    init: (router) => {
        const _self = controllerMain;
        router.get('/',function*(){
            yield _self.runController.bind(this)('index');
        });

        /*
        router.get(/\/test$/,function*(){
            var controller = _self.getContrller('test');
            yield controller.bind(this)();
        });

        router.get('/test/',function*(){
            this.body = 'test-all';
        });

        //优先级原因
        router.get('/:id',function*(){
            var controller = _self.getContrller('index');
            yield controller.bind(this)();
        });
        */
        //小说 start
        router.get('/list/:id',function*(){
            yield _self.runController.bind(this)('list');
        });
        router.get('/list/:id/:page',function*(){
            yield _self.runController.bind(this)('list');
        });

        router.get('/detail/:id',function*(){
            yield _self.runController.bind(this)('detail');
        });
        router.get('/show/:id/:sid/:page',function*(){
            yield _self.runController.bind(this)('show');
        });
        //小说 end

        //图片 start
        router.get('/img/list',function*(){
            yield _self.runController.bind(this)('imgList');
        });

        router.get('/img/list/:page',function*(){
            yield _self.runController.bind(this)('imgList');
        });

        router.get('/img/show/:id',function*(){
            yield _self.runController.bind(this)('imgShow');
        });
        //图片 end

        //漫画 start
        router.get('/mh/list',function*(){
            yield _self.runController.bind(this)('mhList');
        });

        router.get('/mh/list/:page',function*(){
            yield _self.runController.bind(this)('mhList');
        });

        router.get('/mh/series/:name',function*(){
            yield _self.runController.bind(this)('mhSerie');
        });

        router.get('/mh/detail/:name/:page',function*(){
            yield _self.runController.bind(this)('mhDetail');
        });
        //漫画 end

        //视频 start
        router.get('/video/list',function*(){
            yield _self.runController.bind(this)('videoList');
        });

        router.get('/video/list/:page',function*(){
            yield _self.runController.bind(this)('videoList');
        });

        router.get('/video/show/:id',function*(){
            yield _self.runController.bind(this)('videoShow');
        });

        router.get('/video/play/:id',function*(){
            yield _self.runController.bind(this)('videoPlay');
        });

        router.get('/video/play/:id/:quality',function*(){
            yield _self.runController.bind(this)('videoPlay');
        });
        //视频 end

        router.get('/test',function*(){
            yield _self.runController.bind(this)('test');
        });
    },
    runController: function* (name){
        const _self = controllerMain;
        try{
            const controller = _self.getContrller(name);
            yield controller.bind(this)();
        }catch(e){
            logger.error(e);
            this.body = e;
        }
    },
    /*
     * @description 获取控制器
     */
    getContrller: (name) => {
        const _path = _controllerPath+name+'.js';

        //转换文件绝对路径
        const filePath = path.resolve(__dirname,_path);

        //判断文件是否存在
        if(fs.existsSync(filePath)){
            return require(_path);
        }else{
            logger.error('controller is not exists');
            throw Error('controller is not exists');
        }
    }
};


module.exports = controllerMain.init;
