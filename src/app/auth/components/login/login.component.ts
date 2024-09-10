import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  getEmailErrorMessage() {
    const emailControl: any = this.loginForm.get('email');

    if (emailControl.hasError('required')) {
      return 'Email is required.';
    }
    return emailControl.hasError('email') ? 'Email is not vaild.' : '';
  }

  getPasswordErrorMessage() {
    const passwordControl: any = this.loginForm.get('password');
    return passwordControl.hasError('required') ? 'Password is required.' : '';
  }

  onLogin(data: FormGroup) {
    this._AuthService.login(data.value).subscribe({
      next: (res) => {
        localStorage.clear;
        localStorage.setItem( 'userToken', res.token );
        
        this._AuthService.getProfile();
      },
      error: (err) => {
        this._ToastrService.error(err.error.message, 'Error!');
      },
      complete: () => {
        this._ToastrService.success(
          " You're now logged in. Let’s get started.",
          'Success!'
        );
        this._Router.navigate(['/dashboard']);
      },
    });
  }
}
