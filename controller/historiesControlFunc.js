const historiesModelHandler = require('../model/historiesHandler');

const historiesController = {
    
    async index(req, res) {
        const data = {
            "contents":[
                {
                    "recipes_id":1,
                    "name":"チキンソテー",
                    "date":"7月5日"
                },
                {
                    "recipes_id":2,
                    "name":"鶏肉のトマト煮",
                    "date":"7月4日"
                }
        ]}
        res.render('histories/index', data);
    },

    async history(req, res){
        // \n -> <br>
        const data = {
            "histories_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉<br>ニンニク<br>片栗粉<br>塩コショウ<br>オイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす<br>2. フライパンにオイルとニンニクを入れ加熱する<br>3. 1のもも肉をフライパンに入れ加熱する<br>4. 両面を加熱して出来上がり",
            "date":"7月5日"
        }
        res.render('histories/history', data);
    },

    async addGet(req, res) {
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり",
            "month":7,
            "day":5
        }
        res.render('histories/add', data);
    },
    
    async addPost(req, res) {
        res.redirect('/histories/');
    },
    
    async editGet(req, res) {
        const data = {
            "recipes_id":1,
            "name":"チキンソテー",
            "resorce":"もも肉\nニンニク\n片栗粉\n塩コショウ\nオイル",
            "way":"1. もも肉にした味をつけ片栗粉をまぶす\n2. フライパンにオイルとニンニクを入れ加熱する\n3. 1のもも肉をフライパンに入れ加熱する\n4. 両面を加熱して出来上がり",
            "month":7,
            "day":5
        }
        res.render('histories/edit', data)
    },
    
    async editPost(req, res) {
        
        res.redirect('/histories/');
    }

}

module.exports = historiesController;