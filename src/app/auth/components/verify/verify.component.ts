import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verify } from '../../interfaces/verify';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent {

  verifyForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private _AuthService: AuthService, 
    private toastr: ToastrService, 
    private router: Router,) { }

  get code() {
    return this.verifyForm.get('code');
  }

  get email() {
    return this.verifyForm.get('email');
  }

  onVerify(data: FormGroup) {
    this._AuthService.onVerify(data.value).subscribe({
      next: (res) => {
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Error');
      },
      complete: () => {
        this.toastr.success('Account Activate Successfully!', 'Success');
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
