/*
	index
 */

module.exports = function *(){
	var _id = 'index';
	if(this.params.id){
		var _id  = this.params.id;
	}

	this.render({
		id:_id
	},'index');
};