import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomerModel } from 'src/app/shared/models/customer.model';

@Injectable()
export class StateService {
  private customers: CustomerModel[] = [];
  private readonly _customersDebts = new BehaviorSubject<CustomerModel[]>([]);
  constructor() {}

  get customersDebts(): Observable<CustomerModel[]> {
    return this._customersDebts.asObservable();
  }

  setCustomersDebts(customers: CustomerModel[]): void {
    this._customersDebts.next();
  }
}
