const { run } = require('./script');

describe('Write basic calculator script with TDD', () => {
  describe('add', () => {
    const command = 'add';

    it('Should return 2 for 1 + 1', () => {
      const args = ['1', '1'];
      expect(run(command, args)).toEqual(2);
    });

    it('Should return "too big" if greater than 1000', () => {
      const args = ['1', '1000'];
      expect(run(command, args)).toEqual('too big');
    });

    it('Should return 0 if arguments is empty array', () => {
      const args = [];
      expect(run(command, args)).toEqual(0);
    });
  });

  describe('subtract', () => {
    const command = 'subtract';

    it('Should return 2 for 5 - 3', () => {
      const args = ['5', '3'];
      expect(run(command, args)).toEqual(2);
    });

    it('Should return "negative number" if negative', () => {
      const args = ['0', '1'];
      expect(run(command, args)).toEqual('negative number');
    });
  });

  describe('multiply', () => {
    const command = 'multiply';
    it('Should return 6 if 2 * 3', () => {
      const args = ['2', '3'];
      expect(run(command, args)).toEqual(6);
    });

    it('Should return "big big number" if greater than 1000', () => {
      const args = ['20', '51'];
      expect(run(command, args)).toEqual('big big number');
    });
  });

  describe('divide', () => {
    const command = 'divide';
    it('Should return 5 if 10 / 2', () => {
      const args = ['10', '2'];
      expect(run(command, args)).toEqual(5);
    });

    it('Should return 0 100 2 2 2 2 2', () => {
      const args = ['1', '10000000'];
      expect(run(command, args)).toEqual('it is zero');
    });
  });

  // Assumes inputs are non-negative integers
  describe('Argument validation', () => {
    const command = 'add';
    it('Should be add, multiply, subtract, or divide', () => {
      const invalidCommand = 'invalid';
      const args = ['1', '2'];
      expect(run(invalidCommand, args)).toEqual(new Error('invalid command'));
    });

    it('Should return error when argument is greater than or equal to 31', () => {
      const args = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ];
      expect(run(command, args)).toEqual(new Error('argument too long'));
    });

    it('Should not contain character string', () => {
      const args = ['1', 'not integer'];
      expect(run(command, args)).toEqual(new Error('invalid argument'));
    });

    it('Should not contain floating numbers', () => {
      const args = ['1', '1.1'];
      expect(run(command, args)).toEqual(new Error('invalid argument'));
    });

    it('Should not contain negative numbers', () => {
      const args = ['1', '-1'];
      expect(run(command, args)).toEqual(new Error('invalid argument'));
    });

    it('Should return error argument contains 0 and divide', () => {
      const args = ['0'];
      expect(run('divide', args)).toEqual(new Error('invalid argument'));
    });
  });
});
