import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})
export class ChangepasswordComponent {
  changePassForm = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  errMsg: string;
  errMsgControl: any;
  isHide: boolean = true;
  isHideNew: boolean = true;
  isHideConfirm: boolean = true;
  isLoading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.changePassForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkPasswords() {
    const newPassword = this.changePassForm.get('newPassword')?.value;
    const confirmPassword =
      this.changePassForm.get('confirmNewPassword')?.value;

    if (newPassword !== confirmPassword) {
      this.changePassForm
        .get('confirmNewPassword')
        ?.setErrors({ passwordsDoNotMatch: true });
    } else {
      this.changePassForm.get('confirmNewPassword')?.setErrors(null);
    }
  }
}
