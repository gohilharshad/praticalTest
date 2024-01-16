import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  username: any;
  isLoggedIn:any;


  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('registerData');

    if (storedUserData) {
      const registerData = JSON.parse(storedUserData);
      this.username = registerData.username;
    }
  }
  logout(): void {
    this.isLoggedIn = false;
  }

}
