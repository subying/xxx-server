/*
	controller
 */
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const _controllerPath = '../controllers/';

//控制器规则
var controllerRule = {
	'/': 'index',
	'/:id': 'index'
};

var controllerMain = {
	init: (router)=>{
		var _self = controllerMain;
		//循环规则 设置路由
		_.forIn(controllerRule,(value,name)=>{
			router.get(name, function *(next){
				//读取控制器
				var controller = _self.getContrller(value);
				yield controller.bind(this)();

				yield next;
			});
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