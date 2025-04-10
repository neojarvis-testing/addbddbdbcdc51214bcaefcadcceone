import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { Customer } from '../models/customer.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('CustomerService', () => {

  let service: CustomerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService], // CustomerService provider
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('should_create_CustomerService_instance', () => {
    expect(service).toBeTruthy();
  });

  fit('CustomerService_should_add_a_customer_and_return_it', () => {
    const mockCustomer: Customer = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Cityville',
      paymentMethod: 'Credit Card',
      loyaltyProgram: true
    };

    (service as any).createCustomer(mockCustomer).subscribe((customer) => {
      expect(customer).toEqual(mockCustomer);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/customers`);
    expect(req.request.method).toBe('POST');
    req.flush(mockCustomer);
  });

  fit('CustomerService_should_get_all_customers', () => {
    const mockCustomers: Customer[] = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St, Cityville',
        paymentMethod: 'Credit Card',
        loyaltyProgram: true
      }
    ];

    (service as any).getCustomers().subscribe((customers) => {
      expect(customers).toEqual(mockCustomers);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/customers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCustomers);
  });

  fit('CustomerService_should_delete_a_customer', () => {
    const id = 1;

    (service as any).deleteCustomer(id).subscribe(() => {
      expect().nothing();
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/customers/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
  
});
