import { Body, Controller, Post } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { GetUserBalanceDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("balance")
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({ description: "Get user balance information" })
  @Post('/')
  getUserBalance(@Body() getUserBalanceDto: GetUserBalanceDto) {
    return this.balanceService.getUserBalance(getUserBalanceDto);
  }
}
