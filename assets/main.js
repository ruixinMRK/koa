let koa = require("koa");
let static = require("koa-static");
let Router = require("koa-router");
let bodyParser = require('koa-better-body');

let ConfigRoute = require("./manager/route.js");
let global = require("./manager/global.js");

let SQL = require("./manager/sql.js");

SQL.instance.connect();

let app = new koa();
let router = new Router();

app.use(bodyParser());

app.use(async (ctx,next)=>{
	global.stack.push(ctx);
	await next();
})

new ConfigRoute(router);


app.use(static(__dirname + '/assets')); 


app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
