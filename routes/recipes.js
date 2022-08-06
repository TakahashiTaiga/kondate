const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const recipesController = require('../controller/recipesControlFunc');


/*** recipes/today ******************************/
router.get('/today', recipesController.today);

/*** recipes/all ******************************/
router.get('/all', recipesController.all);

/*** recipes/recipe ******************************/
router.get('/recipe/:recipes_id', recipesController.recipe);

/*** recipes/add ******************************/
router.get('/add', csrfProtection, recipesController.addGet);
router.post('/add', recipesController.addPost);

/*** recipes/edit ******************************/
router.get('/edit/:recipes_id', csrfProtection, recipesController.editGet);
router.post('/edit/:recipes_id', recipesController.editPost);

/*** recipes/delete ******************************/
// router.get('/delete/:recipes_id', recipesController.deleteGet);

module.exports = router;
