import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { UserSalaryConfiguration } from './user_salary_configuration.schema';

@Injectable()
export class UserSalaryConfigurationRepository extends AbstractRepository<UserSalaryConfiguration> {
  protected readonly logger = new Logger(
    UserSalaryConfigurationRepository.name,
  );

  constructor(
    @InjectModel(UserSalaryConfiguration.name)
    userSalaryConfigurationModel: Model<UserSalaryConfiguration>,
    @InjectConnection() connection: Connection,
  ) {
    super(userSalaryConfigurationModel, connection);
  }
}
