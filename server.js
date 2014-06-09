var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	app = express(),
    port = process.env.PORT || 3000;

// EXPRESS CONFIG
app.use(bodyParser())
app.use(express.static(path.join(__dirname, '/public')));

// ENVIRONMENT CONFIG
// var mode = 'development'
// // var env = require('./server/config/environment')[mode]

// S3 config
require('./server/config/s3')()

// ROUTES
require('./server/config/routes')(app)

// Start server
app.listen(port, function(){
  console.log('Server listening on port ' + port)
});