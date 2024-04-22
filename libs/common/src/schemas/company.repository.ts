import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Company } from './company.schema';

@Injectable()
export class CompanyRepository extends AbstractRepository<Company> {
  protected readonly logger = new Logger(CompanyRepository.name);

  constructor(
    @InjectModel(Company.name) companyModel: Model<Company>,
    @InjectConnection() connection: Connection,
  ) {
    super(companyModel, connection);
  }

  async getCompaniesByTimezones(timezone: number): Promise<Company[]> {
    const companies = await this.model.find({
      timezone
    });

    return companies;
  }
}
