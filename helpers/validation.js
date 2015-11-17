var util = require('util');

function checkfornullbody(req, res) {
    if (isEmptyObject(req.body)) {
        res.send({
            "success": "false",
            "result": "no request body found"
        });
        return true;
    } else {
        return false;
    }
}

function checkforemptyfield(req, res, name) {
    var errors = req.validationErrors();
    req.checkBody(name, 'required field').notEmpty();

    if (!req.validationErrors() | req.validationErrors().length == 0) {
        return true;
    } else {
        res.status(400).send({
            "success": "false",
            "result": util.inspect(errors)
        });
        return false;
    }
}

/** Validation for Registration **/
function checkForRegistration(req, res) {    
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Invalid password').len(6, 30); 
    var errors = req.validationErrors();
    console.log(errors);

    if (!req.validationErrors() | req.validationErrors().length == 0) {
        return true;
    } else {
        res.status(400).send({
            "success": "false",
            "result": errors,
        });
        return false;
    }
}

exports.checkforemptyfield = checkforemptyfield;
exports.checkfornullbody = checkfornullbody;
exports.checkForRegistration = checkForRegistration;


function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};