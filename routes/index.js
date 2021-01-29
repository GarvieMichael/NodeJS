var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', number: Math.random(), secret_boi: process.env.DB_NAME });
});

module.exports = router;
