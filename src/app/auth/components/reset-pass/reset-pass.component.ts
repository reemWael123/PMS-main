import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ResetPass } from '../../interfaces/resetPass';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  hide: boolean = true;
  isHideConfirm: boolean = true;
  errMsg: string;
  errMsgControl: any;
  constructor(private _AuthService:AuthService , private _router:Router,private _ToastrService:ToastrService){}
  resetform:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    confirmPassword:new FormControl('',[Validators.required]),
    seed:new FormControl('',[Validators.required]),
  })
  onReset():void{
    this._AuthService.resetPass(this.resetform.value as ResetPass).subscribe({
next:(res)=>{
},
error:(err)=>{
  this.errMsg = err.error.message;
  this.errMsgControl = err.error.additionalInfo
  if ( this.errMsgControl && this.errMsgControl.errors ) {
    for ( const control in this.errMsgControl.errors ) {
      if ( this.errMsgControl.errors[control] ) {
        this._ToastrService.error( this.errMsgControl.errors[control][0], 'Error', {
          timeOut: 0
        } );
      }
    }
  }
  else {
    this._ToastrService.error( this.errMsg, 'Error' );
  }
     },
      complete: () => {
        this._ToastrService.success( 'Account Activate Successfully!', 'Success' );
        this._router.navigate( ['/auth/login'] );
     }
    })
  }
}
