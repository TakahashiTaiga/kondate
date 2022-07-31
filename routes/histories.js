const express = require('express');
const router = express.Router();
const historiesController = require('../controller/historiesControlFunc');


/*** histories/ ******************************/
router.get('/', historiesController.index);

/*** histories/history ******************************/
router.get('/history/:histories_id', historiesController.history);

/*** histories/add ******************************/
router.get('/add/:recipes_id', historiesController.addGet);
router.post('/add', historiesController.addPost);

/*** histories/edit ******************************/
router.get('/edit/:histories_id', historiesController.editGet);
router.post('/edit', historiesController.editPost);


module.exports = router;
