import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, User } from '@app/common';
import { CurrentUser } from 'apps/auth/src/decorators/current-user.decorator';
import { WithdrawMoneyDto } from './dto';

@ApiTags("balance")
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ description: "Get user balance information" })
  @Get('/')
  getUserBalance(@CurrentUser() user: User) {
    const userId = user._id.toString();
    return this.balanceService.getUserBalance(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "Withdraw money" })
  @Post('/withdraw')
  withdrawMoney(@Body() withdrawMoneyDto: WithdrawMoneyDto, @CurrentUser() user: User ) {
    return this.balanceService.withdrawMoney(user, withdrawMoneyDto);
  }
}
