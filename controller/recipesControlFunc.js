const recipesModelHandler = require('../model/recipesHandler');

const recipesController = {
    
    // recipes/today
    async today(req, res) {
        // ログインチェック
        
        // sessionからusers_idをもってくる
        const users_id = "0";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getForToday(users_id);

        const data = {
            "contents":result
        }
        /*
        const data = {
            "contents":[
                {
                    "recipes_id":1,
                    "name":"チキンソテー",
                    "resorce":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル"
                },
                {
                    "recipes_id":2,
                    "name":"鶏肉のトマト煮",
                    "resorce":"もも肉<br>トマト缶<br>塩コショウ<br>トマト<br>"
                }
        ]}
        */
        res.render('recipes/today', data);
    },

    // recipes/all
    async all(req, res) {
        // ログインチェック
        
        // sessionからusers_idをもってくる
        const users_id = "0";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getAll(users_id);

        const data = {
            "contents":result
        }
        /*
        const data = {
            "contents":[
                {
                    "recipes_id":1,
                    "name":"チキンソテー"
                },
                {
                    "recipes_id":2,
                    "name":"鶏肉のトマト煮"
                }
        ]}
        */
        res.render('recipes/all', data);
    },
    
    // recipes/recipe/:recipes_id
    async recipe(req, res) {
        // ログインチェック
        
        // URLからrecipes_idをもってくる
        const recipes_id = "0";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getRecipe(recipes_id);

        // \n -> <br>の処理


        const data = result;
        /*
        // \n -> <br>
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす<br>2. フライパンにオイルとニンニクを入れ加熱する<br>3. 1のもも肉をフライパンに入れ加熱する<br>4. 両面を加熱して出来上がり"
        }
        */
        res.render('recipes/recipe', data);
    },
    
    // recipes/add
    async addGet(req, res) {
        // ログインチェック
        
        res.render('recipes/add');
    },
    
    // recipes/add
    async addPost(req, res) {
        // ログインチェック
        
        // sessionからusers_idをもってくる
        const users_id = "0";

        // フォームから入力データをもってくる
        const name = "test";
        const resorce = "test";
        const way = "test";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.addRecipe(users_id, name, resorce, way);

        res.redirect('/recipes/all');
    },

    // recipes/edit:recipes_id
    async editGet(req, res) {
        // ログインチェック
        
        // URLからrecipes_idをもってくる
        const recipes_id = "0";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getRecipe(recipes_id);

        // <br> -> \nの処理

        
        const data = result;

        /*
        // <br> -> \n
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり"
        }
        */
        res.render('recipes/edit', data);
    },

    // recipes/edit
    async editPost(req, res) {
        // ログインチェック
        
        // URLからrecipes_idをもってくる
        const recipes_id = "0";

        // フォームから入力データをもってくる
        const name = "test";
        const resorce = "test";
        const way = "test";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.addRecipe(users_id, name, resorce, way);

        res.redirect('/recipes/recipe/:recipes_id');
    }

}

module.exports = recipesController;