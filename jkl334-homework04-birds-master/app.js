var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var expressHandlebars = require('express3-handlebars');
var session = require('express-session');

app.use(bodyparser.urlencoded({extended: false}));
app.use('/public', express.static('public'));


app.engine('handlebars',
        expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


var sessionOptions = {
	secret: 'secret cookie thang',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));


var birdsA = new Array ( {"number": '3', "name":"Bald Eagle"},
		{"number": '7', "name":"Yellow Billed Duck"},
		{"number": '4', "name":"Great Cormorant"}
		);



function searchBird(name) {
	var found = false;
	for (var i = 0; i < birdsA.length; i++) {
		if (birdsA[i].name === name ) {
			birdsA[i].number++;
			found= true;
		} 
	}
	if(name===""){
		console.log("Empty Input");
	}
	else if (found=== false){
		birdsA.push({"number": '1', "name":nameOfBird.capitalize()});
	}
}

function birds(num){
	var temp = new Array;
	for (var i = 0; i< birdsA.length; i++) {
		if(birdsA[i].number >= num){
			temp.push(birdsA[i]);
		}
	};
	return temp;

}

app.get('/', function(req, res){
	res.render('index',{
		url1: '/birds',
		url2: '/settings'
	});

});


app.get('/birds', function(req, res) {
	
	req.session.birdsA = birds(req.session.minNumber)

	var output;
	
	if (req.session.birdsA.length!=0){
		output=req.session.birdsA;
	}
	else{
		output=birdsA;
	}

	
	console.log(req.session.birdsA);
	res.render('birds', {
		'birds':output,
		url2: '/settings'});
});


app.post('/birds', function(req, res) {
	searchBird(req.body.birds);


	res.redirect('/birds');
});



app.get('/settings', function(req, res) {
	res.render('settings', {
		'minNumber':req.session.minNumber,
		url1: '/birds', 'value':req.session.minNumber});

});

app.post('/settings', function(req, res) {

	// change the global
	req.session.minNumber = req.body.minNumber;

	res.redirect('/birds');
});

var port = 3000;
app.listen(port);

console.log('listening to port: 3000');





