/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

var NetController = require(path.resolve(process.cwd(), "Addins", "Net", "Controllers", "Net.Controller"));

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Net", function(req, res){
<<<<<<< HEAD
		res.render("NetListView.jade", { title: "Network", subTitle: "Shows all units on the network", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
=======
		res.render("NetListView.jade", { title: "Network", subTitle: "Shows all units on the network", viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: false});
>>>>>>> a76a6615f40eb3f2239f136a46f3e47bb8aa5f73
		})
	// Api routes
	app.get("/Net/List", NetController.list);
	app.get("/Net/LastList", NetController.lastList);
}