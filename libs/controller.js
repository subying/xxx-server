/*
 * @description controller 控制器
 * @auth subying
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

var setting = require('./setting');

const _controllerPath = '../'+ setting.path.controller +'/';

var controllerMain = {
	init: (router)=>{
		var _self = controllerMain;
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
		router.get('/list/:id/:page',function*(){
			yield _self.runController.bind(this)('list');
		});
		router.get('/detail/:id/:sid',function*(){
			yield _self.runController.bind(this)('detail');
		});
		router.get('/show/:id/:sid/:page',function*(){
			yield _self.runController.bind(this)('show');
		});

		router.get('/img/list',function*(){
			yield _self.runController.bind(this)('imgList');
		});

		router.get('/img/show/:id',function*(){
			yield _self.runController.bind(this)('imgShow');
		});
	},
	runController: function* (name){
		var _self = controllerMain;
		try{
			var controller = _self.getContrller(name);
			yield controller.bind(this)();
		}catch(e){
			console.log(e);
			this.body = e;
		}
	},
	/*
	 * @description 获取控制器
	 */
	getContrller: (name)=>{
		var _path = _controllerPath+name+'.js';

		//转换文件绝对路径
		var filePath = path.resolve(__dirname,_path);

		//判断文件是否存在
		if(fs.existsSync(filePath)){
			return require(_path);
		}else{
			throw Error('controller is not exists');
		}
	}
};


module.exports = controllerMain.init;
