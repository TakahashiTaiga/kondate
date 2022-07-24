const express = require('express');
const router = express.Router();
const recipesController = require('../controller/recipesControlFunc');


/*** recipes/today ******************************/
router.get('/today', recipesController.today);

/*** recipes/all ******************************/
router.get('/all', recipesController.all);

/*** recipes/recipe ******************************/
router.get('/recipe/:recipes_id', recipesController.recipe);

/*** recipes/add ******************************/
router.get('/add', recipesController.addGet);
router.post('/add', recipesController.addPost);

/*** recipes/edit ******************************/
router.get('/edit/:recipes_id', recipesController.editGet);
router.post('/edit', recipesController.editPost);


module.exports = router;
