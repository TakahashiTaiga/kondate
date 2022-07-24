const usersModelHandler = require('../model/userHandler');

const usersController = {
    
    async loginGet(req, res) {

        res.render('users/login');
    },

    async loginPost(req, res) {
        res.redirect('/recipes/today');
    },
    
    async addGet(req, res) {
        res.render('users/add');
    },
    
    async addPost(req, res) {
        res.redirect('/users/login');
    },

    async account(req, res) {
        const data = {
            "mail_address":"test@test.test",
            "recipe_num":"2件",
            "distance":"5日"
        }
        res.render('users/account', data);
    },

    async editGet(req, res) {
        const data = {
            "mail_address":"test@test.test",
            "recipe_num":"2件",
            "distance":"5日"
        }
        res.render('users/edit', data);
    },

    async editPost(req, res) {
        res.redirect('/users/account');
    }

}

module.exports = usersController;