import { Transaction } from '../../models/transaction.model';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transactions: Transaction[];

  constructor( private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transaction) => {
    this.transactions = transaction;
    //this.transactions.slice(0,10);
    });
  }

  getActualMoney(){
    let actives = 0;
    let pasives = 0;
    this.transactions.forEach(ele => {
      if(ele.type === 'Ingreso'){
        actives += ele.cash;
      }else {
        pasives += ele.cash
      }
    });

    return actives - pasives;
    
  }

}
