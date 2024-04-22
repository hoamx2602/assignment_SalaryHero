import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("company")
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiOperation({ description: "Create new company" })
  @Post('/')
  createNewCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createNewCompany(createCompanyDto);
  }

  @ApiOperation({ description: "Update company information" })
  @Put('/:companyId')
  updateCompanyInformation(@Param('companyId') companyId: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateCompanyInformation(companyId,updateCompanyDto);
  }
}
