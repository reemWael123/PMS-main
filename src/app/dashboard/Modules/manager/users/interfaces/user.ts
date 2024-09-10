export interface UserData {
  country: string;
  creationDate: Date;
  email: string;
  id: number;
  imagePath: any;
  isActivated: boolean;
  modificationDate: Date;
  phoneNumber: string;
  userName: string;
}

export interface User {
  data: UserData[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}
