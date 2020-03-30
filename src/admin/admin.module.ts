import { Module } from '@nestjs/common';

import { AdminService } from './admin.service';
import { AdminResolver } from './admin.resolver';
import { AdminController } from './admin.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [AdminService, AdminResolver],
  controllers: [AdminController],
})
export class AdminModule {}
