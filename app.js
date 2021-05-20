//importing everything we need in the project
var mysql = require('mysql');
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path');
let {PythonShell} =require('python-shell');
var http = require('http').createServer(app);
//creating a connection to the database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Q>ZmA1vDMf!4Tm#dz3(',
    database: 'interface'
})
//creatin a session using express-session and bodyparser
var app = module.exports = express()
app.use(session({
    secret: 'PatatOmilia',
    resave: true,
    saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
//setting up the main route
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/public/views/home.html'))

})
//first command coming from the form of login, is use to log in the web app
app.post('/login', function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query(`SELECT username, password FROM accounts WHERE username = ? AND password = ?`, [username, password], function (error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true
                request.session.username = username
                response.redirect('/connected')
            } else {
                response.redirect('/views/error_login.html')
            }
            response.end()
        })

    } else {
        response.send('Please enter your username and your password')
        response.end()
    }
})

//when connected, redirect to the good views
app.get('/connected', function (request, response) {
    if (request.session.loggedin) {
        response.redirect('/views/connected.html')
    } else {
        response.send('Please consider login to use this page !')
    }
    response.end()
})

//creating a new user, second form present in the "account_creation.html"
app.post('/create', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    if (username && password && email) {
        var sql = "INSERT INTO accounts (username, password, email) VALUES ?";
        var values = [[`${username}`, `${password}`, `${email}`]];
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        req.session.loggedin = true
        req.session.username = username
        res.redirect('/connected');
    }
})
//takes the value of the form in support and send them in the python script
app.post('/support', function (req, res) {
    var options = {
        args:
        [
            req.body.username,
            req.body.email,
            req.body.reason,
            req.body.description
        ]
    }
    
    PythonShell.run('public/python/support_handler.py', options, function (err) {
        if (err) res.send(err);
        console.log("database updated")
      });
    
    //send a new view to the user
    res.redirect("/views/res_support.html")
})

app.listen(3000)
