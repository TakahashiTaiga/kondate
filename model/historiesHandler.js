const dbHandleFunc = require('./dbHandleFunc');

class historiesHandler {
    async getHistoriesAll(users_id) {
        const handle_func = new dbHandleFunc;
        const query = "SELECT * FROM histories WHERE users_id = ?";
        const values = [users_id];
        
        const res = await handle_func.executeQuery(query, values);

        return res;
    }
}

module.exports = historiesHandler;