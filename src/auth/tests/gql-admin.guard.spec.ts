import { GqlAdminGuard } from '../guards/gql-admin.guard';

describe('GqlAdminGuard', () => {
  it('should be defined', () => {
    expect(new GqlAdminGuard()).toBeDefined();
  });
});
