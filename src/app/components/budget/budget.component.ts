import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {
  transactions: Transaction[];
  constructor(private transactionService: TransactionService, private router: Router) { }

  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(): void {
    this.transactionService.getTransactions().subscribe((transaction) => {
      this.transactions = transaction;
      
    });
  }

   deleteTransaction(id_transaction: number): void {
    let idTransaction = id_transaction.toString();
    this.transactionService.deleteTransaction(idTransaction).subscribe();
    alert("Operación borrada");
    this.getAllTransactions();

  }

  editTransaction(transaction: Number): void{
      const transactionId = transaction;
      this.router.navigateByUrl('/edit-budget/' + transactionId);
    
  }

}
