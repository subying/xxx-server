/*
	@description 中间件
	@auth subying
 */

module.exports = ()=>{
	return function *(next){
		//

		yield next;//往下执行 
	};
};