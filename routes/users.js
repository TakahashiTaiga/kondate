const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controller/usersControlFunc');


/*** users/login ******************************/
router.get('/login', usersController.loginGet);
router.post('/login', usersController.loginPost);
/*
router.post('/login', passport.authenticate('local', 
{successRedirect: '/recipes/today',
failureRedirect: '/login',
session: true}), usersController.loginPost);
*/
/*** users/add ******************************/
router.get('/add', usersController.addGet);
router.post('/add', usersController.addPost);

/*** users/account ******************************/
router.get('/account', usersController.account);

/*** users/edit ******************************/
router.get('/edit', usersController.editGet);
router.post('/edit', usersController.editPost);


module.exports = router;
