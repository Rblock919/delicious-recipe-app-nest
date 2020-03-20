import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('signIn')
  @Get('signIn')
  signIn(): string {
    return this.authService.signIn();
  }

  // @Post('signUp')
  @Get('signUp')
  signUp(): string {
    return this.authService.signUp();
  }
}
