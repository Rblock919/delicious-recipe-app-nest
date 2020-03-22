import { Controller, Post, UseGuards, Request } from '@nestjs/common';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterAuthGuard } from './guards/register-auth.guard';
import { AuthService } from './auth.service';

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
}
