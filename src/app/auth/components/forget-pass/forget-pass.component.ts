import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent {
  constructor(
    private _AuthService: AuthService,
    private _router: Router,
    private _ToastrService: ToastrService
  ) {}
  email: string = '';
  erroMsg: string = '';
  onforgetpass(): void {
    let data = {
      email: this.email,
    };
    
    this._AuthService.forgetpass(data).subscribe({
      next: (res) => {
        
      },
      error: (err) => {
        this.erroMsg = err.error.additionalInfo.errors.email;
        console.timeLog(this.erroMsg);
        this._ToastrService.warning(this.erroMsg);
      },
      complete: () => {
        this._router.navigate(['/auth/resetPassword']);
      },
    });
  }
}
