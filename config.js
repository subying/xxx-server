var config = require('./config.json');


//目录配置
config.path = {
	controller: "controllers",
    view: "views"
};

//控制器配置
// config.ctrl = {
// 	'/': 'index',
// 	'/:id': 'index',
// 	'/test': 'test'
// };

module.exports = config;