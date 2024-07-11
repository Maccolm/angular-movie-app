import { BudgetNumberFormatPipe } from './budget-number-format.pipe';

describe('BudgetNumberFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new BudgetNumberFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
