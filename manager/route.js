

let routes = require("../api");
let mixin = require("./mixin.js");

class Route{
	
	constructor(router){
		this.interface = routes;
		for(let val of this.interface){
			for(let str in val.interface){
				let item = val.interface[str];
				let controller = `/${val.namespace}/${str}`;
				if(typeof item == "function"){
					
					router.get(controller,async  (ctx,next)=>{
						await this.mixin(ctx,next,item,controller)
					})
				}else if(typeof item == "object"){
					router[item.method](controller,async (ctx,next)=>{
						await this.mixin(ctx,next,item.handler,controller);
					})
				}
			}
		}
		
	}

	async mixin(ctx,next,fn,controller){

		let body = null;
		try{
			body = await fn.call(mixin,ctx,next);
		}
		catch(e){
			let message =e.message;
			if(e.code == "ER_BAD_FIELD_ERROR"){
				message = e.sqlMessage;
			}
			body = {code:'error',message};
		}
		if(typeof body == "object"){
			ctx.body = {data:body,time:Date.now(),controller:controller.substr(1)};
		}else{
			ctx.body = body;
		}
		next();
	}
	
}

module.exports = Route;
