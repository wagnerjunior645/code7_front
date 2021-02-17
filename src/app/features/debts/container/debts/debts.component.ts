import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from 'src/app/core/http/customers.service';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { delay, finalize } from 'rxjs/operators';
import { DebtModel } from 'src/app/shared/models/debt.model';
import { DebtService } from 'src/app/core/http/debt.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateDebtModel } from 'src/app/shared/models/createDebt.model';
import { UpdateDebtModel } from 'src/app/shared/models/updateDebt.model';

@Component({
  selector: 'cd7-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss'],
})
export class DebtsComponent implements OnInit {
  sourceCustomers: CustomerModel[] = [];
  costumers$: Observable<CustomerModel[]>;
  debtsDetails$: Observable<DebtModel[]>;

  isSelectedCustomer = false;
  isLoadingCustomers = false;
  debts: DebtModel[];
  selectedDebt: DebtModel | undefined;
  selectedCustomers: CustomerModel;
  showForm = false;

  constructor(
    private customersService: CustomersService,
    private debtService: DebtService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe((customers) => {
      this.sourceCustomers = customers;
    });
    this.getCustomersDebts();
  }

  private getCustomersDebts(): void {
    this.costumers$ = this.customersService
      .getCustomersWithDebts()
      .pipe(delay(1000));
  }

  selectCustomer(customer: CustomerModel): void {
    this.selectedCustomers = customer;
    this.isSelectedCustomer = true;
    this.isLoadingCustomers = true;
    this.customersService
      .getDebtsByCustomers(customer.id)
      .pipe(
        delay(2000),
        finalize(() => (this.isLoadingCustomers = false))
      )
      .subscribe((debts) => {
        this.debts = debts;
      });
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

  newDebt(): void {
    this.selectedDebt = undefined;
    this.debts = [];
    this.showForm = true;
  }

  selectDebt(debt: DebtModel): void {
    this.selectedDebt = debt;
    this.showForm = true;
  }

  emitterUpdate(updateDebt: UpdateDebtModel): void {
    this.debtService
      .updateDebt(this.selectedDebt!.id, updateDebt)
      .subscribe(() => {
        this.toastrService.success('Dívida salva com sucesso.');
        this.debts = this.debts.map((debt) => {
          if (debt.id === this.selectedDebt!.id) {
            debt = { ...debt, ...updateDebt };
          }
          return debt;
        });
        this.selectedDebt = undefined;
        this.showForm = false;
        this.getCustomersDebts();
      }, err => {
        this.toastrService.error('Ocorreu um error ao tentar salvar a dívida');
      });
  }
  emitterCreate(createDebt: CreateDebtModel): void {
    this.debtService.createDebt(createDebt).subscribe((debt) => {
      this.toastrService.success('Dívida criada com sucesso.');
      this.showForm = false;
      this.getCustomersDebts();
    }, err => {
      this.toastrService.error('Ocorreu um error ao tentar criar a dívida');
    });
  }
  emitterRemove(debt: DebtModel): void {
    this.debtService.removeDebt(debt.id).subscribe(() => {
      this.toastrService.success('Dívida removida com sucesso.');
      this.debts = this.debts.filter((debtFilter) => debtFilter.id !== debt.id);
      if (this.debts.length === 0) {
        this.getCustomersDebts();
      }
      this.selectedDebt = undefined;
      this.isSelectedCustomer = false;
      this.showForm = false;
    }, err => {
      this.toastrService.error('Ocorreu um error ao tentar remover a dívida');
    });
  }
}
