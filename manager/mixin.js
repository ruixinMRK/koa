
let EventEmitter  = require("events");
let global = require("./global.js");
let SQL = require("./sql.js");

class Mixin extends EventEmitter{

	constructor(){
		super();
	}

	getData(type='get'){
		let ctx = global.stack.shift();
		let data = type == "get" ? ctx.query :ctx.request.fields;
		return data;
	}

	querySql(sqlStr,sqlParams){
		return new Promise((resolve,reject)=>{
			SQL.instance.querySql(sqlStr,sqlParams).then(function(data){
				resolve(data)
			},function(error){
				reject(error);
			});
		})
	}
}

module.exports = new Mixin();
