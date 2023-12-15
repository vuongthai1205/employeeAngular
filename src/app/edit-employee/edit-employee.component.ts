import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent implements OnInit {
  onSubmit() {
    this.restApi
      .editEmployee(this.employeeId, this.employeeForm.value)
      .subscribe({
        next: (res: any) => {
          this.toast.success(
            'Edit employee' + res.data.phone + 'success',
            'Notification'
          );
        },
        error: (err) => {
          console.log(err);
          this.toast.error('Error: ' + err, 'Notification');
        },
      });
  }
  employeeId: any;
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(
    private restApi: RestApiService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    this.getEmployeeById();
  }
  getEmployeeById = () => {
    this.restApi.getEmployee(this.employeeId).subscribe({
      next: (res: any) => {
        this.employeeForm.controls.firstName.setValue(res.data.firstName);
        this.employeeForm.controls.lastName.setValue(res.data.lastName);
        this.employeeForm.controls.phone.setValue(res.data.phone);
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
}
