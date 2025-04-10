import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'https://ide-dbeeafdad316582952bccfaccecfone.premiumproject.examly.io/proxy/8080'; // Base URL

 
  constructor(private http: HttpClient) { }

  // Create new customer
  createCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.baseUrl}/customers`;
    console.log("Creating Customer", customer);
    return this.http.post<Customer>(url, customer);
  }

  // Get all customers
  getCustomers(): Observable<Customer[]> {
    const url = `${this.baseUrl}/customers`;
    return this.http.get<Customer[]>(url);
  }

  // Delete customer by ID
  deleteCustomer(id: number): Observable<void> {
    const url = `${this.baseUrl}/customers/${id}`;
    console.log("Deleting Customer with ID", id);
    return this.http.delete<void>(url);
  }
}
