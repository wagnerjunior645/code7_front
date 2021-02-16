import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/customers`);
  }

  getCustomersById(customersId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/customers/${customersId}`);
  }

  getDebtsByCustomers(customersId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/customers/${customersId}/debts`
    );
  }

  getCustomersWithDebts(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(
      `${environment.apiUrl}/customers/debts/total`
    );
  }

  deleteDebtsFromCustomers(customersId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/customers/${customersId}/debts`);
  }
}
