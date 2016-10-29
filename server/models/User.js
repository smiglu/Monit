/**
 * Created by Marcin on 2016-02-13.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('User', UserSchema);