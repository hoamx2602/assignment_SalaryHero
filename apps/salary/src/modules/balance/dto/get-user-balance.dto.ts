import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class GetUserBalanceDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
