var users = require('./web_user_exec'),
    validate = require('../helpers/validation');

exports.home = function(req, res) {

    if (!req.isAuthenticated() || req.user.isAdmin != 1) {
        if(req.session){
            req.session.destroy();
            console.log("destroy session");
        };
        res.redirect('/login');
    } else {
        res.render('../views/index', {
            title: 'Hey',
            message: 'Hello there!'
        });
    }
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/login');
};

exports.login = function(req, res) {
    res.render('../views/login', {
        user: req.user
    });
};

exports.users = function(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login')
    } else {
        var ok = function(doc) {
            console.log(doc[0]);
            res.render('../views/users', {
                results: doc
            });
        };

        var err = function(err) {
            res.json(err);
        };
        users.fetchusers(req, ok, err);
    }
};

exports.session = login;

function login(req, res) {
    var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
};