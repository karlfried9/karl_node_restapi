var mongoose = require('mongoose');
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var Profile = new Schema({
    userId: ObjectId,
});

module.exports = mongoose.model('Profile', Profile);