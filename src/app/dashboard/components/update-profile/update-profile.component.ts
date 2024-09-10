import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashService } from '../../service/dash.service';
import { UserService } from '../../Modules/manager/users/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  profileForm = this.fb.group({
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

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private _DashService: DashService,
    private _UserService: UserService
  ) {
    this.profileForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  ngOnInit(): void {
    this.onGetCurrentUserProfile();
    this.imgSource;
  }

  get userName() {
    return this.profileForm.get('userName');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get country() {
    return this.profileForm.get('country');
  }
  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }
  get password() {
    return this.profileForm.get('password');
  }
  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }

  checkPasswords() {
    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ notMatch: true });
    }
  }

  onGetCurrentUserProfile() {
    this._DashService.getCurrentProfile().subscribe({
      next: (res) => {
        this.profileForm.patchValue(res);
        this._UserService.loadImage(res.imagePath, this.files);
      },
      error: (err) => {
      },
      complete: () => {
      },
    });
  }

  onUpdateProfile(data: FormGroup) {
    let formData = new FormData();
    formData.append('userName', data.value.userName);
    formData.append('country', data.value.country);
    formData.append('phoneNumber', data.value.phoneNumber);
    formData.append('email', data.value.email);
    formData.append('password', data.value.password);
    formData.append('confirmPassword', data.value.confirmPassword);
    formData.append('profileImage', this.imgSource);
    this.isLoading = true;
    this._DashService.updateProfile(formData).subscribe({
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
        this.toastr.success('Update Profile Successfully!.', 'Success');
        location.reload();
        this.files = [];
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
