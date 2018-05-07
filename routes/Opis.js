var express = require('express');
var redis = require('../modules/conn.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});

var router = express.Router();

router.get('/', function(req, res, next) {

    var data = {};
    var promise = redis.pipeline()
        .get('NAZWA_APLIKACJI', function (err, result) {
            data.nazwa_aplikacji = result;
        })
        .get('OPIS_APLIKACJI', function (err, result) {
            data.opis_aplikacji = result;
        })
        .get("AUTOR_APLIKACJI", function (err, result) {
            data.autor_aplikacji = result;
        })
        .get("WERSJA_APLIKACJI", function (err, result) {
            data.wersja_aplikacji = result;
        })
        .exec();
    promise.then(function (result) {
        console.log("test" + result);
        res.render('Opis', data);
    });
});

router.get('/OpisEdytuj', function (req, res, next) {

    var data = {};
    redis.pipeline()
        .get('NAZWA_APLIKACJI', function (err, result) {
            data.nazwa_aplikacji = result;
        })
        .get('OPIS_APLIKACJI', function (err, result) {
            data.opis_aplikacji = result;
        })
        .get("AUTOR_APLIKACJI", function (err, result) {
            data.autor_aplikacji = result;
        })
        .get("WERSJA_APLIKACJI", function (err, result) {
            data.wersja_aplikacji = result;
        })
        .exec(function (err, result) {
            res.render('OpisEdytuj', data);
        });
});


router.post('/OpisEdytuj', urlencodedParser, function (req, res) {
        redis.set('NAZWA_APLIKACJI', req.body.nazwa_aplikacji);
        redis.set('OPIS_APLIKACJI', req.body.opis_aplikacji);
        redis.set('AUTOR_APLIKACJI', req.body.autor_aplikacji);
        redis.set('WERSJA_APLIKACJI', req.body.wersja_aplikacji);
        res.redirect('/Opis');
});

module.exports = router;
