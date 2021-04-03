var mysql = require('mysql');
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var path = require('path');
const { response } = require('express');

var connection= mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'interface'
})

var app=module.exports = express()
app.use(session({
    secret:'PatatOmilia',
    resave:true,
    saveUninitialized:true
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/public/views/home.html'))
})

app.post('/login', function(request, response){
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true
                request.session.username = username
                response.redirect('/connected')
            } else {
                response.send('incorrect username and/or password')
            }
            response.end()
        })

    } else {
        response.send('Please enter your username and your password')
        response.end()
    }
})

app.get('/connected', function(request, response) {
    if(request.session.loggedin) {response.
        response.sendFile(path.join(__dirname + `/public/views/connected.html`))
    } else {
        response.send('Please consider login to use this page !')
    }
    response.end()
})

app.listen(3000)