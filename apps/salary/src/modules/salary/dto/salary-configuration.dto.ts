import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SalaryConfigurationDto {
  @ApiProperty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNumber()
  number_working_day: number;

  @ApiProperty()
  @IsNumber()
  base_salary: number;
}
