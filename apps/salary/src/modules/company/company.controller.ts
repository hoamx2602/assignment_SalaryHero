import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('/')
  createNewCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createNewCompany(createCompanyDto);
  }

  @Put('/:companyId')
  updateCompanyInformation(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateCompanyInformation(
      companyId,
      updateCompanyDto,
    );
  }
}
