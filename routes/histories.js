const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const historiesController = require('../controller/historiesControlFunc');


/*** histories/ ******************************/
router.get('/', historiesController.index);

/*** histories/history ******************************/
router.get('/history/:histories_id', historiesController.history);

/*** histories/add ******************************/
router.get('/add/:recipes_id', csrfProtection, historiesController.addGet);
router.post('/add/:recipes_id', historiesController.addPost);

/*** histories/edit ******************************/
router.get('/edit/:histories_id', csrfProtection, historiesController.editGet);
router.post('/edit/:histories_id', historiesController.editPost);

/*** histories/delete ******************************/
router.get('/delete/:histories_id', csrfProtection, historiesController.deleteGet);
router.post('/delete/:histories_id', historiesController.deletePost);


module.exports = router;
