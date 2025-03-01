import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from "../_forms/date-picker/date-picker.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, TextInputComponent, DatePickerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();
  validationErrors: string[] | undefined;

  ngOnInit() {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group
      ({
        gender: ['male'],
        KnownAs: ['', Validators.required],
        DateOfBirth: ['', Validators.required],
        City: ['', Validators.required],
        Country: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control.parent?.get(matchTo)?.value ? null : { isMatching: true }
    }
  }

  register() {
    const dob = this.getDateOnyl(this.registerForm.get('DateOfBirth')?.value);
    this.registerForm.patchValue({DateOfBirth: dob});
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => this.router.navigateByUrl('/members'),
      error: error => this.validationErrors = error
    })
  }
  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnyl (dob: string | undefined){
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }
}
