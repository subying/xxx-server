/*
	@description 路由
	@auth subying
 */

const router = require('koa-router')();

module.exports = (app)=>{
	app.use(router.routes());
	router.get('/',function *(next){
		this.body = 'index';
		
		yield next;
	});

	return function *(next){
		console.log(this.request.url);

		yield next;
	};
};