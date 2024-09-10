import { User } from './../../interfaces/user';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  files: File[] = [];
 
  pageId:number=0
  userlist:any
constructor(private _UserService:UserService ,private _ActivatedRoute:ActivatedRoute,){
  this.userform.disable();
  this.pageId=this._ActivatedRoute.snapshot.params['id']
  if(this.pageId){
 this.getuser(this.pageId)
  }
}
userform=new FormGroup({
  userName:new FormControl(null),
  email :new FormControl(null),
  country:new FormControl(null),
  phoneNumber :new FormControl(null),
  imagePath:new FormControl(null),
  
})

  getuser(id:number){
this._UserService.getUserById(id).subscribe({
  next:(res)=>{
this.userlist=res
  },complete:()=> {
    if (this.userlist.imagePath) {
      this._UserService.loadImage(this.userlist.imagePath,this.files);
    }
    this.userform.patchValue({
      userName:this.userlist.userName,
    email:this.userlist.email,
      country:this.userlist.country,
      phoneNumber:this.userlist.phoneNumber ,
     
    })
  },
})
  }


  onSelect(event: any) {
    this.files = [];
    this.files.push(...event.addedFiles);
  
  }
 
}
