import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerServiceMock: jasmine.SpyObj<CustomerService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    customerServiceMock = jasmine.createSpyObj('CustomerService', ['getCustomers', 'deleteCustomer']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: CustomerService, useValue: customerServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  fit('should_create_CustomerListComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('should_call_loadCustomers_on_ngOnInit_in_CustomerListComponent', () => {
    spyOn((component as any), 'loadCustomers');
    fixture.detectChanges();
    expect((component as any).loadCustomers).toHaveBeenCalled();
  });

  fit('should_filter_customers_based_on_exact_payment_method_in_CustomerListComponent', () => {
    const mockCustomers: Customer[] = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '1234567890', address: '123 Main St', paymentMethod: 'Credit Card', loyaltyProgram: true },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '9876543210', address: '456 Elm St', paymentMethod: 'Cash on Delivery', loyaltyProgram: false }
    ];
    
    customerServiceMock.getCustomers.and.returnValue(of(mockCustomers));
    fixture.detectChanges();

    component.selectedPaymentMethod = 'Credit Card';
    component.applyFilter();
    fixture.detectChanges();

    expect(component.filteredCustomers.length).toBe(1);
    expect(component.filteredCustomers[0].name).toBe('Alice Johnson');
  });

  fit('should_call_deleteCustomer_when_delete_button_is_clicked_in_CustomerListComponent', () => {
    spyOn(component, 'deleteCustomer');

    const mockCustomers: Customer[] = [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '1234567890', address: '123 Main St', paymentMethod: 'Credit Card', loyaltyProgram: true }
    ];
    customerServiceMock.getCustomers.and.returnValue(of(mockCustomers));
    fixture.detectChanges();

    // Find delete button
    const deleteButton: HTMLButtonElement | undefined = Array.from(
      fixture.nativeElement.querySelectorAll('button')
    ).find((button): button is HTMLButtonElement => button instanceof HTMLButtonElement && button.textContent?.trim() === 'Delete');

    expect(deleteButton).toBeTruthy(); // Ensure the button was found

    deleteButton?.click();
    fixture.detectChanges();

    expect(component.deleteCustomer).toHaveBeenCalledWith(mockCustomers[0].id);
  });

});
