import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private form_builder: FormBuilder,
    private http: HttpClient
  ) { }

  readonly baseUrl = 'http://localhost:3000/api';
  list: Employee[] = [];

  employeeForm = this.form_builder.group({
    _id: [''],
    name: ['', Validators.required],
    position: ['', Validators.required],
    office: [''],
    salary: ['', Validators.required]
  })

  addEmployee() {
    return this.http.post(`${this.baseUrl}/create_employee`, this.employeeForm.value)
  }

  deleteEmployee(emp_id: string) {
    return this.http.delete(`${this.baseUrl}/delete_employee/${emp_id}`)
  }

  getAllEmployees() {
    return this.http.get(`${this.baseUrl}/get_all_employees`)
    .subscribe((data) => {
      this.list = data as Employee[];
    })
  }

  updateEmployee() {
    return this.http.put(`${this.baseUrl}/update_employee/${this.employeeForm.get('_id')?.value}`, this.employeeForm.value)
  }
}
