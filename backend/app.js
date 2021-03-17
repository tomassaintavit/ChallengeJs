const express = require('express');

const app = express();

app.use('/api/transaction',(req,res,next) => {
  const transactions = [
    {
      id:"1234",
      name: 'Tomas gastos',
      cash: '20000',
      date: 'Wed Mar 17 2021 12:16:26 GMT-0300',
      type:'Ingreso'
    },
    {
      id:"4321",
      name: 'Peter gastos',
      cash: '25000',
      date: 'Wed Mar 17 2021 12:16:26 GMT-0300',
      type:'Egreso'
    }
  ]
  res.status(200).json({
    message: 'Trasaction send',
    transactions: transactions
  });
});




module.exports = app;
