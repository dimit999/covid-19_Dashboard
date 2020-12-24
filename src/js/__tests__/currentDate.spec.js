import CurrentDate from '../currentDate';

const currentDate = new CurrentDate();

describe('CurrentDate class tests', () => {
  it('Check that currentDate is instance of CurrentDate class', () => {
    expect(currentDate).toBeInstanceOf(CurrentDate);
  });
});
