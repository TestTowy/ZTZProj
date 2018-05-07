/** Modules dependencies **/
var express = require('express');
var redis = require('../modules/conn');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'bla bal bla test'});
});

/*
router.get('/', function (req, res, next) {

//  var forlen = redis.call('keys','film:*:tytul');
      var promise = redis.pipeline();
      var tabelka = {};
      //console.log(forlen);
  //for (var i = 1; i < 12; i++) {
      redis.mget('film:1:tytul', function (err, result) {
      var filmy = result;
      promise.exec(function (err, result) {
        for (var i = 0; i < filmy.length; i++) {
          //res.render('index', {groupsArray: filmy});
          tabelka.name = filmy[i];
        }
        res.render('index', tabelka);
      });
  });

//}
});
*/
module.exports = router;
