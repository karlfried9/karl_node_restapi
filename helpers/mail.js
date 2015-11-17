var rootPath = process.cwd();

var configAuth = require(rootPath + '/config/helpers/mail.js'),
    sendgrid = require('sendgrid')(configAuth.sendgrid.apikey);

exports.send = function(req, res, error) {

    sendgrid.send(req, function(err, json) {
        if (err) {

            error(err);
        }

        res(json);

    });

};