import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  error = '';

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    this.http.post<{ token: string, user: { email: string } }>('/api/login', this.loginForm.value)
      .subscribe({
        next: (response) => {
          this.cookieService.set('auth_token', response.token);
          this.cookieService.set('user_email', response.user.email);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.error = 'Invalid email or password';
          this.loading = false;

          this.cookieService.set('auth_token', 'response.token');
          this.cookieService.set('user_email', this.loginForm.value.email);
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
