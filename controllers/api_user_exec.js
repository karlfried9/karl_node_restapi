var bcrypt = require('bcrypt-nodejs'),
    User = require('../models/user'),
    randomstring = require("randomstring");
    Profile = require('../models/profile');

function Users() {
    if (!(this instanceof Users)) {
        return new Users();
    }
    this.users = User;
}

module.exports = Users();

Users.prototype.reset = function(user, body, success) {

    var password = body.password,
        hash = bcrypt.hashSync(password)

    jsonupdate = {
        "password": hash
    };

    if (user.facebookId == null && body.password != null) {
        new User({
            token: user.token
        })
        .save(jsonupdate, {
            patch: true
        }).then(function(model) {
            console.log(model)
            if (model !== null) {
                success({
                    "success": "true",
                    "result": model
                });
            } else {                
                success({
                    "success": "false",
                    "result": "no user profile"
                });
            }
        });
    } else {
        success({
            "success": "false",
            "result": "facebook user"
        });
    }
};

Users.prototype.register = function(req, success, error) {    
    User.findOne({
            email: req.body.email
        }, function(err, model) {
            if (err) {
                console.log(err);
                error({
                    success: 'false',
                    info: err
                });
            }
            if (model !== null) {
                success({
                    "success": "false",
                    "result": "email already exists"
                });
            } else {
                var password = req.body.password;
                if (password.length < 6) {
                    success({
                        "success": "false",
                        "result": "password need to be more than 6 characters!"
                    }); 
                    return;
                }
                var hash = bcrypt.hashSync(password),
                    tokenstring = randomstring.generate(32),
                    signUpUser = new User({
                        email: req.body.email,
                        password: hash,
                        token: tokenstring
                    });
                console.log(signUpUser);

                signUpUser.save(function(err, user) {                    
                    if (err || user == null) {
                        console.log(err);
                        error({
                            success: 'false',
                            info: err
                        });
                    } else {
                        user_profile = new Profile({
                            userId: user._id,
                        });
                        console.log(user_profile);

                        user_profile.save(function(err, profile){
                            if (err) {
                                user.remove().exec();
                                success({
                                    "success": "fail",
                                    "result": err,                                    
                                });
                            } else {
                                success({
                                    "success": "true",
                                    "result": "user created successfully",
                                    "token": user.token
                                });
                            }
                        });                          
                    }                        
                });
            }
        });
};

Users.prototype.login = function(req, success, error) {

};