import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../services/shared.service';
import { ChangepasswordComponent } from 'src/app/dashboard/Modules/manager/users/component/changepassword/changepassword.component';
import { UserService } from 'src/app/dashboard/Modules/manager/users/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  Username = localStorage.getItem('userName');
  useremail = localStorage.getItem('userEmail');
  erroMsg: string = '';
  erroMsg2: string = '';
  erroMsg3: string = '';
  current: any;
  constructor(
    private dialog: MatDialog,
    private _router: Router,
    private _ToastrService: ToastrService,
    private _SharedService: SharedService,
    private _UserService: UserService
  ) {}

  ngOnInit(): void {
    this.getcurentuser();
  }

  // userId:number=0;

  logout() {
    Swal.fire({
      title: 'Are you sure logout!?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF9B28',
      cancelButtonColor: '#ac0000',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
        localStorage.clear();
        this._router.navigate(['/auth/login']);
      }
    });
  }

  openchangDialog(): void {
    const dialogRef = this.dialog.open(ChangepasswordComponent, {
      data: {},
      width: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onchange(result);
      }
    });
  }
  onchange(data: any) {
    this._SharedService.changepass(data).subscribe({
      next: (res) => {},
      error: (err) => {
        (this.erroMsg = err.error.additionalInfo.errors.confirmNewPassword),
          (this.erroMsg2 = err.error.additionalInfo.errors.newPassword);
        this.erroMsg3 = err.error.additionalInfo.errors.oldPassword;

        console.timeLog(this.erroMsg);
        this._ToastrService.warning(this.erroMsg);
        this._ToastrService.warning(this.erroMsg2);
        this._ToastrService.warning(this.erroMsg3);
      },
      complete: () => {
        this._ToastrService.success('success');
      },
    });
  }

  getcurentuser() {
    this._UserService.getcurrentUser().subscribe({
      next: (res) => {
        this.current = res;
      },
    });
  }
}
