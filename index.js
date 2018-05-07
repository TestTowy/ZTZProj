var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var index = require('./routes/index');
var Opis = require('./routes/Opis');
var Rezyser = require('./routes/Rezyser');
var Komentujacy = require('./routes/Komentujacy');

app.set('port', (process.env.PORT || 5000));

app.use('/', index);
app.use('/Opis', Opis);
app.use('/Rezyser', Rezyser);
app.use('/Komentujacy', Komentujacy);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
