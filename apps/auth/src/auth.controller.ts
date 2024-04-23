import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { EVENT_VALIDATE_USER, User } from '@app/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: "Login" })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(EVENT_VALIDATE_USER)
  async validateUser(@CurrentUser() user: User) {
    return user;
  }
}
