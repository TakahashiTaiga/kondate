const passport = require("passport");
const LocalStrategy = require("passport-local");
const cookieSession = require("cookie-session");
const usersModelHandler = require('./model/usersHandler');
const session = require('express-session'); // 追記


module.exports = function (app) {
    app.use(session({ resave:false,saveUninitialized:false, secret: 'passport test' })); // 追記

    app.use(passport.initialize());
    
    app.use(passport.session());

    var LocalStrategy = require('passport-local').Strategy;
    
    passport.use(new LocalStrategy({
      usernameField: 'mail_address',
      passwordField: 'pass',
      passReqToCallback: true,
      session: false,
    }, async function (req, mail_address, pass, done) {
      process.nextTick(async function () {
        // users_idを引っ張ってくる
        const users_db = new usersModelHandler;
        const result = await users_db.findUser(mail_address, pass);

        if (result.user_id!=null) {
          return done(null, result.user_id)
        } else {
          return done(null, false)
        }
      })
    }));
    
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
};