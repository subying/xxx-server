/*
	@description 中间件
	@auth subying
 */
var tpl = require('./tpl');
module.exports = ()=>{
	return function *(next){
		//
		this._data = {
		};

		//渲染模板方法
		this.render = tpl;

		yield next;//往下执行 
	};
};