import { Controller, Get, UseGuards } from '@nestjs/common';

import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { AdminService } from './admin.service';
import { User } from '../user/interface/user.interface';

@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }
}
