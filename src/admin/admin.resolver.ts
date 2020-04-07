import { UseGuards, ParseArrayPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '../user/models/types/user.model';
import { GqlAdminGuard } from '../auth/guards/gql-admin.guard';
import { EditUserInput } from '../user/models/inputs/edit-user.input';
import { AdminService } from './admin.service';

@UseGuards(GqlAdminGuard)
@Resolver(of => User)
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query(returns => [User], { name: 'users' })
  async getUsers() {
    return this.adminService.getUsers();
  }

  @Mutation(returns => String, { name: 'updateUsers' })
  async updateUsersPrivledges(
    @Args(
      'editedUsers',
      { type: () => [EditUserInput] },
      new ParseArrayPipe({ items: EditUserInput })
    )
    userData: EditUserInput[]
  ) {
    return this.adminService.updateUsers(userData);
  }
}
