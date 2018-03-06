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

app.listen(3000, () => {
  console.log('Now listening on port 3000!');
});
