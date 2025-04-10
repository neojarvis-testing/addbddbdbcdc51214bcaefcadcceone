import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent implements OnInit {

  newCustomer: Customer = this.initializeCustomer();
  errorMessage: string = '';

  constructor(private customerService: CustomerService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  saveCustomer(customerForm: any): void {
    if (customerForm.invalid) return;

    this.customerService.createCustomer(this.newCustomer).subscribe(
      () => {
        this.router.navigate(['/viewCustomer']); // Navigate to customer list on success
      },
      (error) => {
        this.errorMessage = 'Failed to add customer.';
        console.error('Error adding customer:', error);
      }
    );
  }

  resetForm(customerForm: any): void {
    customerForm.resetForm();
    this.newCustomer = this.initializeCustomer();
  }

  initializeCustomer(): Customer {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      paymentMethod: '',
      loyaltyProgram: false
    };
  }

}
