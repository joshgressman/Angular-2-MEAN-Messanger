var express = require('express');
var router = express.Router();
// var User = require('../models/user'); imports the user model / Schema


router.get('/', function (req, res, next) {
        res.render('index');
});




module.exports = router;
