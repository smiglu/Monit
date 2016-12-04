var express = require('express');
var mongoose = require('mongoose');
var Moisture = require('../models/Moisture.js');

var moistures = express.Router();

/* GET moistures listing. */
moistures.get('/', function (req, res, next) {
    /*var list = [
        {name: 'Maciek'},
        {name: 'Marcin'}
    ];

    res.json(list);*/
    //uncomment if your mongoDB is running
    console.log("Eloo");
    var getParam = Object.keys(req.query);
    if (getParam.length > 0) {
        var parameter = {
            moisture1: "0",
            moisture2: "0",
            moisture3: "0",
            date: new Date()
        };
        console.log(parameter);
        for (var key in req.query) {
            //for (i = 0; 1 < getParam.length; i++) {
            if (req.query.hasOwnProperty(key)) {
                console.log("Eloszka");
                console.log(key + " -> " + req.query[key]);
                if (key === "moisture1") {
                    parameter.moisture1 = req.query[key];
                } else if (key === "moisture2") {
                    parameter.moisture2 = req.query[key];
                } else if (key === "moisture3") {
                    parameter.moisture3 = req.query[key];
                }

            }
        }
        console.log(parameter);

        var moisture = new Moisture(parameter);
        moisture.save();
        res.send({
            status: 'ok',
            req: req.body
        })

    } else {
        Moisture.find(function (err, list) {
            if (err) return next(err);
            res.json(list);
        });
    }
});


moistures.post('/', function (req, res, next) {
    console.log("Eloo");
    var name = req.url;
    if (name.indexOf("name") != -1) {
        var parameter = {
            name: name.substr(7, name.length),
            date: new Date()
        };
        var moisture = new moisture(parameter);
        moisture.save();
        res.send({
            status: 'ok',
            req: req.body
        });
    } else {
        var moisture = new Moisture(req.body);
        moisture.save();
        res.send({
            status: 'ok',
            req: req.body
        });
    }
});

module.exports = moistures;
