import { UseGuards, ParseArrayPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { User } from '../user/models/types/user.model';
import { GqlAdminGuard } from '../auth/guards/gql-admin.guard';
import { EditUserInput } from '../user/models/inputs/edit-user.input';
import { EditUserInputValidationPipe } from '../user/pipes/edit-user-input-validation.pipe';
import { AdminService } from './admin.service';

@UseGuards(GqlAdminGuard)
@Resolver(of => User)
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query(returns => [User], { name: 'users' })
  async getUsers(): Promise<User[]> {
    return this.adminService.getUsers();
  }

  @Mutation(returns => String, { name: 'updateUsers' })
  async updateUsersPrivledges(
    @Args(
      'userData',
      { type: () => [EditUserInput] },
      new ParseArrayPipe({ items: EditUserInput }),
      EditUserInputValidationPipe
    )
    userData: EditUserInput[]
  ): Promise<string> {
    return this.adminService.updateUsers(userData);
  }
}
