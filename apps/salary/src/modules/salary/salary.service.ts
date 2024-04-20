import { UserBalance } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SalaryService {
  constructor(
    @InjectModel(UserBalance.name) private userBalanceModel: Model<UserBalance>,
  ) {}
  //TODO: Implement the auth service
  async getSalary(email: string): Promise<UserBalance> {
    return this.userBalanceModel.findOne({
      email,
    });
  }
}
