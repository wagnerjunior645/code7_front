import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/core/http/customers.service';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { delay } from 'rxjs/operators';
import { DebtModel } from 'src/app/shared/models/debt.model';
import { DebtService } from 'src/app/core/http/debt.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cd7-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss'],
})
export class DebtsComponent implements OnInit {
  sourceCustomers: CustomerModel[] = [];
  costumers$: Observable<CustomerModel[]>;
  debtsDetails$: Observable<DebtModel[]>;

  constructor(
    private customersService: CustomersService,
    private debtService: DebtService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe((customers) => {
      this.sourceCustomers = customers;
    });
    this.costumers$ = this.customersService
      .getCustomersWithDebts()
      .pipe(delay(2000));
  }

  selectCustomer(customerId: number): void {
    console.log(customerId);
  }

  deleteDebtsFromCustomers(customerId: number): void {
    this.customersService.deleteDebtsFromCustomers(customerId).subscribe(
      () => {
        this.toastrService.success(
          'Todas as dívidas desse cliente foram removidas.'
        );
      },
      (err: HttpErrorResponse) => {
        this.toastrService.error(
          'Ocorreu um error ao listar os clientes com dividas' ||
            err.error.message
        );
      }
    );
  }
}
