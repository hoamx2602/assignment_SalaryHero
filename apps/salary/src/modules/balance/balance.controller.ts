import { Body, Controller, Post } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { GetUserBalanceDto } from './dto';

@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Post('/')
  getUserBalance(@Body() getUserBalanceDto: GetUserBalanceDto) {
    return this.balanceService.getUserBalance(getUserBalanceDto);
  }
}
