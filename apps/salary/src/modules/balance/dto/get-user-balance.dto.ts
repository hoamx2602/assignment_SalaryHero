import { IsEmail } from 'class-validator';

export class GetUserBalanceDto {
  @IsEmail()
  email: string;
}
