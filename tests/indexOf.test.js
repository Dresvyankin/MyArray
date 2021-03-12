const ArrayLike = require('../index.js');

describe.skip('Tests for method "indexOf"', () => {
  test('1. Instance has not Own Property indexOf', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.hasOwnProperty.call(arr, 'indexOf')).toBeFalsy();
  });

  test('2. Instance has method indexOf', () => {
    const arr = new ArrayLike();
    expect(arr.indexOf).toBeInstanceOf(Function);
  });

  test('3. IndexOf has property length which equal 1', () => {
    expect(ArrayLike.prototype.indexOf).toHaveLength(1);
  });

  test('4. Method indexOf returns number', () => {
    const arr = new ArrayLike();
    expect(typeof arr.indexOf()).toBe('number');
  });

  test('5. Method without arguments returns -1', () => {
    const arr = new ArrayLike();
    expect(arr.indexOf()).toBe(-1);
  });

  test('6. Method returns -1 when the second argument more than array`s length or equal', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.indexOf(1, 10)).toBe(-1);
    expect(arr.indexOf(1, 3)).toBe(-1);
  });

  test('7. Method returns -1 when array does not contain item which to apply as first argument', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.indexOf(22)).toBe(-1);
  });

  test('8. Method returns -1 when the second argument less than 0', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.indexOf(1, -1)).toBe(-1);
  });

  test('9. Method always returns -1 with empty array', () => {
    const arr = new ArrayLike();
    expect(arr.indexOf(1, 0)).toBe(-1);
  });

  test('10. Method can be used not only with arrays', () => {
    expect(() => ArrayLike.prototype.indexOf.call({})).not.toThrow();
  });
});
