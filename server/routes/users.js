var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User.js');

var users = express.Router();

/* GET users listing. */
users.get('/', function (req, res, next) {
    var list = [
        {name: 'Maciek'},
        {name: 'Marcin'}
    ];

    res.json(list);

    //uncomment if your mongoDB is running

    //User.find(function (err, list) {
    //    if (err) return next(err);
    //    res.json(list);
    //});
});


users.post('/', function (req, res, next) {
    var user = new User(req.body);
    user.save();
    res.send({status: 'ok', req: req.body});
});

module.exports = users;
