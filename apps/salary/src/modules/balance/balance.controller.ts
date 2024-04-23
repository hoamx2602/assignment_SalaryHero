import { Controller, Get, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, User } from '@app/common';
import { CurrentUser } from 'apps/auth/src/decorators/current-user.decorator';

@ApiTags("balance")
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: "Get user balance information" })
  @Get('/')
  getUserBalance(@CurrentUser() user: User ) {
    const userId = user._id.toString();
    return this.balanceService.getUserBalance(userId);
  }
}
