var express = require('express');
var router = express.Router();

var rp = require('request-promise');

/* GET home page. */
router.get('/', function(req, res) {

  var data = {
    text: "@channel Ring Ring!!!!"
  };

  var options = {
    method: 'POST',
    body: data,
    uri: 'https://hooks.slack.com/services/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',
    json: true
  };

  rp(options)
    .then(function (date) {
      console.log(data);
      res.render('index', { message: 'Ring Ring!!!' });
    })
    .catch(function (err) {
      console.log(err.message);
      res.render('index', { message: 'Sorry :(' });
    });
});

module.exports = router;
