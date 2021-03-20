import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { BudgetComponent } from './components/budget/budget.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { EditBudgetComponent } from './components/edit-budget/edit-budget.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'budget', component: BudgetComponent, pathMatch: 'full' },
  { path: 'budget-form', component: BudgetFormComponent, pathMatch: 'full' },
  { path: 'edit-budget/:id', component: EditBudgetComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
