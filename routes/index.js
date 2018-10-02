var express = require('express');
var router = express.Router();
var whois = require('whois');

var rp = require('request-promise');

/* GET home page. */
router.get('/', function(req, res) {

  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }


  whois.lookup(ipAddr, function (err, whois) {

    var data = {
      text: "Hey <!here|here>, Ring Ring!!!! IP: " + ipAddr + "\nWHOIS: " + whois
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

});

module.exports = router;
