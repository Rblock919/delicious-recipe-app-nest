import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ParseArrayPipe,
  UsePipes,
} from '@nestjs/common';

import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { AdminService } from './admin.service';
import { User } from '../user/interface/user.interface';
import { EditUserDto } from '../user/dto/edit-user.dto';

@UseGuards(AdminAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }

  @UsePipes(new ParseArrayPipe({ items: EditUserDto }))
  @Post('updateUsers')
  async updateUsers(
    @Body() editedUsers: EditUserDto[]
  ): Promise<{ message: string }> {
    return this.adminService.updateUsers(editedUsers);
  }
}
