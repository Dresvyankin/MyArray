const ArrayLike = require('../index.js');

describe.skip('test cases for method "shift"', () => {
  test('1. instance has not Own Property shift', () => {
    const arr = new ArrayLike();

    expect(Object.prototype.isPrototypeOf.call(arr, 'shift')).toBeFalsy();
  });

  test('2. instance has method shift', () => {
    const arr = new ArrayLike();

    expect(arr.shift).toBeInstanceOf(Function);
  });

  test('3. length of "shift" should be 0', () => {
    expect(ArrayLike.prototype.shift).toHaveLength(0);
  });

  test('4. should return deleted element', () => {
    const arr = new ArrayLike('str', 2);

    expect(arr.shift()).toBe('str');
  });

  test('5. should return undefined if array length is 0', () => {
    const arr = new ArrayLike();

    expect(arr.shift()).toBeUndefined();
  });

  test('6. should remove the first element', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.shift();

    expect(arr[0]).toBe(2);
    expect(arr[1]).toBe(3);
  });

  test('7. array length should be decreased by 1', () => {
    const arr = new ArrayLike(5, 10, 100);
    arr.shift();

    expect(arr).toHaveLength(2);
  });

  test('8. element of array with index 1 after shifting should be placed on index 0', () => {
    const arr = new ArrayLike(1, 'str', 3);
    arr.shift();

    expect(arr[0]).toBe('str');
  });

  test('9. doesn\'t throw an Error when called with primitives', () => {
    const arr = new ArrayLike();
    const shiftWrap = () => {
      arr.shift.call(1);
    };

    expect(shiftWrap).not.toThrow();
  });

  test('10. method can be used on objects', () => {
    const obj = {};
    const arr = new ArrayLike();
    const shiftWrap = arr.shift.bind(obj);

    expect(shiftWrap).not.toThrow();
  });

  test('11. called on an empty object with no arguments add to this object length property with a value of 0', () => {
    const obj = {};
    const arr = new ArrayLike();
    arr.shift.call(obj);

    expect(obj).toHaveProperty('length', 0);
  });
});
