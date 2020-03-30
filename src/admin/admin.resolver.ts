import { Resolver, Query } from '@nestjs/graphql';

import { User } from '../user/models/user.model';
import { AdminService } from './admin.service';

@Resolver(of => User)
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query(returns => [User], { name: 'users' })
  async getUsers() {
    return this.adminService.getUsers();
  }
}
