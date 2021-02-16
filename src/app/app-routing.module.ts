import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebtsComponent } from './features/debts/container/debts/debts.component';

const routes: Routes = [
  {
    path: '',
    component: DebtsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
