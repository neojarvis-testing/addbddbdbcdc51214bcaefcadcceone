import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/viewProduct', pathMatch: 'full' }, // Default route to view menu items
  { path: 'addNewCustomer', component: AddCustomerFormComponent }, // Add Menu Item
  { path: 'viewCustomer', component: CustomerListComponent }, // View Menu Items
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
