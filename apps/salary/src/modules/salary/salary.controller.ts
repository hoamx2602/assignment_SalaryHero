import { Body, Controller, Param, Post } from '@nestjs/common';
import { SalaryService } from './salary.service';
import { SalaryConfigurationDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("salary")
@Controller('salaries')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @ApiOperation({ description: "Get salary by email" })
  @Post('/')
  getSalaryByEmail(@Body('email') email: string) {
    return this.salaryService.getSalaryByEmail(email);
  }

  @ApiOperation({ description: "Set salary configuration for user" })
  @Post('/configuration/:companyId')
  userSalaryConfigurations(@Param('companyId') companyId: string, @Body() salaryConfiguration: SalaryConfigurationDto,) {
    return this.salaryService.userSalaryConfigurations(companyId, salaryConfiguration);
  }
}
