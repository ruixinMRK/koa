
let path = require("path");

let Order = {

	getOrder(){
		return {type:"order"};
	}
}
module.exports = {namespace:path.basename(__filename,".js"),interface:Order};


