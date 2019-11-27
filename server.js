var express = require('express');
var app = express();
var moment = require('moment');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var urlencoderParser = bodyParser.urlencoded({ extended: false });

//-----------------------------------------

//Init

//-----------------------------------------
app.use(express.static('views'));
app.use(express.static('css'));

app.set('view engine', 'ejs');
app.use(
  session({
    name: 'sid',
    secret: '124343',
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.json());

console.log("Connexted i guess")

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '19992004snehil',
  insecureAuth: true,
  database: 'easylance'
});
const redirectLogin = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/login');
  } else next();
};
//----------------------------------------------

//Render routes

// ---------------------------------------------
app.get('/login', function(req, res) {
  res.render('Login.ejs', { state: 'hidden' });
});
app.get('/sellerSignup', function(req, res) {
  res.render('SellerSignup.ejs');
});
app.get('/buyerSignup', function(req, res) {
  res.render('BuyerSignup.ejs');
});
app.get('/', function(req,res){
  res.render('homepage.ejs')
});
app.get('/LandingPage', function(req,res){
  res.render('LandingPage.ejs');
});
app.get('/homepage', function(req,res){
  res.render('homepage.ejs');
});

app.get('/shome', redirectLogin, function(req, res) {
  if (req.session.cat == 'S')
    con.query(
      'SELECT * FROM joblisting WHERE username = ?',
      [req.session.username],
      function(err, result, fields) {
        res.render('Company View.ejs', { jobs: result });
      }
    );
  else res.redirect('/sellerSignup');
});

app.get('/bhome', redirectLogin, function(req, res) {
  if (req.session.cat == 'B')
    con.query('SELECT * FROM joblisting', function(err, result, fields) {
      res.render('BuyerView.ejs', { jobs: result });
    });
  else res.redirect('/login');
});
app.get('/addjob', redirectLogin, function(req, res) {
  if (req.session.cat == 'S') res.render('AddJob.ejs');
  else res.redirect('/login');
});
app.get('/logout', function(req,res){
  req.session.username=undefined
  req.session.cat=undefined
  req.session.password =undefined
  res.redirect('/login');
});
//----------------------------------------------

//Post Request

//----------------------------------------------

//Login
app.post("/O'auth", urlencoderParser, function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  con.query(
    'SELECT * FROM login WHERE username = ? AND password = ?;',
    [username, password],
    function(err, result, fields) {
      console.log(result);
      if (result.length > 0) {
        var cat = result[0].category;
        req.session.loggedin = true;
        req.session.username = username;
        req.session.cat = cat;
        if (cat == 'S') res.redirect('/shome');
        if (cat == 'B') res.redirect('/bhome');
      } else {
        res.render('login.ejs', { state: 'text' });
      }
    }
  );
});

//Buyer Signup
app.post('/newBSignup', urlencoderParser, function(req, res) {
  var name = req.body.name;
  var username = req.body.username;
  var date = req.body.date;
  var password = req.body.password;
  var lang = req.body.lang;
  var city = req.body.city;
  var exp = req.body.exp;
  var qual = req.body.qual;
  var jtype = req.body.jtype;
  var phno = req.body.phno;
  con.query(
    'INSERT INTO login VALUES (?, ?, ?)',
    [username, password, 'B'],
    function(err, result) {
      if (err) throw err;
      else {
        console.log('User registered');
      }
    }
  );
  con.query(
    'INSERT INTO buyerinfo VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [username, name, date, lang, city, exp, qual, jtype, phno],
    function(err, result) {
      if (err) throw err;
      else {
        console.log('Record inserted');
        res.redirect('/login');
      }
    }
  );
});

//Seller Signup
app.post('/newSSignup', urlencoderParser, function(req, res) {
  var name = req.body.name;
  var comp = req.body.cname;
  var username = req.body.username;
  var password = req.body.password;
  var city = req.body.city;
  var phno = req.body.phno;

  con.query(
    'INSERT INTO login VALUES (?, ?, ?)',
    [username, password, 'S'],
    function(err, result) {
      if (err) throw err;
      else {
        console.log('User registered');
      }
    }
  );

  con.query(
    'INSERT INTO ssign VALUES (?, ?, ?, ?, ?)',
    [username, name, comp, city, phno],
    function(err, result) {
      if (err) throw err;
      else {
        console.log('Record inserted');
        res.redirect('/loginrs');
      }
    }
  );
});

//Seller info ===> Add Button ===> Seller info
app.post('/addjob', redirectLogin, urlencoderParser, function(req, res) {
  console.log(
    'User:' + req.session.username + ' has request Add Page' + req.session.cat
  );
  if (req.session.cat == 'S')
  var id ='1'
  var title = req.body.title;
  var username = req.session.username;
  var des = req.body.des;
  var exp = req.body.exp;
  var qual = req.body.qual;
  var jtype = req.body.jtype;
  console.log('----------------------->' + req.session.username);
    con.query('SELECT NOW() as ids;',function(err,result){
      console.log(result)
      if(err)  throw err;
      else{
        id =result[0].ids
        console.log(id)
        
        con.query(
          'INSERT INTO joblisting(username, title, des, exp, qual, jtype) VALUES (?, ?, ?, ?, ?, ?)',
          [ username, title, des, exp, qual, jtype],
          function(err, result) {
            if (err) throw err;
            else {
              console.log('Add Job');
              res.redirect('/shome');
            }
          }
        );
      }
    });
    console.log('------>?Adding Job')
 
});

//Seller info ==> delete ==> Seller info
app.post('/deletepost', urlencoderParser, function(req, res) {
  var postid = req.body.id;
  console.log(postid);
  con.query('DELETE FROM joblisting WHERE id = ?;', [postid], function(
    err,
    result
  ) {
    if (err) throw err;
    else {
      console.log('Deleted Job');
      res.redirect('/shome');
    }
  });
});
//------------------------------------------------

//Server config

//------------------------------------------------
var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().address;

  console.log('Example app listening at http://%s:%s', host, port);
});
