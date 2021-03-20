import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction} from './../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.css']
})
export class EditBudgetComponent implements OnInit {
  transactionId: string;
  transaction: Transaction;
  transactionForm: any;

  @ViewChild('budgetForm') budgetForm: NgForm;

  constructor(private transactionService: TransactionService, private activatedroute: ActivatedRoute) {
    this.activatedroute.params.subscribe(data => {
      this.transactionId = data.id;
    })
   }



  ngOnInit(): void {
    
    this.transactionService.getTransaction(this.transactionId).subscribe(doc => {
      this.transaction = doc[0];
     this.transactionForm = {
      name: doc[0].name,
      cash: doc[0].cash,
      date: doc[0].date,
    };
 
    setTimeout(() => { 
      this.budgetForm.setValue(this.transactionForm);
    });
    });
    
  }


  onAddTransaction(form: NgForm): Transaction{
    if(form.invalid){
      return;
    }
    const transaction: Transaction = {
         id: this.transactionId,
        name: form.value.name,
        cash: form.value.cash,
        date: form.value.date,
        type: this.transaction.type
    };
    console.log(transaction);
    this.transactionService.updateTransaction(transaction).subscribe();
    form.resetForm();
    alert('Transaccion guardada!');
  }

 
  

}
