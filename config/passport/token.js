TokenStrategy = require('passport-token-auth').Strategy,
    User = require('../../models/user');

module.exports = new TokenStrategy({},
    function(token, done) {
        User.findOne({
            token: token
        }, function(err, data) {
            if (err) {
                return done(null,
                {
                    success: 'false',
                    info: err
                });
            }
            if (data === null) {
                return done(null, null)
            } else {
                return done(null, data.attributes);
            }

        });
    });
