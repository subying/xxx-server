/*
	@description 中间件
	@auth subying
 */
var tpl = require('./tpl');
module.exports = ()=>{
	return function *(next){
		//
		this._data = {
			a: 123
		}

		//渲染模板方法
		this.render = tpl;

		yield next;//往下执行 
	};
};