var express = require('express');
var redis = require('../modules/conn.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});
var router = express.Router();

router.get('/', function (req, res, next) {
    var promise = redis.pipeline();
    redis.smembers('komentujacy', function (err, result) {
        var koment = result;
        promise.exec(function (err, result) {
            res.render('ZbiorKomentujacy', {groupsArray: koment});
        });
    });
});
/*
router.get('/', function (req, res, next) {
    var promise = redis.pipeline();
    redis.smembers('ogladajacy', function (err, result) {
        var oglad = result;
        promise.exec(function (err, result) {
            res.render('ZbiorKomentujacy', {groupsArray1: oglad});
        });
    });
});
*/

router.get('/:id/Przenies', function (req, res) {
    var id = req.params.id;
    var editValue = {};
    redis.smembers('komentujacy', function (err, result) {
      var origin = result
        for (var i = 0; i < origin.length; i++) {
          if (id == i.toString()) {
            editValue.name = origin[i];
          }
        }
        res.render('PrzeniesKomentujacego', editValue);
    });
});

router.post('/Przenies', urlencodedParser, function (req, res) {
    redis.smove('komentujacy','ogladajacy', req.body.komentujacy);
    res.redirect('/Komentujacy');
});

module.exports = router;
