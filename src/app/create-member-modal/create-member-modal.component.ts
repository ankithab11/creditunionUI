import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeServiceService } from '../services/employee-service.service';
@Component({
  selector: 'app-create-member-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-member-modal.component.html',
  styleUrl: './create-member-modal.component.css'
})
export class CreateMemberModalComponent implements OnInit{
  modal = inject(NgbActiveModal);
  fb = inject(FormBuilder);
  form: FormGroup;
  constructor(private employeeService: EmployeeServiceService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required]
  });
  }

  ngOnInit() {
    // this.form = this.fb.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    // });
  }

  createAccount() {
    if (this.form.invalid) {
      return;
    }

    this.employeeService.createAccounnt(this.f['firstName'].value, this.f['lastName'].value, this.f['address'].value).subscribe({
      next: response => {
        console.log('Product creating successfully:', response);
        this.modal.close('created');
      },
      error: err => {
        console.error('Failed to creating account:', err);
      }
    });
  }
  

  get f() { return this.form.controls; }
}
