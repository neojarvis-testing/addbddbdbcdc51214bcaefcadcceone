import { Customer } from './customer.model'; // Adjust the import path

describe('Customer', () => {
  fit('should_create_Customer_instance', () => {
    const customer: Customer = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '9876543210',
      address: '123 Main St, Springfield',
      paymentMethod: 'Credit Card',
      loyaltyProgram: true
    };

    expect(customer).toBeTruthy();
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('john.doe@example.com');
    expect(customer.phone).toBe('9876543210');
    expect(customer.address).toBe('123 Main St, Springfield');
    expect(customer.paymentMethod).toBe('Credit Card');
    expect(customer.loyaltyProgram).toBeTrue();
  });
});
