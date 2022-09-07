const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const usersController = require('../controller/usersControlFunc');


/*** users/login ******************************/
router.get('/login', csrfProtection, usersController.loginGet);
router.post('/login', csrfProtection, usersController.loginPost);

/*** users/add ******************************/
router.get('/add', csrfProtection, usersController.addGet);
router.post('/add', usersController.addPost);

/*** users/account ******************************/
router.get('/account', usersController.account);

/*** users/edit ******************************/
router.get('/edit', csrfProtection, usersController.editGet);
router.post('/edit', usersController.editPost);


module.exports = router;
