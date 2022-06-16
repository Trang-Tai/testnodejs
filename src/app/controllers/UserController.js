const User = require('../models/User');

const userController = {
    // [GET] user/registration
    registration(req, res, next) {
        res.render('user/registration');
    },

    // [POST] user/create
    create(req, res, next) {
        req.body.role = undefined;
        User.create(req.body)
            .then(() => {
                res.render('user/login', { message: 'User created! Please login'});
            })
            .catch(next);
    },

    // [GET] user/login
    login(req, res, next) {
        res.render('user/login');
    },

    // [POST] user/check-login
    checkLogin(req, res, next) {
        User.findOne({ username: req.body.username, password: req.body.password })
            .then((user) => {
                if(req.body.remember) {
                    res.cookie('username', user.username, { maxAge: 360000 });
                } else {
                    res.cookie('username', user.username);
                }
                res.redirect('/');
            })
            .catch(next);
    },

    // [GET] user/logout
    logout(req, res, next) {
        res.clearCookie('username');
        res.render('user/login');
    }
}

module.exports = userController;


















