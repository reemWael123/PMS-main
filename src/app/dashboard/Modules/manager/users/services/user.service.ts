import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User, UserData } from '../interfaces/user';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private _HttpClient: HttpClient,
    private _toastr: ToastrService
  ) { }
  
  getUsers(myParams: Params): Observable<User> {
    return this._HttpClient.get<User>(`Users`, { params: myParams });
  }

  getUserById(id: number): Observable<UserData> {
    return this._HttpClient.get<UserData>(`Users/${id}`);
  }

  blockUser(idUser: number): Observable<UserData> {
    return this._HttpClient.put<UserData>(`Users/${idUser}` ,{id : idUser});
  }
  getcurrentUser(): Observable<any> {
    return this._HttpClient.get<any>(`Users/currentUser`);
  }


  imageUrl: any = 'https://upskilling-egypt.com:3003/';
  getImagePath(imagePath: string): string {
    return this.imageUrl + imagePath;
  }
  loadImage(imagePath: string, files: any[]): void {
    // Construct the full URL to the image
    const imageUrl = this.getImagePath(imagePath);

    // Fetch the image
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a File object from the Blob
        const file = new File([blob], 'image.jpg', { type: blob.type });

        // Set the file in the dropzone
        files.push(file);
      })
      .catch((error) => {
        this._toastr.error('Failed to load image');
      });
  }
}
