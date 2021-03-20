import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction} from './../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';


@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {

  typeTransaction: string;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.typeTransaction = "Tipo";
  }

  selectType(name: string){
    this.typeTransaction = name;
  }

  onAddTransaction(form: NgForm): Transaction{
    if(form.invalid){
      return;
    }
    const transaction: Transaction = {
         id: null,
        name: form.value.name,
        cash: form.value.cash,
        date: form.value.date,
        type: form.value.select
    };
    
    this.transactionService.postTransaction(transaction).subscribe();
    form.resetForm();
    alert('Operacion guardada!')
  }
  
}
