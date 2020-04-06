import { GqlJwtGuard } from '../guards/gql-jwt.guard';

describe('GqlJwtGuard', () => {
  it('should be defined', () => {
    expect(new GqlJwtGuard()).toBeDefined();
  });
});
