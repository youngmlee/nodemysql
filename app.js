const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12345'
});

db.connect((err) => {
  console.log('MySql Connected!');
});

const app = express();

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

app.listen(3000, () => {
  console.log('Now listening on port 3000!');
});
