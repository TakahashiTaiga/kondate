const recipesModelHandler = require('../model/recipesHandler');

const recipesController = {
    
    async today(req, res) {
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
        res.render('recipes/today', data);
    },

    async all(req, res) {
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
        res.render('recipes/all', data);
    },
    
    async recipe(req, res) {

        // \n -> <br>
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす<br>2. フライパンにオイルとニンニクを入れ加熱する<br>3. 1のもも肉をフライパンに入れ加熱する<br>4. 両面を加熱して出来上がり"
        }
        res.render('recipes/recipe', data);
    },
    
    async addGet(req, res) {
        res.render('recipes/add');
    },
    
    async addPost(req, res) {
        res.redirect('/recipes/all');
    },

    async editGet(req, res) {

        // <br> -> \n
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり"
        }
        res.render('recipes/edit', data);
    },

    async editPost(req, res) {
        res.redirect('/recipes/recipe/:recipes_id');
    }

}

module.exports = recipesController;