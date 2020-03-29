import { ObjectIdValidationPipe } from '../pipes/object-id-validation.pipe';

describe('ObjectIdPipe', () => {
  it('should be defined', () => {
    expect(new ObjectIdValidationPipe()).toBeDefined();
  });
});
