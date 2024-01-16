import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private router:Router) {}
  
  navigateToRegister() {
    console.log("HEllo");
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Additional validation messages can be added based on your requirements
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const storedUserData = localStorage.getItem('registerData');

      if (storedUserData) {
        const registerData = JSON.parse(storedUserData);
        if ( this.loginForm.value.email === registerData.email && this.loginForm.value.password === registerData.password) {

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You have successfully logged in.',
          });
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            localStorage.setItem('isLoggedIn', 'true');
          }, 3000);
          console.log('Login successful');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Credentials',
            text: 'The entered email or password is incorrect.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'User Not Registered',
          text: 'You need to register before logging in.',
        }); 
      }
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    // Similar method as in the register component
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
