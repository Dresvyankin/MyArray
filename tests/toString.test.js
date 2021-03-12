const ArrayLike = require('../index.js');

describe('Tests for method "toString"', () => {
  test('1. Instance has not Own Property toString', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'toString')).toBeFalsy();
  });

  test('2. Instance has method toString', () => {
    const arr = new ArrayLike();
    expect(arr.toString).toBeInstanceOf(Function);
  });

  test('3. ToString has property length which equal 0', () => {
    expect(ArrayLike.prototype.toString).toHaveLength(0);
  });

  test('4. Method toString returns string value', () => {
    const arr = new ArrayLike();
    expect(typeof arr.toString()).toBe('string');
  });

  test('5. Array is empty - method returns ""', () => {
    const arr = new ArrayLike();
    expect(arr.toString()).toBe('');
  });

  test('6. Array with empty items - method returns a string with commas', () => {
    const arr = new ArrayLike(5);
    expect(arr.toString()).toBe(',,,,');
  });

  test('7. Array contains values: "null", "undefined" or "empty" - toString returns commas', () => {
    const arr = new ArrayLike(null, 10, undefined, 10);
    delete arr[1];
    expect(arr.toString()).toBe(',,,10');
  });

  test('8. Method trying to convert to primitive each item of array', () => {
    function toString() {
      return '100';
    }

    const arr = new ArrayLike({ name: 'Alex', toString }, 10);
    expect(arr.toString()).toBe('100,10');
  });
});
