var express = require('express');
var handlebars = require('express3-handlebars');

var port = 3000;
var app = express();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
	res.render('index', {pre:req.headers});
});

app.get('/about', function(req, res) {
	res.render('about');
});

app.get('*', function(req,res){
	res.render("404");
});

app.use('/views',express.static('views'));
app.listen(port);
console.log('started server on port', port);