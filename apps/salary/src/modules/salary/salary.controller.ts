import { Body, Controller, Post } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('/')
  getSalary(@Body('email') email: string) {
    return this.salaryService.getSalary(email);
  }
}
