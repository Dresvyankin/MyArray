const ArrayLike = require('../index.js');

describe('Tests for method push', () => {
  test('1.Instance has not own property push', () => {
    const arr = new ArrayLike();

    expect(Object.prototype.isPrototypeOf.call(arr, 'push')).toBeFalsy();
  });

  test('2.Instance has method push', () => {
    const arr = new ArrayLike();

    expect(arr.push).toBeInstanceOf(Function);
  });

  test('3.The length property of push method is 1', () => {
    expect(ArrayLike.prototype.push).toHaveLength(1);
  });

  test('4.It returns array length', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4, 5);
    const arr2 = new ArrayLike(0);
    arr1.push(4);
    arr2.push(4, 5, 6);

    expect(arr1).toHaveLength(6);
    expect(arr2).toHaveLength(3);
  });

  test('5.It adds item in the end of array', () => {
    const arr1 = new ArrayLike(1, 2, 3);
    const arr2 = new ArrayLike(0);
    arr1.push(4);
    arr2.push(5, 6);

    expect(arr1[3]).toBe(4);
    expect(arr2[0]).toBe(5);
    expect(arr2[1]).toBe(6);
  });

  test('6.Method without arguments doesn\'t change array', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.push();
    arr.push();
    arr.push();

    expect(arr[0]).toBe(1);
    expect(arr[2]).toBe(3);
  });

  test('7.Method increase array as much, as amount of pushed items', () => {
    const arr1 = new ArrayLike(1, 2, 3);
    const arr2 = new ArrayLike(0);
    arr1.push(4, 5, 6);
    arr2.push(0, 10, 100, 5, -1, 100, 'arr');

    expect(arr1).toHaveLength(6);
    expect(arr2).toHaveLength(7);
  });

  test('8.Method should be used on object', () => {
    const arr = new ArrayLike();
    const obj = { length: 1 };
    arr.push.call(obj, 1, 3);

    expect(obj).toEqual({ 1: 1, 2: 3, length: 3 });
  });

  test('9.Method used on object without number length property', () => {
    const arr = new ArrayLike();
    const obj = { length: 'something' };
    arr.push.call(obj, 2);

    expect(obj[0]).toBe(2);
    expect(obj).toHaveLength(1);
  });

  test('10.Empty object recive length property 0, when method used on this object without arguments', () => {
    const arr = new ArrayLike();
    const obj = {};
    arr.push.call(obj);

    expect(obj).toHaveLength(0);
  });

  test('11.Order of items in array doesn\'t change after push', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.push(4, 5);

    expect(arr[0]).toBe(1);
    expect(arr[2]).toBe(3);
    expect(arr[4]).toBe(5);
  });

  test('12.Array takes a reference on object when push it', () => {
    const arr = new ArrayLike();
    const obj = { name: 'a' };
    arr.push(obj);

    expect(arr[0]).toBe(obj);
  });

  test('13.It works with null, NaN, undefined', () => {
    const arr = new ArrayLike();
    arr.push(null, NaN, undefined);

    expect(arr[0]).toBe(null);
    expect(arr[1]).toBe(NaN);
    expect(arr[2]).toBe(undefined);
  });

  test.todo('14.Throw error on argument length more than 2**53-1');

  test('15.It takes multiple parameters', () => {
    const arr1 = new ArrayLike();
    arr1.push('NaN', NaN, 1, 10, -1, undefined, null);

    expect(arr1[0]).toBe('NaN');
    expect(arr1[6]).toBe(null);
    expect(arr1[4]).toBe(-1);
  });
});
