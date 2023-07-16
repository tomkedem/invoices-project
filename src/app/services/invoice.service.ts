import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../app.config';


import { Invoice } from '../Models/invoice.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Searchinvoice } from '../Models/searchinvoice.model';
import { UpdatedInvoice } from '../Models/updatedInvoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private API_URL = APP_CONFIG.API_URL;
  searchinvoice:Searchinvoice;
  constructor(private http: HttpClient) {}
   invoiceData = {
    customerId: 0,
    amount: 0
  };
  fetchData(searchinvoice:Searchinvoice) {
    return this.http.post<any[]>(`${this.API_URL}/invoices/search`, searchinvoice)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }  

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/Invoices/${id}`)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
 
  editInvoice(updatedInvoice: UpdatedInvoice): Observable<any> {
    return this.http.put(`${this.API_URL}/api/Invoices`, updatedInvoice)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }

 
  addInvoice(customerId: number, amount: number): Observable<any> {
    const invoiceData = {
      customerId: customerId,
      amount: amount
    };

    return this.http.post(`${this.API_URL}/api/Invoices`, invoiceData)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
