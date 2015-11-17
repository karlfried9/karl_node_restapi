var FacebookTokenStrategy = require('passport-facebook-token').Strategy,
User = require('../../models/user'),
bcrypt = require('bcrypt-nodejs'),
randomstring = require("randomstring"),
settings = require('../settings');


module.exports = new FacebookTokenStrategy({
        clientID: settings.facebookAuth.clientID,
        clientSecret: settings.facebookAuth.clientSecret
    },
    function(accessToken, refreshToken, profile, success) {
        
        User.findOne({
            email: profile._json.email
        }).then(function(data) {

            /****** does user exist ******/
            var user = data;
            if (user === null) {
                // make new user
                var tokenstring = randomstring.generate(32),
                    password = tokenstring,
                    email = profile._json.email;

                signUpUser = new User({
                    email: email,
                    password: password,
                    token: tokenstring,
                    facebookId: profile.id
                });

                //save new user
                signUpUser.save(function(err, user) {                        
                    if (err) error(err);
                    if (profile !== null) {
                        success({
                            "success": "true",
                            "result": "user created",
                            "token": user.attributes.token
                        });
                    }
                });
            } else {

                //console.log("success");
                //console.log(user.attributes.token);

                return success(null, user.attributes);

            }
        });
    });