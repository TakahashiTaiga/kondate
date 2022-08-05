const recipesModelHandler = require('../model/recipesHandler');

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

function check(req, res) {
    if (req.session.users_id == null) {
      res.redirect('/users/login');
    } else {
      return false;
    }
}

const recipesController = {
    
    // recipes/today
    async today(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getForToday(users_id);

        const data = {
            "contents":result
        }
        
        res.render('recipes/today', data);
    },

    // recipes/all
    async all(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getAll(users_id);

        const data = {
            "contents":result
        }

        res.render('recipes/all', data);
    },
    
    // recipes/recipe/:recipes_id
    async recipe(req, res) {
        // ログインチェック
        check(req, res);

        // URLからrecipes_idをひっぱてくる
        const recipes_id = req.params.recipes_id * 1;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getRecipe(recipes_id);

        // \n -> <br>の処理

        const data = result;

        logger.debug(data);
        /*
        // \n -> <br>
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "ingredient":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす<br>2. フライパンにオイルとニンニクを入れ加熱する<br>3. 1のもも肉をフライパンに入れ加熱する<br>4. 両面を加熱して出来上がり"
        }
        */
        res.render('recipes/recipe', data);
    },
    
    // recipes/add
    async addGet(req, res) {
        // ログインチェック
        check(req, res);
        
        res.render('recipes/add');
    },
    
    // recipes/add
    async addPost(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        // フォームから入力データをもってくる
        const name = req.body.name;
        const ingredient = req.body.ingredient;
        const way = req.body.way;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.addRecipe(users_id, name, ingredient, way);

        res.redirect('/recipes/all');
    },

    // recipes/edit:recipes_id
    async editGet(req, res) {
        // ログインチェック
        check(req, res);

        // URLからrecipes_idをひっぱてくる
        const recipes_id = req.params.recipes_id * 1;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getRecipe(recipes_id);

        // <br> -> \nの処理

        const data = result;

        logger.debug(data);
        /*
        // <br> -> \n
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "ingredient":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり"
        }
        */
        res.render('recipes/edit', data);
    },

    // recipes/edit/:recipes_id
    async editPost(req, res) {
        // ログインチェック
        check(req, res);

        // URLからrecipes_idをひっぱてくる
        const recipes_id = req.params.recipes_id * 1;

        // フォームから入力データをもってくる
        const name = req.body.name;
        const ingredient = req.body.ingredient;
        const way = req.body.way;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.editRecipe(recipes_id, name, ingredient, way);

        res.redirect('/recipes/recipe/'+recipes_id);
    }

}

module.exports = recipesController;