/*
 * @description cache 缓存控制
 * @auth subying
 */
const redis = require("redis");
var client = redis.createClient();

client.on("error", function(err) {
  console.log("Error " + err);
});

function connectSever(){
	return new Promise(function(resolve, reject) {
	  client.on("connect",()=>{
	    resolve();
	  }); 
	});
}

connectSever();

var cacheCtrl = {
	set: (key,value)=>{
		return new Promise(function(resolve, reject) {
		  client.set(key,value,(err,reply)=>{
		    resolve(reply);
		    //reject
		  }); 
		});
	},
	get: (key)=>{
		return new Promise(function(resolve, reject) {
		  client.get(key,(err,reply)=>{
		    resolve(reply);
		    //reject
		  }); 
		});
	},
	hset: (key,value)=>{
		return new Promise(function(resolve, reject) {
		  client.hset(key,value,(err,reply)=>{
		    resolve(reply);
		    //reject
		  }); 
		});
	},
	hget: (key)=>{
		return new Promise(function(resolve, reject) {
		  client.hget(key,(err,reply)=>{
		    resolve(reply);
		    //reject
		  }); 
		});
	},
	expire: (key,secs)=>{
		client.expire(key,secs);
	}
}
/*

client.on("connect",()=>{
	// 设置一个字符串类型的值，返回值：OK
	  client.set("test", "Hello World test", function(err, reply) {
	    console.log(reply.toString());
	  });

	  // 获取一个字符串类型的值，返回字：value
	  client.get("test", function(err, reply) {
	    console.log(reply.toString());
	  });
});
*/

module.exports = cacheCtrl;