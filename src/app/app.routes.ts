import { Routes } from '@angular/router';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ListCompanyComponent } from './list-company/list-company.component';

export const routes: Routes = [
  {
    path: 'list-employee',
    component: ListEmployeeComponent,
    children: [
      {
        path: 'add-employee',
        component: AddEmployeeComponent,
      },
    ],
  },
  {
    path: 'list-company',
    component: ListCompanyComponent
  },
  {
    path: 'ViewEmployee/:id',
    component: ViewEmployeeComponent,
  },
  {
    path: 'EditEmployee/:id',
    component: EditEmployeeComponent,
  },
  { path: '', redirectTo: 'list-employee', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },
];
