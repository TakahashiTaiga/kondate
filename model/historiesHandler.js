const dbHandleFunc = require('./dbHandleFunc');
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class historiesHandler {
    /* 
        クラス概要
            データベースのテーブルであるrecipesへの操作のメソッドをまとめたクラス
        
        クラスメソッド
            getAll    
            getHistories
            addHistories
            editHistories

    */
    
    /*
        概要
            与えられたusers_idに該当する全てのレコードのhistories_id, name, dateを返す
        
        呼び出し
            historiesControllerFunc.index
        
        引数
            users_id
        
        返り値
            [{"recipes_id":recipes_id, "name":name}, ...]
    */
    async getAll(users_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT histories_id, name, date from histories where users_id = ?";
        const values = [users_id];
                
        const result = await handle_func.executeQuery(query, values);
        
        return result;
    }
        
    /*
        概要
            与えられたhistories_idに該当するレコードを返す
        
        呼び出し
            historiesControllerFunc.history
            historiesControllerFunc.editGet
        
        引数
            histories_id
        
        返り値
            {"histories_id":histories_id, "name":name, "ingredient":ingredient, "way":way, "date":date}
    */
    async getHistories(histories_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT histories_id, name, ingredient, way, date from histories where histories_id = ?";
        const values = [histories_id];
                        
        const [result] = await handle_func.executeQuery(query, values);
            
        logger.debug(result);

        return result;
    }
        
    /*
        概要
            与えられた入力データで新しいレコードをhistoriesに挿入する
        
        呼び出し
            historiesControllerFunc.addPost
        
        引数
            users_id, recipes_id, name, ingredient, way, date
        
        返り値
            なし
    */
    async addHistories(users_id, recipes_id, name, ingredient, way, date) {
        const handle_func = new dbHandleFunc;
        const query = "INSERT INTO histories (users_id, recipes_id, name, ingredient, way, date) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [users_id, recipes_id, name, ingredient, way, date];
                                
        const result = await handle_func.executeQuery(query, values);
                    
        return ;
    }
        
    /*
        概要
            対象のレコードのデータを与えられた入力データに更新する
        
        呼び出し
            historiesControllerFunc.editPost
        
        引数
            histories_id, name, ingredient, way, date
        
        返り値
            なし
    */
    async editHistories(histories_id, name, ingredient, way, date) {
        const handle_func = new dbHandleFunc;
        const query = "UPDATE histories SET name = ?, ingredient = ?, way = ?, date = ? WHERE histories_id = ?";
        const values = [name, ingredient, way, date, histories_id];
                                        
        const result = await handle_func.executeQuery(query, values);
                            
        return ;
    }
        
}

module.exports = historiesHandler;