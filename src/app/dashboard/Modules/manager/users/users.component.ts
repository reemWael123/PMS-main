import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { User, UserData } from './interfaces/user';
import { BlockComponent } from './components/block/block.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  headArray = [
    { headName: 'Username', keyName: 'userName' },
    { headName: 'Email', keyName: 'email' },
    { headName: 'Country', keyName: 'country' },
    { headName: 'Phone Number', keyName: 'phoneNumber' },
    { headName: 'Status', keyName: 'isActivated' },
    { headName: 'Creation Date', keyName: 'creationDate' },
    { headName: 'Modification Date', keyName: 'modificationDate' },
    {
      headName: 'Actions',
      keyName: 'actions',
      actionsData: [
        { key: 'view', icon: 'visibility' },
        { key: 'block', icon: 'block' },
      ],
    },
  ];
  usersList: User;
  searchKey: string = '';
  searchType: string = '';
  role: string = '';
  resMsg: any;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  pageEvent: PageEvent;

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    public dialog: MatDialog,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageIndex + 1,
      [this.searchType]: this.searchKey,
      groups: this.role,
    };
    this._UserService.getUsers(params).subscribe({
      next: (res) => {
        this.usersList = res;
      },
    });
  }

  reset() {
    this.searchKey = '';
    this.searchType = '';
    this.role = '';
    this.getUsers();
  }

  onActionClick(action: string, user: UserData) {
    switch (action) {
      case 'block':
        this.blockUser(user);
        break;
      case 'view':
        this.viewUser(user);
        break;
    }
  }

  viewUser(user: UserData) {
    this._Router.navigate(['/dashboard/manager/users/view', user.id]);
  }

  blockUser(user: UserData) {
    this.openDialog(user);
  }

  openDialog(data: UserData): void {
    const dialogRef = this.dialog.open(BlockComponent, {
      data: data,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._UserService.blockUser(result).subscribe({
          next: (res) => {
            this.resMsg = res;
          },
          error: (err) => {
          },
          complete: () => {
            if (this.resMsg.isActivated == false) {
              this._ToastrService.success('Block user successful', 'Success');
            } else {
              this._ToastrService.success(
                'Un Block user successful',
                'Success'
              );
            }
            this.getUsers();
          },
        });
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getUsers();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }
  
}
