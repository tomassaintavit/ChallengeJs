const express = require("express");
const bodyParser = require("body-parser");

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

app.post("/api/transaction", (req,res,next) => {
  const transaction = req.body;
  console.log(transaction);
  return res.status(201).json({message: 'transaction received'});
});

app.get("/api/transaction", (req, res, next) => {
  const transactions = [
    {
      id: "1234",
      name: "Tomas gastos",
      cash: "20000",
      date: "Wed Mar 17 2021 12:16:26 GMT-0300",
      type: "Ingreso",
    },
    {
      id: "4321",
      name: "Peter gastos",
      cash: "25000",
      date: "Wed Mar 17 2021 12:16:26 GMT-0300",
      type: "Egreso",
    },
  ];
  res.status(200).json(transactions);
});

module.exports = app;
