import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddCustomerFormComponent } from './add-customer-form.component';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Customer } from '../models/customer.model';

describe('AddCustomerFormComponent', () => {
  let component: AddCustomerFormComponent;
  let fixture: ComponentFixture<AddCustomerFormComponent>;
  let customerServiceMock: jasmine.SpyObj<CustomerService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    customerServiceMock = jasmine.createSpyObj('CustomerService', ['createCustomer']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddCustomerFormComponent],
      imports: [FormsModule], // Import FormsModule for template-driven form
      providers: [
        { provide: CustomerService, useValue: customerServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  fit('should_create_AddCustomerFormComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('saveCustomer_method_should_be_defined_in_AddCustomerFormComponent', () => {
    expect((component as any).saveCustomer).toBeDefined();
  });

  fit('should_implement_template_driven_form_in_AddCustomerFormComponent', () => {
    const formElement: HTMLElement = fixture.nativeElement.querySelector('form');
    const inputElements = fixture.nativeElement.querySelectorAll('input, select, textarea');
    
    // Ensure the form exists in the template
    expect(formElement).toBeTruthy();
  
    // Ensure at least one input element uses [(ngModel)]
    let hasNgModel = false;
    inputElements.forEach((element: any) => {
      if (element.hasAttribute('ng-reflect-name')) {
        hasNgModel = true;
      }
    });
  
    expect(hasNgModel).toBeTrue(); // Ensures ngModel is present
    expect((component as any).formGroup).toBeUndefined();
  });

  fit('should_call_saveCustomer_on_form_submission_in_AddCustomerFormComponent', () => {
    spyOn((component as any), 'saveCustomer');
  
    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
  
    expect((component as any).saveCustomer).toHaveBeenCalled();
  });

});
