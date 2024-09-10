import { Component, Inject } from '@angular/core';
import { UserData } from './../../interfaces/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  constructor(
    public dialogRef: MatDialogRef<BlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
