import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  files: File[] = [];
  imgSource: any;

  errMsg: string;
  errMsgControl: any;
  isLoading: boolean = false;
  isHide: boolean = true;
  isHideConfirm: boolean = true;
  code: string;

  constructor(private fb: FormBuilder, private _AuthService: AuthService,private toastr: ToastrService, private router: Router ) {
    this.registerForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  get userName() {
    return this.registerForm.get('userName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  checkPasswords() {
    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ notMatch: true });
    }
  }

  onRegister(data: FormGroup) {
    let formData = new FormData();
    formData.append('userName', data.value.userName);
    formData.append('country', data.value.country);
    formData.append('phoneNumber', data.value.phoneNumber);
    formData.append('email', data.value.email);
    formData.append('password', data.value.password);
    formData.append('confirmPassword', data.value.confirmPassword);
    formData.append('profileImage', this.imgSource);
    this.isLoading = true;
    this._AuthService.onRegister(formData).subscribe({
      next: (res) => {},
      error: (err) => {
        this.errMsg = err.error.message;
        this.errMsgControl = err.error.additionalInfo;
        if (this.errMsgControl && this.errMsgControl.errors) {
          for (const control in this.errMsgControl.errors) {
            if (this.errMsgControl.errors[control]) {
              this.toastr.error(
                this.errMsgControl.errors[control][0],
                'Error',
                {
                  timeOut: 0,
                }
              );
            }
          }
        } else {
          this.toastr.error(this.errMsg, 'Error');
        }
        this.isLoading = false;
      },
      complete: () => {
        this.toastr.success(
          'Register Successfully! A verification code has been sent to your email address.',
          'Success'
        );
        this.isLoading = false;
        this.router.navigate( ['auth/verify'] );
      },
    });
  }

  // Photo
  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.imgSource = this.files[0];
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.files = [];
    this.imgSource = null;
  }
}
