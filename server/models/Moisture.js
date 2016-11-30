/**
/**
 * Created by Marcin on 2016-02-13.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    moisture1: String,
    moisture2: String,
    moisture3: String,
    date: Date
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Moisture', UserSchema);
