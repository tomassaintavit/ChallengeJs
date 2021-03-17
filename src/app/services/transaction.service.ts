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

  postTransaction(transaction: Transaction): Observable<Transaction>{
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    }
    return this.http.post<Transaction>(`${this.baseUrl}/api/transaction`,{ transaction }, httpOptions);
  }
}
