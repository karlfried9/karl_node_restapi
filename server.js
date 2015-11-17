var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    passport = require('passport'),
    expressvalidator = require('express-validator'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    serveStatic = require('serve-static');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'set_some_unique_value',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressvalidator());

app.use(function(err, req, res, next) {
    if (err) {
        console.log(err);
    }
    next();
});
app.use(serveStatic('./web'));

app.set('port', process.env.PORT || 3001);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

require('./config/passport')(passport);
require('./config/routes')(app, passport);

// mongoose
mongoose.connect('mongodb://localhost/node_mobile_api');

var server = app.listen(app.get('port'), function(err) {
    if (err) throw err;

    var message = 'Server is running @ http://localhost:' + server.address().port;
    console.log(message);
});