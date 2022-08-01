const dbHandleFunc = require('./dbHandleFunc');
const sha3_512 = require('js-sha3').sha3_512;
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

class usersHandler {
    /* 
        クラス概要
            データベースのテーブルであるusersへの操作のメソットをまとめたクラス
        
        クラスメソッド
        findUser
        addUser
        getUser
        editUser

        メモ
        パスワードはデータベースに入れる前にsha3でハッシュを取る
            
    */
    
    /*
        概要
            与えられたmail_addressとpassの組みがusersテーブルにあればそのレコードのusers_idを返す

        呼び出し
            usersControllerFunc.loginPost

        引数
            mail_address, pass

        返り値
            users_id
    */
    async findUser(mail_address, pass) {
        logger.debug('findUser called');
        // パスワードのハッシュを取る
        const pass_hash = sha3_512(pass);
        
        const handle_func = new dbHandleFunc;
        const query = "SELECT users_id from users WHERE mail_address = ? and pass = ?";
        const values = [mail_address, pass_hash];
                
        const [result] = await handle_func.executeQuery(query, values);
        logger.debug(result);
        
        return result;
    }

    /*
        概要
            与えられたmail_addressとpassの組みをusersテーブルに挿入

        呼び出し
            usersControllerFunc.addPost

        引数
            mail_address, pass

        返り値
            users_id
    */
    async addUser(mail_address, pass) {
        logger.debug('addUser called');
        // パスワードのハッシュを取る
        const pass_hash = sha3_512(pass);

        const handle_func = new dbHandleFunc;
        const query = "INSERT INTO users (mail_address, pass) VALUES (?, ?)";
        const values = [mail_address, pass_hash];
                        
        const result = await handle_func.executeQuery(query, values);
        logger.debug(result);
        return result;
    }

    /*
        概要
            与えられたusers_idに該当するレコードのmail_address, recipe_intervalをusersテーブルから引っ張ってくる

        呼び出し
            usersControllerFunc.account
            usersControllerFunc.editGet

        引数
            users_id

        返り値
            mail_address, recipe_interval
    */
    async getUser(users_id) {
        logger.debug('getUser called');
        const handle_func = new dbHandleFunc;
        const query = "SELECT mail_address, recipe_interval FROM users WHERE users_id = ?";
        const values = [users_id];
                                
        const [result] = await handle_func.executeQuery(query, values);
        logger.debug(result);     
        return result;
    }

    /*
        概要
            与えられたusers_idに該当するレコードのmail_address, pass, recipe_intervalを更新する

        呼び出し
            usersControllerFunc.editPost

        引数
            users_id, mail_address, pass, recipe_interval

        返り値
            なし
    */
    async editUser(users_id, mail_address, pass, recipe_interval) {
        logger.debug('editUser called');
        let query = "";
        let values = [];
        
        if(pass==null){
            query = "UPDATE users SET mail_address = ?, recipe_interval = ? WHERE users_id = ?";
            values = [mail_address, recipe_interval, users_id];
        } else {
            const hash_pass = sha3_512(pass);
            query = "UPDATE users SET mail_address = ?, pass = ?, recipe_interval = ? WHERE users_id = ?";
            values = [mail_address, hash_pass, recipe_interval, users_id];
        }

        const handle_func = new dbHandleFunc;
                                        
        const result = await handle_func.executeQuery(query, values);
        logger.debug(result);                        
        return ;
    }
}

module.exports = usersHandler;