const usersModelHandler = require('../model/userHandler');
const recipesModelHandler = require('../model/recipesHandler');

const usersController = {
    
    async loginGet(req, res) {
        res.render('users/login');
    },

    async loginPost(req, res) {
        // 入力データを代入
        const mail_address = "test@test.test";
        const pass = "test";

        // users_idを引っ張ってくる
        const users_db = new usersModelHandler;
        const result = await users_db.findUser(mail_address, pass);

        // login処理(passport)

        res.redirect('/recipes/today');
    },
    
    async addGet(req, res) {
        res.render('users/add');
    },
    
    async addPost(req, res) {
        // 入力データを代入
        const mail_address = "test@test.test";
        const pass = "test";

        // ユーザーを登録
        const users_db = new usersModelHandler;
        const result = await users_db.addUser(mail_address, pass);

        // resultからusers_idを引っ張ってくる

        // login処理(passport)

        res.redirect('/recipes/today');
    },

    async account(req, res) {
        // ログインチェック

        // seessionからusers_idを引っ張ってくる
        const users_id = "1";

        // ユーザーの情報を引っ張ってくる
        const users_db = new usersModelHandler;
        const user = await users_db.getUser(users_id);

        // 登録してあるレシピの件数を引っ張ってくる
        const recipes_db = new recipesModelHandler;
        const num_recipes = await recipes_db.countRecipes(users_id);

        const data = {
            "mail_address":user.mail_address,
            "recipe_num":num_recipes,
            "distance":user.recipe_interval
        }
        /* 
        const data = {
            "mail_address":"test@test.test",
            "recipe_num":"2件",
            "distance":"5日"
        }
        */
        res.render('users/account', data);
    },

    async editGet(req, res) {
        // ログインチェック

        // seessionからusers_idを引っ張ってくる
        const users_id = "1";

        // ユーザーの情報を引っ張ってくる
        const users_db = new usersModelHandler;
        const user = await users_db.getUser(users_id);

        // 登録してあるレシピの件数を引っ張ってくる
        const recipes_db = new recipesModelHandler;
        const num_recipes = await recipes_db.countRecipes(users_id);

        const data = {
            "mail_address":user.mail_address,
            "recipe_num":num_recipes,
            "distance":user.recipe_interval
        }
        /* 
        const data = {
            "mail_address":"test@test.test",
            "recipe_num":"2件",
            "distance":"5日"
        }
        */
        res.render('users/edit', data);
    },

    async editPost(req, res) {
        // ログインチェック

        // seessionからusers_idを引っ張ってくる
        const users_id = "1";

        // フォームから入力データをもってくる
        const mail_address = "test@test.test";
        const pass = "test";
        const recipe_interval = "5";

        // ユーザーの情報を更新する
        // passは変更がない場合はnull
        const users_db = new usersModelHandler;
        const user = await users_db.editUser(users_id, mail_address, pass, recipe_interval);        

        res.redirect('/users/account');
    }

}

module.exports = usersController;