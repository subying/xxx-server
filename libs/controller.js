/*
	controller
 */

const controllerRule = {
	'/': 'index',
	'/:id': 'index'
};

function controller(router){
	
	router.get('/',function *(next){
		var controllerPad = require('../controllers/index');
		yield controllerPad.bind(this)();
		
		yield next;
	});

	router.get('/:id',function *(next){
		var controllerPad = require('../controllers/index');
		yield controllerPad.bind(this)();
		
		
		yield next;
	});
}

module.exports = controller;