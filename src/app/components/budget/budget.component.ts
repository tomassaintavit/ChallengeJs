import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  transactions: Transaction[];
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((transaction) => {
      this.transactions = transaction;
    });
  }

}
