import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transaction} from './../../models/transaction.model';


@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {

  typeTransaction: string;

  constructor() { }

  ngOnInit(): void {
    this.typeTransaction = "Tipo";
  }

  selectType(name: string){
    this.typeTransaction = name;
  }

  onAddTransaction(form: NgForm){
    if(form.invalid){
      return;
    }
    const transaction: Transaction = {
        name: form.value.name,
        cash: form.value.cash,
        date: form.value.date,
        type: form.value.select
    };
    console.log(transaction);
  }
  setDefault(){
    (<HTMLInputElement>document.getElementById("exampleFormControlInput1")).value = "";
    (<HTMLInputElement>document.getElementById("exampleFormControlInput2")).value = "";
    (<HTMLInputElement>document.getElementById("exampleFormControlInput3")).value = "";
    (<HTMLInputElement>document.getElementById("options")).value = "";
  }
}
