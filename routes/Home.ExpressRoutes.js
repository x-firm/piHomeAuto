/* Auto generated file
*
* This file should not be changed, it will be
* auto generated each time the app is restarted
*/

var path = require('path');

exports.initAddin = function(app, addin){
	var addin = addin;
	var app = app;

	app.get("/Home", function(req, res){
		res.render("HomeView.jade", { title: "", subTitle: "", tilesData: addin.getTiles(), viewModelFiles: addin.getViewModelFiles(), routesFiles: addin.getRoutesFiles(), noHeader: true});
		})
	// Api routes
}
