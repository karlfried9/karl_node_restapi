var LocalStrategy = require('passport-local').Strategy,
User = require('../../models/user'),
bcrypt = require('bcrypt-nodejs'),
randomstring = require("randomstring");

module.exports = new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        console.log("running local");
        User.findOne({
            email: email
        },function(err, user) {            
            if (err || user === null) {
                return done(null, false, {
                    message: 'Invalid email or password'
                });
            } else {
                user_json = user.toJSON();
                if (!bcrypt.compareSync(password, user_json.password)) {
                    return done(null, false, {
                        message: 'Invalid email or password'
                    });
                } else {
                    console.log("found user");
                    console.log(user_json);
                    return done(null, user);
                }
            }
        });

    });


