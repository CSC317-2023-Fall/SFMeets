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


app.post('/verifylogin', function (req, res) {
  var form = new formidable.IncomingForm();
  console.log('ffields');
  form.parse(req, function (err, ffields, files) {
    
    var con = mysql.createConnection({
      host: hostname,
      user: username,
      password: password,
      database: database
      });

    con.connect(function(err) {
      if (err) throw err;
      var qq = "SELECT * FROM ACCOUNT WHERE email='" + ffields.email + "'";
      console.log(qq);
      con.query(qq, function (err, result, fields) {
        if (err) throw err;
        const account = result;
          compareit(ffields.password.toString(), result[0].PASSWORD.toString()).then(function(result) {
            if(result){
              //if result is empty, go back to login page
              if(result.length == 0){
                
                var resstr = '<script>setCookie("failedLogin", "true", 1);';

                resstr = resstr + 'function setCookie(cname, cvalue, exdays){';
                resstr = resstr + 'const exp = new Date();';
                resstr = resstr + 'exp.setTime(exp.getTime() + (exdays*24*69*60*1000));';
                resstr = resstr + 'let expires = "expires=" + exp.toUTCString();';
                resstr = resstr + 'document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";';
                resstr = resstr + '}';

                resstr = resstr + 'location.replace("/login.html"); </script>';
                return res.send(resstr);
              }
              else{
                console.log(account);
                var resstr = '<script>setCookie("loggedIn", "true", 14);';
                resstr = resstr + 'setCookie("fname", "' + account[0].FIRSTNAME + '", 14);';
                resstr = resstr + 'setCookie("lname", "' + account[0].LASTNAME + '", 14);';
                resstr = resstr + 'function setCookie(cname, cvalue, exdays){';
                resstr = resstr + 'const exp = new Date();';
                resstr = resstr + 'exp.setTime(exp.getTime() + (exdays*24*69*60*1000));';
                resstr = resstr + 'let expires = "expires=" + exp.toUTCString();';
                resstr = resstr + 'document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";';
                resstr = resstr + '}';

                resstr = resstr + 'location.replace("/"); </script>';
                res.send(resstr);
              }
            }
            else{
              var resstr = '<script>setCookie("failedLogin", "true", 1);';

                resstr = resstr + 'function setCookie(cname, cvalue, exdays){';
                resstr = resstr + 'const exp = new Date();';
                resstr = resstr + 'exp.setTime(exp.getTime() + (exdays*24*69*60*1000));';
                resstr = resstr + 'let expires = "expires=" + exp.toUTCString();';
                resstr = resstr + 'document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";';
                resstr = resstr + '}';

                resstr = resstr + 'location.replace("/login.html"); </script>';
                return res.send(resstr);
            }
        });
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

async function compareit(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}
      
app.listen (port, ()=> {
console.log(`Listening on http://localhost:${port}/`);
});
