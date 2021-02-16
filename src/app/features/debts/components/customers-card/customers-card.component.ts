import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerModel } from 'src/app/shared/models/customer.model';

@Component({
  selector: 'cd7-customers-card',
  templateUrl: './customers-card.component.html',
  styleUrls: ['./customers-card.component.scss'],
})
export class CustomersCardComponent implements OnInit {
  @Input() costumers: CustomerModel[] = [];
  @Output() selectedCustomer = new EventEmitter<number>();
  @Output() deleteDebts = new EventEmitter<number>();
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  selecCustomer(customerId: number): void {
    this.selectedCustomer.emit(customerId);
  }

  deleteDebtsFromCustomer(customerId: number): void {
    this.deleteDebts.emit(customerId);
  }
}
