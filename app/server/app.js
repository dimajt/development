// -----------------------
// Vars
// -----------------------

// requires
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 5000;

// mime types
var mime = {  
	html : 'text/html',
	css  : 'text/css',
	js   : 'application/javascript',
	json : 'application/json',  
	txt  : 'text/plain',
	jpg  : 'image/jpeg',
	jpeg : 'image/jpeg',
	gif  : 'image/gif',
	png  : 'image/png',
	svg  : 'image/svg+xml'
}

// logs
var log = {

	ready: function() {
		console.log('server is running');
		console.log('port: ' + port);
		console.log('--------------------------');		
	},

	request: function(path, type) {
		console.log('path: ' + path);
		console.log('type: ' + type);
		console.log('--------------------------');		
	},

	notFound: function() {
		console.log('file not found');
		console.log('--------------------------');		
	}
}



// -----------------------
// Utility
// -----------------------

// get request path
var getPath = function(req) {
	var path = url.parse(req.url).pathname.substring(1);	
	return path || 'index.html';
}

// get mime type
var getType = function(path) {
	var type = path.split('.').pop();
	return mime[type] || mime.txt;
}



// -----------------------
// Server
// -----------------------

var server = function(req, res) {

	var path = getPath(req);
	var type = getType(path);

	log.request(path, type);

	fs.readFile(path, function(err, code) {
		if (err) {
			log.notFound();
			res.end('error 404');
		}
		else {
			res.writeHead(200, {'Content-Type': type});
			res.end(code);			
		}		
	});	
}



// -----------------------
// Init
// -----------------------

var changeStyle = function() {
	fs.appendFile('/css/index.css', 'body {display:block !important;}', function (err) {
		if (err) throw err;
		console.log('styles changed!')
	});
}

var init = function() {
	//changeStyle();
	http.createServer(server).listen(port, log.ready);
}
init();