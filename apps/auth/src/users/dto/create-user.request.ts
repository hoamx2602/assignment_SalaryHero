import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsString()
  company_id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
