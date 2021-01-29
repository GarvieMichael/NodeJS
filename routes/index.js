var express = require('express');
var router = express.Router();
var user = process.env.DB_USER;
var password =process.env.DB_USER_PW;

var mongo_route = 'mongodb://' + user + ':' + password + '@' + fc-database + '/' + fc-final-test-node
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', number: Math.random(), secret_boi: process.env.DB_NAME, mongo_route: mongo_route });
});

module.exports = router;
