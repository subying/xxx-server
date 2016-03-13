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
			var controller = _self.getContrller('index');
			yield controller.bind(this)();
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
			var controller = _self.getContrller('list');
			yield controller.bind(this)();
		});
		router.get('/detail/:id/:sid',function*(){
			var controller = _self.getContrller('detail');
			yield controller.bind(this)();
		});
		router.get('/show/:id/:sid/:page',function*(){
			var controller = _self.getContrller('show');
			yield controller.bind(this)();
		});
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