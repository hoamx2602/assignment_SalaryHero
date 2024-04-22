import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class SalaryConfigurationDto {
  @ApiProperty()
  @IsEmail()
  user_email: string;

  @ApiProperty()
  @IsNumber()
  number_working_day: number;

  @ApiProperty()
  @IsNumber()
  base_salary: number;
}
