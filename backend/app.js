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

app.post("/update/transaction", async (req, res, next) => {
  const data = await req.body;
  const transaction = data.transaction;
  console.log(transaction);

  connection.query(`UPDATE transaction SET name='${transaction.name}', cash=${transaction.cash},date='${transaction.date}', type='${transaction.type}' WHERE transactionId=${transaction.id}`, (err, result) => {
    if (err) {
      res.status(500).send({message: 'Cannot update transaction to database'});
      throw err;
    } else {
      console.log('One row added');
      return res.status(201).json({ message: 'transaction updated' });
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

app.get("/transaction/:idTransaction", async (req, res, next) => {

  const idTransaction = req.params.idTransaction;

  await connection.query(`SELECT * FROM transaction WHERE transactionId = ${idTransaction}`, (err, result, fields) => {
    if (err) {
      res.status(500).send({ message: 'Internal server ERROR' });
      throw err;

    } else {
      console.log(result);
      res.status(200).json(result);

    }
  });

});

app.delete("/api/delete/transaction/:idTransaction", (req, res, next) => {
  const transaction_id = req.params.idTransaction;
  
  try{
    connection.query(`DELETE FROM transaction WHERE transactionId = ${transaction_id}` , (err, result, fields) => {
        if(err){
          res.status(500).send({message: 'Error while deleting transaction'});
          throw err;
        }else{
          return res.status(200).send({message:'Transaction deleted!'});
        }
    });

  }catch(error) {
    console.log(error);
  }

});

//connection.end();

module.exports = app;
