/**
 * Created by Marcin on 2016-02-13.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    date: Date
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('User', UserSchema);
