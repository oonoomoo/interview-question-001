export namespace UserListModel {
  interface UserInfo {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    birthDate: string;
    address: string;
  }

  export interface Response {
    data: UserInfo[];
  }
}

export namespace UsersCreateModel {
  export interface Request {
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    birthDate: string;
  }

  export interface Response {
    message: string;
  }
}
