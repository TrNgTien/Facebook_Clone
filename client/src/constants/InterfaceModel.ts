export interface IJwtDecode {
  id: string;
  iat: number;
  role: number;
  exp: number;
}
interface IIntro {
  currentCity: string;
  currentEducation: string;
  currentJob: string;
  hometown: string;
  relationship: string;
}
export interface IUser {
  DOB: string;
  biography: string;
  firstName: string;
  lastName: string;
  gender: string;
  userAvatar: string;
  userCover: string;
  userName: string;
  userType: number;
  _id: string;
  __v: number;
  password: string;
  intro: Array<IIntro>;
  hobbies: Array<string>;
}
export interface IShowPass {
  showPassword: Boolean;
}
export interface IUserData {
  DOB: string;
  biography: string;
  firstName: string;
  friends: [];
  gender: string;
  hobbies: [];
  intro: {
    currentJob: string;
    currentEducation: string;
    currentCity: string;
    hometown: string;
    relationship: string;
  };
  lastName: string;
  password: string;
  userAvatar: {
    url: string;
    public_id: string;
  };
  userCover: {
    url: string;
    public_id: string;
  };
  userName: string;
  userType: number;
  __v: number;
  _id: string;
}
