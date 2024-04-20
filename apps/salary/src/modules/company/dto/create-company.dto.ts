import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  address: string;

  @IsNumber()
  timezone: number;

  @IsString()
  description: string;
}
