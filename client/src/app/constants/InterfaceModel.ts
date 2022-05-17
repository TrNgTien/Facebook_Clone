export interface IJwtDecode {
  id: string;
  iat: number;
  role: number;
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
