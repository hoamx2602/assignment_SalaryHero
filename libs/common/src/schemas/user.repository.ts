import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AbstractRepository } from '../database/abstract.repository';
import { User } from './user.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.model.findOne({ email }, {}, { lean: true });

    if (!user) {
      this.logger.warn('User not found!', email);
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async getAllUserByCompany(companyId: string):  Promise<User[]> {
    const users = await this.model.find({
      company_id: companyId
    });

    return users;
  }
}
