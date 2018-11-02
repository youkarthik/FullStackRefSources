import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.deleteToken();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe(result => {
        if (result === 500) {
          this.error = 'UserName or password incorrect';
          this.loading = false;
        }
        this.authService.setToken(result);
        this.authService.setUserId(this.loginForm.controls.username.value);
        this.router.navigate(['/movies']);
      },
        error => {
          this.loading = false;
        });
    }
  }
}
