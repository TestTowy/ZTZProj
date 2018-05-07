var express = require('express');
var redis = require('../modules/conn.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});
var router = express.Router();

router.get('/', function (req, res, next) {
      var promise = redis.pipeline();
      redis.lrange('rezyser',0,-1, function (err, result) {
          var rezyserowie = result;
          promise.exec(function (err, result) {
              res.render('RezyserLista', {groupsArray: rezyserowie});
          });
      });
});

router.get('/Dodaj', function (req, res, next) {
      var promise = redis.pipeline();
      promise.exec(function (err, result) {
      res.render('DodajRezysera', {});
      });
});

router.post('/DodajRezysera', urlencodedParser, function (req, res) {
        redis.rpush('rezyser', req.body.rezyser);
        res.redirect('/Rezyser');
});


module.exports = router;
