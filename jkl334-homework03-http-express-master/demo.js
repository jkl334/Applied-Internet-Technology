var http = require('http'), fs = require('fs');
function serverStaticFile(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err,data) {
		if(err) {
			res.writeHead(500, { 'Content-Type': 'text/plain'});
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, {'Content-Type': contentType });
			res.end(data);
		}
	});
}

http.createServer(function(req,res){
	var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
	var date = new Date();
  	date = date.toString();
	switch(path) {
		case '':
			serverStaticFile(res, '/public/index.html', 'text/html');
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
		case '/home':
			serverStaticFile(res, '/public/index.html', 'text/html');
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
		case '/about':
			serverStaticFile(res, '/public/about.html', 'text/html');
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
		case '/me':
			serverStaticFile(res, '/public/about.html', 'text/html', 301);
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+ " " +"301 Moved Permanently");
			break;
		case '/img/image1.png':
			serverStaticFile(res, '/public/img/image1.png', 'image/png');
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
		case '/img/image2.png':
			serverStaticFile(res, '/public/img/image2.png', 'image/png');
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
		case '/css/base.css':
			serverStaticFile(res, '/public/css/base.css', 'text/css');
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
		default:
			serverStaticFile(res, '/public/404.html', 'text/html', 404);
			console.log(date.toLocaleString()+" "+req.method+" "+req.url+" "+res.statusCode);
			break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');