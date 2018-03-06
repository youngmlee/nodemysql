const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345',
  database : 'nodemysql'
});

db.connect((err) => {
  console.log('MySql Connected!');
});

const app = express();

//Create database//
app.get('/createdb', (req, res) => {
  var sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) {
      console.log('There was an error.')
    }
    console.log(result);
    res.send('Database has been created');
  });
});

//Create table//
app.get('/createpoststable', (req, res) => {
  var sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    console.log(result);
    res.send('Posts table created!')
  });
});

//Insert post 1//
app.get('/addpost1', (req, res) => {
  var post = {title:'Post number one', body:'The body of post one'};
  var sql = 'INSERT INTO posts SET ?';
  var query = db.query(sql, post, (err, result) => {
    console.log(result);
    res.send('Post one added!');
  });
});

//Insert post 2//
app.get('/addpost2', (req, res) => {
  var post = {title:'Post number two', body:'The body of post two'};
  var sql = 'INSERT INTO posts SET ?';
  var query = db.query(sql, post, (err, result) => {
    console.log(result);
    res.send('Post two added!');
  });
});

//Select posts//
app.get('/getposts', (req, res) => {
  var sql = 'SELECT * FROM posts';
  var query = db.query(sql, (err, result) => {
    console.log(result);
    res.send('Posts fetched!');
  });
});

//Select single post//
app.get('/getpost/:id', (req, res) => {
  var sql = 'SELECT * FROM posts WHERE id = ${req.params.id}';
  var query = db.query(sql, (err, result) => {
    console.log(result);
    res.send('Post fetched!');
  });
});

//Update post//
app.get('/updatepost/:id', (req, res) => {
  var newTitle = 'Updated Title';
  var sql = 'UPDATE posts SET title = ${newTitle} WHERE id = ${req.params.id}';
  var query = db.query(sql, (err, result) => {
  console.log(result);
  res.send('Post updated!');
  });
});

//Delete post//
app.get('/deletepost/:id', (req, res) => {
  var sql = 'DELETE FROM posts WHERE id = ${req.params.id}';
  var query = db.query(sql, (err, result) => {
  console.log(result);
  res.send('Post deleted!');
  });
});

app.listen(3000, () => {
  console.log('Now listening on port 3000!');
});
