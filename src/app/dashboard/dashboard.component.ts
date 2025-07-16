import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';
  currentTime: Date = new Date();

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userEmail = this.cookieService.get('user_email');
    
    if (!this.userEmail) {
      this.router.navigate(['/login']);
      return;
    }

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  logout() {
    this.cookieService.delete('auth_token');
    this.cookieService.delete('user_email');
    
    this.router.navigate(['/login']);
  }

  redirectToList()  { 
    this.router.navigate(['/list']);
  }
}
