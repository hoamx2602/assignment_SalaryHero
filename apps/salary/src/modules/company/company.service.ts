import { Company, CompanyRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}
  async createNewCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.create(createCompanyDto);
  }

  async updateCompanyInformation(
    companyId: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyRepository.findOneAndUpdate(
      {
        _id: companyId,
      },
      {
        $set: {
          ...updateCompanyDto,
        },
      },
    );
  }
}
