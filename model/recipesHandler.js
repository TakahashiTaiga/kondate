const dbHandleFunc = require('./dbHandleFunc');
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

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
            与えられたusers_idに該当するレコードのうちdateよりも前の日付のレコードのrecepes_id, name, ingredientをランダムに並べ替えて返す

        呼び出し
            recipesControllerFunc.today

        引数
            users_id, date

        返り値
            [{"recipes_id":recipes_id, "name":name, "ingredient":ingredient}, ...]
    */
    async getForToday(users_id, date) {
        const handle_func = new dbHandleFunc;
        const query = "select recipes_id, name, ingredient from recipes where users_id = ? and recipes_id not in (select recipes_id from histories where users_id = ? and date > ?) order by rand()";
        const values = [users_id, users_id, date];
        
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
            historiesControllerFunc.getRecipe

        引数
            recipes_id

        返り値
            {"recipes_id":recipes_id, "name":name, "ingredient":ingredient, "way":way}
    */
    async getRecipe(recipes_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT recipes_id, name, ingredient, way from recipes where recipes_id = ?";
        const values = [recipes_id];
                
        const [result] = await handle_func.executeQuery(query, values);
    
        return result;
    }

    /*
        概要
            与えられた入力データで新しいレコードをrecipesに挿入する

        呼び出し
            recipesControllerFunc.addPost

        引数
            users_id, name, ingredient, way

        返り値
            なし
    */
    async addRecipe(users_id, name, ingredient, way) {
        const handle_func = new dbHandleFunc;
        const query = "INSERT INTO recipes (users_id, name, ingredient, way) VALUES (?, ?, ?, ?)";
        const values = [users_id, name, ingredient, way];
                        
        const result = await handle_func.executeQuery(query, values);
            
        return ;
    }

    /*
        概要
            対象のレコードのデータを与えられた入力データに更新する

        呼び出し
            recipesControllerFunc.editPost

        引数
            users_id, name, ingredient, way

        返り値
            なし
    */
    async editRecipe(recipes_id, name, ingredient, way) {
        const handle_func = new dbHandleFunc;
        const query = "UPDATE recipes SET name = ?, ingredient = ?, way = ? WHERE recipes_id = ?";
        const values = [name, ingredient, way, recipes_id];
                                
        const result = await handle_func.executeQuery(query, values);
                    
        return ;
    }

    /*
        概要
            与えらたusers_idが持っているレシピの総数を返す

        呼び出し
            usersControllerFunc.account

        引数
            users_id

        返り値
            num_recipes
    */
    async countRecipes(users_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT COUNT(recipes_id) FROM recipes WHERE users_id = ?";
        const values = [users_id];
                                        
        const [result] = await handle_func.executeQuery(query, values);

        return result['COUNT(recipes_id)'];
    }

    /*
        概要
            与えらたrecipes_idのレシピを削除する

        呼び出し
            usersControllerFunc.deleteGet

        引数
            recipes_id

        返り値
    */
   /*
    async deleteRecipe(recipes_id) {
        const handle_func = new dbHandleFunc;
        const query = "DELETE FROM recipes WHERE recipes_id = ?";
        const values = [recipes_id];
                                                
        const result = await handle_func.executeQuery(query, values);
        
        return
    }
    */
}

module.exports = recipesHandler;