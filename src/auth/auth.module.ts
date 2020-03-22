import { Module, DynamicModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminStrategy } from './strategies/admin.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RegisterStrategy } from './strategies/register.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({})
export class AuthModule {
  static forRoot(secret: string): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret,
          signOptions: { expiresIn: '7200s' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        RegisterStrategy,
        JwtStrategy,
        AdminStrategy,
      ],
      controllers: [AuthController],
    };
  }
}
