var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/User.js');

var users = express.Router();

/* GET users listing. */
users.get('/', function (req, res, next) {
    /*var list = [
        {name: 'Maciek'},
        {name: 'Marcin'}
    ];

    res.json(list);*/
    //uncomment if your mongoDB is running
    var getParam = Object.keys(req.query);
    if (getParam.length > 0) {
        for (var key in req.query) {
            if (req.query.hasOwnProperty(key)) {
                console.log(key + " -> " + req.query[key]);
            }
        }

    } else {
        User.find(function (err, list) {
            if (err) return next(err);
            res.json(list);
        });
    }
});


users.post('/', function (req, res, next) {
    var name = req.url;
    if (name.indexOf("name") != -1) {
        var parameter = {
            name: name.substr(7, name.length),
            date: new Date()
        };
        var user = new User(parameter);
        user.save();
        res.send({
            status: 'ok',
            req: req.body
        });
    } else {
        var user = new User(req.body);
        user.save();
        res.send({
            status: 'ok',
            req: req.body
        });
    }
});

module.exports = users;
