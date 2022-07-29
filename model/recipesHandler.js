const dbHandleFunc = require('./dbHandleFunc');

class recipesHandler {
    /* 
        クラス概要
            データベースのテーブルであるrecipesへの操作のメソッドをまとめたクラス
        
        クラスメソッド
            getForToday
            getAll
            getRecipe
            addRecipe
            editRecipe
    */
    
    /*
        メモ
            ・userの持ってるレシピの一覧を持ってくる
            ・リストをランダムに、履歴分を排除の機能をつける
        
        概要
            与えられたusers_idに該当する全てのレコードのrecepes_id, name, resorceを返す

        呼び出し
            recipesControllerFunc.today

        引数
            users_id

        返り値
            [{"recipes_id":recipes_id, "name":name, "resorce":resorce}, ...]
    */
    async getForToday(users_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT recipes_id, name, resorce from recipes where users_id = ?";
        const values = [users_id];
        
        const result = await handle_func.executeQuery(query, values);

        return result;
    }

    /*
        概要
            与えられたusers_idに該当する全てのレコードのrecepes_id, nameを返す

        呼び出し
            recipesControllerFunc.all

        引数
            users_id

        返り値
            [{"recipes_id":recipes_id, "name":name}, ...]
    */
    async getAll(users_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT recipes_id, name from recipes where users_id = ?";
        const values = [users_id];
        
        const result = await handle_func.executeQuery(query, values);

        return result;
    }

    /*
        概要
            与えられたrecipes_idに該当するレコードを返す

        呼び出し
            recipesControllerFunc.recipe
            recipesControllerFunc.edit

        引数
            recipes_id

        返り値
            {"recipes_id":recipes, "name":name, "resorce":resorce, "way":way}
    */
    async getRecipe(recipes_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT recipes_id, name, resorce, way from recipes where recipes_id = ?";
        const values = [recipes_id];
                
        const result = await handle_func.executeQuery(query, values);
    
        return result;
    }

    /*
        概要
            与えられた入力データで新しいレコードをrecipesに挿入する

        呼び出し
            recipesControllerFunc.addPost

        引数
            users_id, name, resorce, way

        返り値
            なし
    */
    async addRecipe(users_id, name, resorce, way) {
        const handle_func = new dbHandleFunc;
        const query = "INSERT INTO recipes (users_id, name, resorce, way) VALUES (?, ?, ?, ?)";
        const values = [users_id, name, resorce, way];
                        
        const result = await handle_func.executeQuery(query, values);
            
        return ;
    }

    /*
        概要
            対象のレコードのデータを与えられた入力データに更新する

        呼び出し
            recipesControllerFunc.editPost

        引数
            users_id, name, resorce, way

        返り値
            なし
    */
    async editRecipe(recipes_id, name, resorce, way) {
        const handle_func = new dbHandleFunc;
        const query = "UPDATE recipes SET name = ?, resorce = ?, way = ? WHERE recipes_id = ?";
        const values = [name, resorce, way, recipes_id];
                                
        const result = await handle_func.executeQuery(query, values);
                    
        return ;
    }
}

module.exports = recipesHandler;