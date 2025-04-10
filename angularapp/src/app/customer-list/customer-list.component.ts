import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  selectedPaymentMethod: string = '';
  uniquePaymentMethods: string[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.extractUniquePaymentMethods();
      this.applyFilter();
    });
  }

  extractUniquePaymentMethods(): void {
    this.uniquePaymentMethods = Array.from(
      new Set(this.customers.map(customer => customer.paymentMethod))
    );
  }

  applyFilter(): void {
    if (this.selectedPaymentMethod === '') {
      this.filteredCustomers = [...this.customers]; // Show all if no filter is applied
    } else {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.paymentMethod === this.selectedPaymentMethod
      );
    }
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe(
      () => {
        console.log('Customer deleted successfully.');
        this.loadCustomers(); // Refresh the customer list after deletion
      },
      error => {
        console.error('Error deleting customer:', error);
      }
    );
  }

}
