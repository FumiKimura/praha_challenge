function isNonNegativeInteger(str) {
  const num = parseInt(str, 10);
  return !isNaN(num) && num >= 0 && num.toString() === str;
}

function run(command, args) {
  if (args.length > 30) return new Error('argument too long');

  const intArgs = [];
  for (const arg of args) {
    if (!isNonNegativeInteger(arg)) return new Error('invalid argument');
    intArgs.push(parseInt(arg));
  }

  if (command === 'divide' && intArgs.some((arg) => arg === 0))
    return new Error('invalid argument');

  switch (command) {
    case 'add':
      const addResult = intArgs.reduce((total, arg) => (total += arg), 0);
      return addResult > 1000 ? 'too big' : addResult;
    case 'subtract':
      const subtractResult = intArgs.reduce((total, arg) => (total -= arg));
      return subtractResult < 0 ? 'negative number' : subtractResult;
    case 'multiply':
      const multiplyResult = intArgs.reduce((total, arg) => (total *= arg));
      return multiplyResult > 1000 ? 'big big number' : multiplyResult;
    case 'divide':
      const divideResult = intArgs.reduce((total, arg) => (total /= arg));
      return divideResult < 0.000001 ? 'it is zero' : divideResult;
    default:
      return new Error('invalid command');
  }
}

module.exports = { run };
