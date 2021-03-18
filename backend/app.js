const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");


let connection = mysql.createConnection({
  host: 'localhost',
  database: 'challenge',
  port: '3306',
  user: 'root',
  password: 'root'
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connection to Data Base!');
  }
});




const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/transaction", async (req, res, next) => {
  const data = await req.body;
  const transaction = data.transaction;

  connection.query(`INSERT INTO transaction(name, cash, date, type) VALUES ('${transaction.name}', ${transaction.cash}, '${transaction.date}', '${transaction.type}')`, (err, result) => {
    if (err) {
      res.status(500).send({message: 'Cannot insert transaction to database'});
      throw err;
    } else {
      console.log('One row added');
      return res.status(201).json({ message: 'transaction received' });
    }
  });

});

app.get("/api/transaction", async (req, res, next) => {

  const transactions = [];

  await connection.query('SELECT * FROM transaction', (err, result, fields) => {
    if (err) {
      res.status(500).send({ message: 'Internal server ERROR' });
      throw err;

    } else {
      if (result != null) {
        result.forEach(transaction => {
          transactions.push(transaction);
        });
        res.status(200).json(transactions);
      } else {
        res.status(404).send();
      }

    }
  });

});

//connection.end();

module.exports = app;
