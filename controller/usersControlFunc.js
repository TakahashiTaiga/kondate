const csrf = require('csurf');

const usersModelHandler = require('../model/userHandler');
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

const usersController = {
    
    // users/login
    async loginGet(req, res) {
        //token
        const data = {
            csrfToken: req.csrfToken()
        }
        res.render('users/login', data);
    },

    // users/login
    async loginPost(req, res) {
        const mail_address = req.body.mail_address;
        const pass = req.body.pass;
        
        if(mail_address==null){res.render('users/login');}
        if(pass==null){res.render('users/login');}
        
        // users_idを引っ張ってくる
        const users_db = new usersModelHandler;
        const result = await users_db.findUser(mail_address, pass);

        if(result.users_id!=null){
            req.session.users_id = result.users_id;
            res.redirect('/recipes/today');
        } else {
            const data = {
                csrfToken: req.csrfToken()
            }
            res.redirect('/users/login', data);
        } 
    },
    
    // users/add
    async addGet(req, res) {
        // token
        const data = {
            csrfToken: req.csrfToken()
        }
        res.render('users/add', data);
    },

    // users/add    
    async addPost(req, res) {
        const mail_address = req.body.mail_address;
        const pass = req.body.password;

        if(mail_address==null){res.render('users/add');}
        if(pass==null){res.render('users/add');}

        // ユーザーを登録
        const users_db = new usersModelHandler;
        const result = await users_db.addUser(mail_address, pass);

        // resultからusers_idを引っ張ってくる
        req.session.users_id = result.insertId;

        res.redirect('/recipes/today');
    },

    // users/account
    async account(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        // ユーザーの情報を引っ張ってくる
        const users_db = new usersModelHandler;
        const user = await users_db.getUser(users_id);

        // 登録してあるレシピの件数を引っ張ってくる
        const recipes_db = new recipesModelHandler;
        const num_recipes = await recipes_db.countRecipes(users_id);

        const data = {
            "mail_address":user.mail_address,
            "recipe_num":num_recipes + '件',
            "recipe_interval":user.recipe_interval + '日'
        }

        res.render('users/account', data);
    },

    // users/edit
    async editGet(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        // ユーザーの情報を引っ張ってくる
        const users_db = new usersModelHandler;
        const user = await users_db.getUser(users_id);

        // 登録してあるレシピの件数を引っ張ってくる
        const recipes_db = new recipesModelHandler;
        const num_recipes = await recipes_db.countRecipes(users_id);

        // token
        const data = {
            "mail_address":user.mail_address,
            "recipe_num":num_recipes,
            "recipe_interval":user.recipe_interval,
            csrfToken: req.csrfToken()
        }
        res.render('users/edit', data);
    },

    // users/edit
    async editPost(req, res) {
        // ログインチェック
        check(req, res);

        // seessionからusers_idを引っ張ってくる
        const users_id = req.session.users_id;

        // フォームから入力データをもってくる
        const mail_address = req.body.mail_address;
        const pass1 = req.body.pass1;
        const pass2 = req.body.pass2;
        if(pass1!=pass2){
            res.redirect('/users/edit');
        }
        const recipe_interval = req.body.recipe_interval;

        // ユーザーの情報を更新する
        // passは変更がない場合はnull
        const users_db = new usersModelHandler;
        const user = await users_db.editUser(users_id, mail_address, pass1, recipe_interval);        

        res.redirect('/users/account');
    }

}

module.exports = usersController;