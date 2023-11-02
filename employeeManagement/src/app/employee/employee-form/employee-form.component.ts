import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  submitted: boolean = false;

  constructor(
    public employee_service: EmployeeService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if(this.employee_service.employeeForm.valid) {
      if(this.employee_service.employeeForm.get('_id')?.value == '') {
        this.employee_service.addEmployee().subscribe({
          next: (sub_res: any) => {
            this.employee_service.getAllEmployees();
            this.toaster.success(sub_res.message)
            this.resetForm();
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
      else {
        this.employee_service.updateEmployee().subscribe({
          next: (update_res: any) => {
            this.employee_service.getAllEmployees();
            this.toaster.info(update_res.message)
            this.resetForm();
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    }    
  }

  resetForm() {
    this.employee_service.employeeForm.reset();
    this.submitted = false;
  }
}
