import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
    }, {
      // validators: this.passwordMatchValidator
    });
  }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup?.get('password').value;
  //   const confirmPassword = formGroup?.get('confirmPassword').value;

  //   if (password !== confirmPassword) {
  //     formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
  //   } else {
  //     formGroup.get('confirmPassword').setErrors(null);
  //   }
  // }

  onSubmit() {

    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      localStorage.setItem('registerData', JSON.stringify(registerData));

    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}