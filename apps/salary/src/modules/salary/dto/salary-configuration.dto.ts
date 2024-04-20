import { IsEmail, IsNumber } from 'class-validator';

export class SalaryConfigurationDto {
  @IsEmail()
  user_email: string;

  @IsNumber()
  number_working_day: number;

  @IsNumber()
  base_salary: number;
}
