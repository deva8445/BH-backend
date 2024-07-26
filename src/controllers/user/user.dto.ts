import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  contact: number;

  @IsString()
  @IsNotEmpty()
  userType: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginInDto {
  @IsNumber()
  @IsNotEmpty()
  contact: number;

  @IsString()
  @MinLength(6)
  password: string;
}
