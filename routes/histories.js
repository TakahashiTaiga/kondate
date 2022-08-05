const express = require('express');
const router = express.Router();
const historiesController = require('../controller/historiesControlFunc');


/*** histories/ ******************************/
router.get('/', historiesController.index);

/*** histories/history ******************************/
router.get('/history/:histories_id', historiesController.history);

/*** histories/add ******************************/
router.get('/add/:recipes_id', historiesController.addGet);
router.post('/add/:recipes_id', historiesController.addPost);

/*** histories/edit ******************************/
router.get('/edit/:histories_id', historiesController.editGet);
router.post('/edit/:histories_id', historiesController.editPost);


module.exports = router;
