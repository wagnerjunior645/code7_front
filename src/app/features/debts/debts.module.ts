import { NgModule } from '@angular/core';
import { DebtsComponent } from './container/debts/debts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DebtsFormComponent } from './components/debts-form/debts-form.component';
import { CustomersCardComponent } from './components/customers-card/customers-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebtsFromCustomersComponent } from './components/debts-from-customers/debts-from-customers.component';

@NgModule({
  declarations: [DebtsComponent, DebtsFormComponent, CustomersCardComponent, DebtsFromCustomersComponent],
  imports: [SharedModule, ReactiveFormsModule],
})
export class DebtsModule {}
