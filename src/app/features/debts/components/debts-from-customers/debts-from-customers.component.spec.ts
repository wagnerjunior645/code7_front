import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsFromCustomersComponent } from './debts-from-customers.component';

describe('DebtsFromCustomersComponent', () => {
  let component: DebtsFromCustomersComponent;
  let fixture: ComponentFixture<DebtsFromCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebtsFromCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsFromCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
