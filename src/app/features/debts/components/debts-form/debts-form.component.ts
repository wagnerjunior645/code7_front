import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateDebtModel } from 'src/app/shared/models/createDebt.model';
import { CustomerModel } from 'src/app/shared/models/customer.model';
import { DebtModel } from 'src/app/shared/models/debt.model';
import { UpdateDebtModel } from 'src/app/shared/models/updateDebt.model';

@Component({
  selector: 'cd7-debts-form',
  templateUrl: './debts-form.component.html',
  styleUrls: ['./debts-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebtsFormComponent implements OnInit {
  @Input() customers: CustomerModel[] = [];
  @Input() debt: DebtModel | undefined;
  @Output() emitterUpdate = new EventEmitter<UpdateDebtModel>();
  @Output() emitterCreate = new EventEmitter<CreateDebtModel>();
  @Output() emitterRemove = new EventEmitter<DebtModel>();
  debtsForm: FormGroup;
  myModel: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.debtsForm = this.fb.group({
      customersId: this.fb.control(null, [Validators.required]),
      debtsDate: this.fb.control(null, [Validators.required]),
      description: this.fb.control(null, [Validators.maxLength(255)]),
      value: this.fb.control(null, [Validators.required]),
    });
    if (this.debt) {
      this.debtsForm.patchValue({
        customersId: this.debt.customersId,
        debtsDate: this.debt.debtsDate,
        description: this.debt.description,
        value: this.debt.value,
      });
      // tslint:disable-next-line: no-non-null-assertion
      this.debtsForm.get('customersId')!.disable();
    }
  }

  remove(): void {
    this.emitterRemove.emit(this.debt);
  }
  update(): void {
    this.debtsForm.markAllAsTouched();
    this.emitterUpdate.emit(this.debtsForm.value);
  }
  create(): void {
    this.debtsForm.markAllAsTouched();
    this.emitterCreate.emit(this.debtsForm.value);
  }
}
