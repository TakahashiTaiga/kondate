const mysql = require("mysql2/promise");
const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";


class dbHandleFunc {
    constructor(){
        this.db_setting = {
            
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            dateStrings: 'date'
        };
        
    } 

    async executeQuery(query, values) {
        let connection;
        let res;
        try {
            connection = await mysql.createConnection(this.db_setting)
            await connection.beginTransaction();
            const [row] = await connection.execute(query, values);
            await connection.commit();
            res = row;
            logger.debug("res:" + res);
        } catch (error) {
            await connection.rollback();
            logger.debug("rollback error:" + error);
        } finally {
            await connection.end();
            logger.debug("closed db");
            return res;
        }
    }
}

module.exports = dbHandleFunc;