var message = 'CSC-317 startup template\n'
         + 'This template uses nodeJS, express, and express.static\n';

var http = require('http');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');
var express = require('express');
var app = express();

var port = 3000;
var username = "student";
var hostname = "localhost";
var password = "student";
var database = "sfmeets";
const bcrypt = require('bcrypt');
const saltRounds = 10;
         
var StaticDirectory = path.join(__dirname, 'public');

app.use(express.static(StaticDirectory));
// Set up a route for the home page


console.log(message);


app.post('/login', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, ffields, files) {
    var con = mysql.createConnection({
      host: hostname,
      user: username,
      password: password,
      database: database
    });

    con.connect(function(err) {
      if (err) throw err;
      var qq = "SELECT * FROM ACCOUNT WHERE email='" + ffields.email + "' AND password='" + ffields.password + "'";
      console.log(qq);
      con.query(qq, function (err, result, fields) {
        if (err) throw err;
        //if result is empty, go back to login page
        if(result.length == 0){
          res.redirect('/login.html');
        }
        else{
          console.log(result);
          res.redirect('/');
        }
      });
    });
  });
});

app.post('/signup', function(req, res) {
  var newAcc = new formidable.IncomingForm();
  console.log('ffields');
  newAcc.parse(req, function (err, ffields, files) {
    var con = mysql.createConnection( {
      host: hostname,
      user: username,
      password: password,
      database: database
    });
    
    con.connect(function(err) {
      if(err) throw err;
      bcrypt.genSalt(saltRounds, function(err, salt){
        console.log(ffields.password.toString());
        bcrypt.hash(ffields.password.toString(), salt, function(err, hash) {
          console.log(hash);
          var acc = "INSERT INTO ACCOUNT (USERNAME, PASSWORD, EMAIL, FIRSTNAME, LASTNAME) VALUES ('User','" + hash + "' ,'" + 
          ffields.email + "' ,'" + ffields.first_name + "','" + ffields.last_name + "')";
          console.log(acc);
          con.query(acc, function(err, result, fields) {
            if(err) throw err;
            console.log("Account Created");
            res.redirect('/');
          })
        })
      })
    })
  })
})
      
app.listen (port, ()=> {
console.log(`Listening on http://localhost:${port}/`);
});
