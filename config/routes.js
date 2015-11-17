var webusers = require('../controllers/web_user_request');
var apiusers = require('../controllers/api_user_request');

module.exports = function(app, passport) {

    /* WEB routes */
    /* ################################################################################## */

    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login'
        }), webusers.home
    );

    app.get('/login', webusers.login);

    app.get('/logout', webusers.logout);

    app.get('/', webusers.home);

    app.get('/users', webusers.users);

    /* API routes */
    /* ################################################################################## */

    /* user */
    /* ################################################# */

    app.post('/api/v1/register', apiusers.register);

    app.post('/reset', function(req, res) {

        passport.authenticate('token', function(err, user, info) {

            console.log(user);
            console.log(info);

            apiusers.reset(user, req.body, res);

        })(req, res);
    });

    app.post('/api/v1/fbtoken',
        passport.authenticate('facebook-token', {
        }), apiusers.facebookauth);

    app.post('/api/v1/login',
        passport.authenticate('local', {session: true}), apiusers.login);

    /**
     * Web Error handling
    /* ################################################################################## */

    app.use(function(err, req, res, next) {
        // treat as 404
        if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // assume 404 since no middleware responded
    app.use(function(req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
}