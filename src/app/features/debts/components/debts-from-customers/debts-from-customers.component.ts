import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DebtModel } from 'src/app/shared/models/debt.model';

@Component({
  selector: 'cd7-debts-from-customers',
  templateUrl: './debts-from-customers.component.html',
  styleUrls: ['./debts-from-customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtsFromCustomersComponent implements OnInit {
  @Input() debt: DebtModel;
  @Output() selectedDebt = new EventEmitter<DebtModel>();
  constructor() {}

  ngOnInit(): void {}

  selectDebt(): void {
    this.selectedDebt.emit(this.debt);
  }
}
