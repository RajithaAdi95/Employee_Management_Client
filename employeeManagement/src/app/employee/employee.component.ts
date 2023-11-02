import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    public employee_service: EmployeeService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.employee_service.getAllEmployees();
  }

  updateForm(selected_emp: any) {
    this.employee_service.employeeForm.setValue({
      _id: selected_emp._id,
      name: selected_emp.name,
      position: selected_emp.position,
      office: selected_emp.office,
      salary: selected_emp.salary,
    })
  }

  onDelete(selected_id: any) {
    if(confirm('Are you sure you want to delete this employee?')) {
      this.employee_service.deleteEmployee(selected_id).subscribe({
        next: (delete_res: any) => {
          this.employee_service.getAllEmployees();
          this.toaster.error(delete_res.message)
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}
