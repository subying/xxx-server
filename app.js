const app     = require('koa')();
const favicon = require('koa-favicon');
const session = require('koa-session');

const setting     = require('./libs/setting');
const middleware = require('./libs/middleware');
const router     = require('./libs/router');

const log4js = require('log4js');
const logger = log4js.getLogger('app');

app.keys = 'xxx-server';//设置签名Cookie密钥  在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：

app
	.use(session(app))
	.use(middleware())
	.use(router(app))
	.use(favicon(__dirname + '/favicon.ico'))
	.listen(setting.port, ()=>{
    	logger.info("Node listen at " + setting.port);
	});
