import { Body, Controller, Param, Post } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryConfigurationDto } from './dto';

@Controller('salaries')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Post('/')
  getSalaryByEmail(@Body('email') email: string) {
    return this.salaryService.getSalaryByEmail(email);
  }

  @Post('/configuration/:companyId')
  userSalaryConfigurations(
    @Param('companyId') companyId: string,
    @Body() salaryConfiguration: SalaryConfigurationDto,
  ) {
    return this.salaryService.userSalaryConfigurations(
      companyId,
      salaryConfiguration,
    );
  }
}
