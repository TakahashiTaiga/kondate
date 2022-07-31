const historiesModelHandler = require('../model/historiesHandler');
const recipesModelHandler = require('../model/recipesHandler');

const historiesController = {
    
    // /histories/
    async index(req, res) {
        // ログインチェック

        // sessionからusers_idをもってくる
        const users_id = "0";

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getAll(users_id);

        // 日にち処理

        const data = {
            "contents":result
        }
        /*
        const data = {
            "contents":[
                {
                    "histories_id":1,
                    "name":"チキンソテー",
                    "date":"7月5日"
                },
                {
                    "recipes_id":2,
                    "name":"鶏肉のトマト煮",
                    "date":"7月4日"
                }
        ]}
        */
        res.render('histories/index', data);
    },

    // /histories/history/:hitories_id
    async history(req, res){
        // ログインチェック

        // URLからhistories_idをもってくる
        const histories_id = "0";

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getHistories(histories_id);

        // \n -> <br>の処理

        const data = result;
        /*
        const data = {
            "histories_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす<br>2. フライパンにオイルとニンニクを入れ加熱する<br>3. 1のもも肉をフライパンに入れ加熱する<br>4. 両面を加熱して出来上がり",
            "date":"7月5日"
        }
        */
        res.render('histories/history', data);
    },

    // /histories/add/:recipes_id
    async addGet(req, res) {
        // ログインチェック

        // URLからhistories_idをもってくる
        const recipes_id = "0";

        const recipes_db = new recipesModelHandler;
        const result = await recipes_db.getRecipe(recipes_id);

        // \n -> <br>の処理

        const data = result;

        /*
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり",
            "month":7,
            "day":5
        }
        */
        res.render('histories/add', data);
    },
    
    // /histories/add
    async addPost(req, res) {
        // ログインチェック

        // sessionからusers_idをもってくる
        const users_id = "0";

        // URLからrecipes_idをもってくる
        const recipes_id = "0";

        // 入力データをもってくる
        const name =  "チキンソテー";
        const resorce = "もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル";
        const way = "1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり";
        
        // 日にち処理
        const date = "7月5日";

        const histories_db = new historiesModelHandler;
        const result = await histories_db.addHistories(users_id, recipes_id, name, resorce, way, date);


        res.redirect('/histories/');
    },
    
    // /histories/edit/:histories_id
    async editGet(req, res) {
        // ログインチェック

        // URLからhistories_idをもってくる
        const histories_id = "0";

        const histories_db = new historiesModelHandler;
        const result = await histories_db.getHistories(histories_id);

        // \n -> <br>の処理

        const data = result;
        /*
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり",
            "month":7,
            "day":5
        }
        */
        res.render('histories/edit', data)
    },
    
    // /histories/edit/
    async editPost(req, res) {
        // ログインチェック
        
        // URLからhistories_idをもってくる
        const histories_id = "0";

        // 入力データをもってくる
        const name =  "チキンソテー";
        const resorce = "もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル";
        const way = "1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり";
        
        // 日にち処理
        const date = "7月5日";

        const histories_db = new historiesModelHandler;
        const result = await histories_db.editHistories(histories_id, name, resorce, way, date);

        res.redirect('/histories/');
    }
}

module.exports = historiesController;