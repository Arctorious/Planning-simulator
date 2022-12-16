var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

//session
var session = require('express-session');

//mysql
var mysql = require('mysql');

//the code below is from Pulsara Sandeepa
//title: Google OAuth2.0 Authentication — using Node JS and PassportJS
//available at:
//https://medium.com/nerd-for-tech/google-oauth2-0-authentication-using-node-js-and-passportjs-1a77f42b1111
//require passport and cookie session
//the comments are added by myself.
const passport = require('passport');
const cookieSession = require('cookie-session');

//google setting up oauth2 with passport
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//add serializer and deserializer for the passport
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"878424167618-5asqg34nvf1f4i0oo1adirbfcp28rht7.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"https://arctorious-code50-64836056-r4g6v47rjc5jv-8080.githubpreview.dev/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var app = express();

app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));

//session
app.use(session({
    secret: 'something',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

//mysql
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'project'
});

app.use(function(req, res, next){
    req.pool = dbConnectionPool;
    next();
});

//initialises passport
app.use(passport.initialize());
//turning session id into a user object
app.use(passport.session());

app.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login.html?fail=1',
    }),
    function (req, res) {
        if('user' in req){
        req.pool.getConnection(function(err, connection){
            if(err){
              res.sendStatus(500);
              return;
            }
            var email = req.user.email;
            var query1 = "SELECT email FROM userData WHERE email = ?";
            connection.query(query1, [email], function(err, rows, fields){
                connection.release();
              if(err){
                res.sendStatus(500);
                return;
              }
              if(JSON.stringify(rows) == "[]"){
                res.redirect('/g_reg');
              }
              else{
                res.redirect('/g_login');
              }
            });
        });
    }
    else{
        res.sendStatus(403);
    }
});

app.get('/g_reg', (req, res) => {
    req.pool.getConnection(function(err, connection){
        if(err){
          res.sendStatus(500);
          return;
        }
    var f_name = req.user.given_name;
    var l_name = req.user.family_name;
    var email = req.user.email;
    var query2 = "INSERT INTO userData (firstname, lastname, email, emailNotifi, password) VALUES (?, ?, ?, ?, ?)";
    connection.query(query2, [f_name, l_name, email, 0, null], function(err, result){
        connection.release();
      if(err){
        res.sendStatus(500);
        return;
      }
      res.redirect('/g_login');
    });
    });
});

app.get('/g_login', (req, res) => {
    req.pool.getConnection(function(err, connection){
        if(err){
          res.sendStatus(500);
          return;
        }
    var email = req.user.email;
    var query4 = "SELECT * FROM userData WHERE email = ?";
    connection.query(query4, [email], function(err, rows, fields){
        connection.release();
        if(err){
            res.sendStatus(500);
            return;
        }
        req.session.logged = true;
        req.session.Uid = rows[0].UserId;
        req.session.MailNot = rows[0].emailNotifi;
        req.session.email = rows[0].email;
        res.redirect('/calendar.html');
    });
    });
});

app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

app.use('/admin/access/*', function(req, res, next){
    if(!('a_logged' in req.session)){
        res.sendStatus(403);
        return;
    }
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
module.exports = app;
