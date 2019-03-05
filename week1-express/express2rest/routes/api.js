var express = require('express');
var router = express.Router();
var jokes  = require('../model/jokes')
/* GET users listing. */
router.get('/random', function(req, res, next) {
  // for demonstration
  // if(true){
  //   //create error object 
  //   var err = new Error("UPPPPPS");
  //   // setting a new variable in err
  //   err.isJson = true;
  //   // can be thrown with --> throw err
  //   return next(err);
  // }
  res.json({joke:jokes.getRandomJoke()});
});

router.get('/error', function(req, res, next) {
  // for demonstration
  if(true){
    //create error object 
    var err = new Error("UPPPPPS");
    // setting a new variable in err
    err.isJson = true;
    // can be thrown with --> throw err
    return next(err);
  }
  res.json(jokes.getRandomJoke());
});

module.exports = router;
