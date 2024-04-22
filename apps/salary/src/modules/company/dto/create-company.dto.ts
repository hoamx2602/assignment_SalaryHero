import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  company_name: string;

  @IsString()
  address: string;

  @IsString()
  description: string;
}
