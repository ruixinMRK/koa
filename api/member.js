
let path = require("path");

let Member = {
	
	getUserInfo:{
		handler:async function(ctx,next){
			let data = this.getData("post");
			let result = null;
			result = await this.querySql(`INSERT INTO userinfo (name,age) VALUES ("${data.name}",${data.age})`);
			return {status:result};
		},
		method:"post"
	},
	getName(){
		return {type:"123"};
	},
	getA(ctx){
		return "<h1>123</h1>"
	}
}
module.exports = {namespace:path.basename(__filename,".js"),interface:Member};


