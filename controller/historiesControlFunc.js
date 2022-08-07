const historiesModelHandler = require('../model/historiesHandler');
const recipesModelHandler = require('../model/recipesHandler');
const { DateTime } = require("luxon");

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

const historiesController = {
    
    // /histories/
    async index(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getAll(users_id);

        const data = {
            "contents":result
        }
        res.render('histories/index', data);
    },

    // /histories/history/:hitories_id
    async history(req, res){
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const histories_id = req.params.histories_id * 1;

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getHistories(histories_id);

        // \n -> <br>の処理

        const data = result;
        /*
        const data = {
            "histories_id":1,
            "name":"チキンソテー",
            "ingredient":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす<br>2. フライパンにオイルとニンニクを入れ加熱する<br>3. 1のもも肉をフライパンに入れ加熱する<br>4. 両面を加熱して出来上がり",
            "date":"7月5日"
        }
        */
        res.render('histories/history', data);
    },

    // /histories/add/:recipes_id
    async addGet(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const recipes_id = req.params.recipes_id * 1;

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getRecipe(recipes_id);

        // \n -> <br>の処理

        // 日にち
        const today = DateTime.local();
        const date = today.toFormat('YYYY-MM-dd').split('-');
        const year = Number(date[0]);
        const month = Number(date[1]);
        const day = Number(date[2]);

        const data = {
            "recipes_id":recipes_id,
            "name":result.name,
            "ingredient":result.ingredient,
            "way":result.way,
            "year":year,
            "month":month,
            "day":day,
            csrfToken: req.csrfToken()
        }

        res.render('histories/add', data);
    },
    
    // /histories/add/:recipes_id
    async addPost(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        // URLからrecipes_idをもってくる
        const recipes_id = req.params.recipes_id * 1;

        // 入力データをもってくる
        const name = req.body.name;
        const ingredient = req.body.ingredient;
        const way = req.body.way;
        const year = req.body.year;
        const month = req.body.month;
        const day = req.body.day;

        // 日にち処理
        const date = year + '-' + month + '-' + day;

        const histories_db = new historiesModelHandler;
        const result = await histories_db.addHistories(users_id, recipes_id, name, ingredient, way, date);

        res.redirect('/histories/');
    },
    
    // /histories/edit/:histories_id
    async editGet(req, res) {
        // ログインチェック
        check(req, res);

        // URLからhistories_idをもってくる
        const histories_id = req.params.histories_id * 1;

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getHistories(histories_id);

        // \n -> <br>の処理

        // 日にち処理
        const date = result.date.split('-');
        const year = Number(date[0]);
        const month = Number(date[1]);
        const day = Number(date[2]);

        const data = {
            "histories_id":histories_id,
            "name":result.name,
            "ingredient":result.ingredient,
            "way":result.way,
            "year":year,
            "month":month,
            "day":day,
            csrfToken: req.csrfToken()
        }
        res.render('histories/edit', data)
    },
    
    // /histories/edit/
    async editPost(req, res) {
        // ログインチェック
        check(req, res);

        // URLからhistories_idをもってくる
        const histories_id = req.params.histories_id * 1;

        // 入力データをもってくる
        const name = req.body.name;
        const ingredient = req.body.ingredient;
        const way = req.body.way;
        const year = req.body.year;
        const month = req.body.month;
        const day = req.body.day;

        // 日にち処理
        const date = year + '-' + month + '-' + day;

        logger.debug(date);

        const histories_db = new historiesModelHandler;
        const result = await histories_db.editHistories(histories_id, name, ingredient, way, date);

        res.redirect('/histories/');
    },

    // recipes/delete/:histories_id
    async deleteGet(req, res) {
        // ログインチェック
        check(req, res);

        // URLからrecipes_idをひっぱてくる
        const histories_id = req.params.histories_id * 1;

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getHistories(histories_id);

        const data = {
            "name":result.name,
            "histories_id":histories_id,
            csrfToken: req.csrfToken()
        }
        res.render('histories/delete', data)
    },

    // recipes/delete/:histories_id
    async deletePost(req, res) {
        // ログインチェック
        check(req, res);

        // URLからrecipes_idをひっぱてくる
        const histories_id = req.params.histories_id * 1;

        const histories_db = new historiesModelHandler;
        const result = await histories_db.deleteHistories(histories_id);

        res.redirect('/histories/');
    }
}

module.exports = historiesController;