import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from './interface/user.interface';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: (configService: ConfigService) => {
          const schema = UserSchema;
          schema.pre<User>('save', async function(next) {
            if (!this.isModified('password')) {
              return next();
            }

            try {
              const saltRounds = Number.parseInt(
                configService.get<string>('SALT_ROUNDS'),
                10
              );
              this.password = await bcrypt.hash(this.password, saltRounds);
              return next();
            } catch (err) {
              console.log(`err ${err}`);
              return next(err);
            }
          });
          return schema;
        },
        collection: 'users',
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class UserModule {}
