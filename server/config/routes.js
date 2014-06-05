
module.exports = function(app){
	
	// Angular routes
	app.get('/*', function(req, res){
		res.sendfile('./public/index.html')
	})

}