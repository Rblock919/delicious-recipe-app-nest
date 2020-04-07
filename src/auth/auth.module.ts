import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminStrategy } from './strategies/admin.strategy';
import { UserModule } from '../user/user.module';
import { LoginSchema } from './schemas/login.schema';

@Module({})
export class AuthModule {
  static forRoot(secret: string): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        UserModule,
        PassportModule,
        MongooseModule.forFeature([
          { name: 'Login', schema: LoginSchema, collection: 'logins' },
        ]),
        JwtModule.register({
          secret,
          signOptions: { expiresIn: '7200s' },
        }),
      ],
      providers: [AuthService, JwtStrategy, AdminStrategy, AuthResolver],
      controllers: [],
    };
  }
}
