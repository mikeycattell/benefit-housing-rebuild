var express = require('express');
var router = express.Router();
var config = require(__dirname + '/config.js');

router.get('/', function (req, res) {
  res.redirect('/' + config.current_prototype + '/start-page');
});

router.get('/reset', function(req, res) {
  for (var cookie in req.cookies) {
    if ( cookie !== 'seen_cookie_message' ) {
      res.clearCookie(cookie);
    }
  }
  res.redirect('/' + config.current_prototype + '/start-page');
});
// add your routes here

module.exports = router;
