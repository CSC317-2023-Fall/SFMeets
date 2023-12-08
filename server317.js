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
const saltRounds = 12;
         
var StaticDirectory = path.join(__dirname, 'public');

app.use(express.static(StaticDirectory));
// Set up a route for the home page


console.log(message);

app.get('/getEvents', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = "SELECT * FROM EVENTS";
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getOrgs', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = "SELECT * FROM ORGS";
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getOrgEvents', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `SELECT * FROM ORGEVENTS WHERE ORGID = ${req.query.orgid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getUserEvents', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `SELECT * FROM USEREVENTS WHERE USERID = ${req.query.userid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getUserOrgEvents', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `SELECT * FROM USERORGEVENTS WHERE USERID = ${req.query.userid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getOrgEventUsers', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `SELECT * FROM USERORGEVENTS WHERE EVENTID = ${req.query.eventid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getEventUsers', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `SELECT * FROM USEREVENTS WHERE EVENTID = ${req.query.eventid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/joinUserOrgEvent', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `INSERT INTO USERORGEVENTS (USERID, EVENTID) VALUES (${req.query.userid}, ${req.query.eventid});`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/leaveUserOrgEvent', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `DELETE FROM USERORGEVENTS WHERE USERID = ${req.query.userid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/joinEvent', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `INSERT INTO USEREVENTS (USERID, EVENTID) VALUES (${req.query.userid}, ${req.query.eventid});`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/leaveEvent', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `DELETE FROM USEREVENTS WHERE USERID = ${req.query.userid};`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/createOrganization', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `INSERT INTO ORGS (NAME, DESCRIPTION) VALUES ('${req.query.name}', '${req.query.description}')`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/editOrganization', function (req, res) {
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err) {
    if (err) throw err;
    var qq = `UPDATE ORGS SET NAME = '${req.query.name}', DESCRIPTION = '${req.query.description}' WHERE NAME = '${req.query.previousName}';`;
    con.query(qq, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

app.get('/getInfo', function (req, res){
  var con = mysql.createConnection({
    host: hostname,
    user: username,
    password: password,
    database: database
  });
  con.connect(function(err){
    if(err) throw err;
    var info = "SELECT * FROM ACCOUNT";
    con.query(info, function (err, result, fields){
      console.log(result);
      if(err) throw err;
      res.send(result);
    });
  });
});

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
      console.log(err);
      con.query(qq, function (err, result, fields) {
        if (err) throw err;
        const account = result;
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
          compareit(ffields.password.toString(), result[0].PASSWORD.toString()).then(function(result) {
            if(result){        
                console.log(account);
                var resstr = '<script>setCookie("loggedIn", "true", 14);';
                resstr = resstr + 'setCookie("fname", "' + account[0].FIRSTNAME + '", 14);';
                resstr = resstr + 'setCookie("lname", "' + account[0].LASTNAME + '", 14);';
                resstr = resstr + 'setCookie("idNum", "' + account[0].ID + '", 14);';
                resstr = resstr + 'function setCookie(cname, cvalue, exdays){';
                resstr = resstr + 'const exp = new Date();';
                resstr = resstr + 'exp.setTime(exp.getTime() + (exdays*24*69*60*1000));';
                resstr = resstr + 'let expires = "expires=" + exp.toUTCString();';
                resstr = resstr + 'document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";';
                resstr = resstr + '}';

                resstr = resstr + 'location.replace("/"); </script>';
                res.send(resstr);
              
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
  newAcc.parse(req, function (err, ffields, files) {
    var con = mysql.createConnection( {
      host: hostname,
      user: username,
      password: password,
      database: database
    });
    console.log(ffields.pass_repeat);
    if(ffields.password.toString() != ffields.pass_repeat.toString()){
      var resstr = '<script>setCookie("failedSignup", "true", 1);';

      resstr = resstr + 'function setCookie(cname, cvalue, exdays){';
      resstr = resstr + 'const exp = new Date();';
      resstr = resstr + 'exp.setTime(exp.getTime() + (exdays*24*69*60*1000));';
      resstr = resstr + 'let expires = "expires=" + exp.toUTCString();';
      resstr = resstr + 'document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";';
      resstr = resstr + '}';
      resstr = resstr + 'location.replace("/signup.html"); </script>';
      return res.send(resstr);
    }

    con.connect(function(err) {
      if(err) throw err;
      bcrypt.genSalt(saltRounds, function(err, salt){
        console.log(ffields.password.toString());
        bcrypt.hash(ffields.password.toString(), salt, function(err, hash) {
          console.log(hash);
          var acc = "INSERT INTO ACCOUNT (USERNAME, PASSWORD, EMAIL, FIRSTNAME, LASTNAME) VALUES ('" + ffields.sfsu_id + "','" + hash + "' ,'" + 
          ffields.email + "' ,'" + ffields.first_name + "','" + ffields.last_name + "')";
          console.log(acc);
          con.query(acc, function(err, result, fields) {
            if(err) throw err;
            if(result.length == 0){
              var resstr = '<script>setCookie("failedSignup", "true", 1);';

              resstr = resstr + 'function setCookie(cname, cvalue, exdays){';
              resstr = resstr + 'const exp = new Date();';
              resstr = resstr + 'exp.setTime(exp.getTime() + (exdays*24*69*60*1000));';
              resstr = resstr + 'let expires = "expires=" + exp.toUTCString();';
              resstr = resstr + 'document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";';
              resstr = resstr + '}';

              resstr = resstr + 'location.replace("/signup.html"); </script>';
              return res.send(resstr);
            }else{
              console.log("Account Created");
              res.redirect('/login.html');
            }
            
          });
        });
      });
    });
  });
});

app.post('/updateInfo', function(req, res) {
  var update = new formidable.IncomingForm();
  console.log('ffields');
  update.parse(req, function (err, ffields, files) {
    var con = mysql.createConnection( {
      host: hostname,
      user: username,
      password: password,
      database: database
    });
    
    con.connect(function(err) {
      if(err) throw err;
      var acc = "UPDATE ACCOUNT SET FIRSTNAME = '" + ffields.new_first +
       "', LASTNAME = '" + ffields.new_last + "' WHERE EMAIL ='" + ffields.accEmail + "'";
      console.log(acc);
      con.query(acc, function(err, result, fields) {
        if(err) throw err;
        console.log("Account Updated");
        res.redirect("/account_page.html");
      });
    });
  });
});

async function compareit(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}
      
app.listen (port, ()=> {
console.log(`Listening on http://localhost:${port}/`);
});
