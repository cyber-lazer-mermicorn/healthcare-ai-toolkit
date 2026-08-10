import { auditLog } from '../lib/healthcare';

describe('auditLog', () => {
  it('should be defined', () => {
    expect(auditLog).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof auditLog).toBe('function');
  });
});
