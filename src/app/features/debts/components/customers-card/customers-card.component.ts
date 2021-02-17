import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerModel } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'cd7-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersCardComponent implements OnInit {
  @Input() costumers: CustomerModel[] = [];
  @Output() selectedCustomer = new EventEmitter<CustomerModel>();
  @Output() deleteDebts = new EventEmitter<number>();
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  selecCustomer(customer: CustomerModel): void {
    this.selectedCustomer.emit(customer);
  }

  deleteDebtsFromCustomer(customerId: number): void {
    this.deleteDebts.emit(customerId);
  }
}
