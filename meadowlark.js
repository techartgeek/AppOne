var express = require('express');

var app = express();

//set up handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//static resource handler (middleware)
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

//home page
app.get('/', function(req, res){
    res.render('home');
});

//about page
app.get('/about', function(req, res){
    res.render('about');
});

//custom 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

//custom 500 error handler page (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate...');
});
