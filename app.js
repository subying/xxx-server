const app = require('koa')();
const favicon = require('koa-favicon');
const session = require('koa-session');

const config  = require('./config');

app.keys = 'xxx-server';//设置签名Cookie密钥  在进行cookie签名时，只有设置 signed 为 true 的时候，才会使用密钥进行加密：

app.use(session(app))
.use(favicon(__dirname + '/favicon.ico'))
.listen(config.port, ()=>{
    console.log("Node listen at " + config.port);
});