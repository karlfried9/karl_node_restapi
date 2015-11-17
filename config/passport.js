var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy,    
    User = require('../models/user'),
    local = require('./passport/local'),
    facebooktoken = require('./passport/facebook-token'),
    token = require('./passport/token');

module.exports = function(passport) {
    
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});    

	passport.use(local)
	passport.use(facebooktoken);
	passport.use(token);

};