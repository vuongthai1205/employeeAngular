import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  employeeForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(
    private router: Router,
    private restApi: RestApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.restApi.addEmployee(this.employeeForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(
          'Add employee ' + res.data.phone + ' success',
          'Notification'
        );
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error: ' + err, 'Notification');
      },
    });
  }
}
