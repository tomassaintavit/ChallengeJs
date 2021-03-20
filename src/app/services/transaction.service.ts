import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../app/models/transaction.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]>{
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }

    return this.http.get<Transaction[]>(`${this.baseUrl}/api/transaction`, httpOptions);
  }

  getTransaction(idTransaction: string): Observable<Transaction>{
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }

    return this.http.get<Transaction>(`${this.baseUrl}/transaction/${idTransaction}`, httpOptions);
  }

  postTransaction(transaction: Transaction): Observable<Transaction>{
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }
    return this.http.post<Transaction>(`${this.baseUrl}/api/transaction`,{ transaction }, httpOptions);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction>{
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }
    return this.http.post<Transaction>(`${this.baseUrl}/update/transaction`,{ transaction }, httpOptions);
  }

  deleteTransaction(idTransaction: string): Observable<string>{
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }
    return this.http.delete<string>(`${this.baseUrl}/api/delete/transaction/${idTransaction}`, httpOptions);
  }

  
}
