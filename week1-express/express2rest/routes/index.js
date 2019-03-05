var express = require('express');
var router = express.Router();

var model = {
  title: "Site with a simple JOKE API",
  howToUse : "Get a random joke like this: /api/random"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express'});
  res.render('index', { title: 'Express', model});
});

module.exports = router;
