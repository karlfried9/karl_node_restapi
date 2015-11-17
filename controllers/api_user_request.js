var users = require('./api_user_exec'),
    validate = require('../helpers/validation');  

exports.reset = function(user, body, res) {

    var ok = function(doc) {
        res.json(doc);
    };

    var err = function(err) {
        res.json(err);
    };

    console.log(user);

    if (user) {         
        users.reset(user, body, ok);
    } else {
        res.json({
            "success":"false",
            "info": "no token found"});
    }
};

exports.register = function(req, res) {
    // console.log(req);
    var ok = function(doc) {
        res.json(doc);
    };
    var err = function(err) {
        res.json(err);
    };
    if (!validate.checkfornullbody(req, res) && validate.checkForRegistration(req, res)) {
        users.register(req, ok, err);
    }    

};

exports.login = function(req, res) {
    console.log(req.user);
    // console.log(req);
    var ok = function(doc) {
        res.json(doc);
    };
    var err = function(err) {
        res.json(err);
    };
    if (!validate.checkfornullbody(req, res) && validate.checkForRegistration(req, res)) {
        users.register(req, ok, err);
    }
    res.send({
        "success": "true",
        token: req.user.token
    });

};

exports.facebookauth = function(req, res) {

    res.send({
        success: 'true',
        token: req.user.token,
        info: 'user exists - returning token'
    });

};