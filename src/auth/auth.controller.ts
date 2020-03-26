import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterAuthGuard } from './guards/register-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { User } from '../user/interface/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(RegisterAuthGuard)
  @Post('signUp')
  async signUp(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Get('signOut')
  async signOut(@Request() req): Promise<any> {
    return this.authService.logout(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('userData')
  async getUserdata(@Request() req): Promise<User> {
    return this.authService.getUserdata(req.user);
  }
}
