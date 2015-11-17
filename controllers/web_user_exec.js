var bcrypt = require('bcrypt-nodejs'),
    User = require('../models/user'),
    randomstring = require("randomstring");

function Users() {
    if (!(this instanceof Users)) {
        return new Users();
    }
    this.users = User;
}

module.exports = Users();   

Users.prototype.fetchusers = function(req, success, error) {
    new User().fetchAll().then(function(collection) {       
        //console.log(collection.toJSON());
        var allusers = collection.toJSON();
        success(allusers);
    });
}
