import { NgModule } from '@angular/core';
import { DebtsComponent } from './container/debts/debts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DebtsFormComponent } from './components/debts-form/debts-form.component';
import { CustomersCardComponent } from './components/customers-card/customers-card.component';

@NgModule({
  declarations: [DebtsComponent, DebtsFormComponent, CustomersCardComponent],
  imports: [SharedModule],
})
export class DebtsModule {}
