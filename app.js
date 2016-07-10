const app          = require('koa')();
const favicon      = require('koa-favicon');
const session      = require('koa-session');
const compress     = require('koa-compress');
const staticServer = require('koa-static');

const setting     = require('./libs/setting');
const middleware = require('./libs/middleware');
const router     = require('./libs/router');

const log4js = require('log4js');
//这里配置  全局通用
log4js.configure({
  appenders: [
    { type: 'console',layout:{type:'basic'} }
  ],
  replaceConsole: true
});

const logger = log4js.getLogger('app');

app.keys = 'xxx-server';//设置签名Cookie密钥  在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：

app
	.use(session(app))
    .use(compress({
        filter: function (content_type) {//过滤请求，符合条件则执行gzip压缩
            return /text/i.test(content_type)
        },
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH
    }))
    .use(staticServer(__dirname + '/statics'))
	.use(middleware())
	.use(router(app))
	.use(favicon(__dirname + '/favicon.ico'))
	.listen(setting.port, ()=>{
    	logger.info("Node listen at " + setting.port);
	});
