import { IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;
  
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  DOB: string;

  @IsString()
  gender: string;
}