/* eslint-disable max-len */
const ArrayLike = require('../index.js');

describe('Tests for method forEach', () => {
  test('1.Instance has not own property forEach', () => {
    const arr = new ArrayLike();

    expect(Object.prototype.hasOwnProperty.call(arr, 'forEach')).toBeFalsy();
  });

  test('2.Instance has method forEach', () => {
    const arr = new ArrayLike();

    expect(arr.forEach).toBeInstanceOf(Function);
  });

  test('3.The length property of forEach method is 1', () => {
    expect(ArrayLike.prototype.forEach).toHaveLength(1);
  });

  test('4.Method returns nothing', () => {
    const arr = new ArrayLike(1, 2, 3, 4);

    expect(arr.forEach(() => 100)).toBeUndefined();
  });

  test('5.It provides 3 arguments to callback function', () => {
    const arr = new ArrayLike(1, 2, 3);
    const callback = jest.fn();
    arr.forEach(callback);

    expect(callback.mock.calls[0]).toHaveLength(3);
    expect(callback.mock.calls[1]).toHaveLength(3);
    expect(callback.mock.calls[2]).toHaveLength(3);
  });

  describe('Arguments in callback function', () => {
    test('5.1.First argument is currentValue', () => {
      const arr = new ArrayLike(1, 2, 3);
      const callback = jest.fn();
      arr.forEach(callback);

      expect(callback.mock.calls[0][0]).toBe(1);
      expect(callback.mock.calls[1][0]).toBe(2);
      expect(callback.mock.calls[2][0]).toBe(3);
    });

    test('5.2.Second argument is currentIndex', () => {
      const arr = new ArrayLike(1, 2, 3);
      const callback = jest.fn();
      arr.forEach(callback);

      expect(callback.mock.calls[0][1]).toBe(0);
      expect(callback.mock.calls[1][1]).toBe(1);
      expect(callback.mock.calls[2][1]).toBe(2);
    });

    test('5.3.Third argument is an array', () => {
      const arr = new ArrayLike(1, 2, 3);
      const callback = jest.fn();
      arr.forEach(callback);

      expect(callback.mock.calls[0][2]).toBe(arr);
      expect(callback.mock.calls[1][2]).toBe(arr);
      expect(callback.mock.calls[2][2]).toBe(arr);
    });
  });

  test('6.It executes callback once for each non-empty value', () => {
    const arr = new ArrayLike(1, -4, null, NaN, '2');
    const callback = jest.fn();
    delete arr[1];
    arr.forEach(callback);

    expect(callback).toHaveBeenCalledTimes(4);
    expect(callback.mock.calls[0][0]).toBe(1);
    expect(callback.mock.calls[1][0]).toBe(null);
    expect(callback.mock.calls[2][0]).toBe(NaN);
    expect(callback.mock.calls[3][0]).toBe('2');
  });

  test('7.It executes callback on items with value undefined', () => {
    const arr = new ArrayLike(1, undefined, 3);
    const callback = jest.fn();
    arr.forEach(callback);

    expect(callback.mock.calls[0][0]).toBe(1);
    expect(callback.mock.calls[1][0]).toBeUndefined();
    expect(callback.mock.calls[2][0]).toBe(3);
  });

  test('8.It uses second argument as this', () => {
    const arr = new ArrayLike(1, 2, 3);
    const arr2 = {};
    const callback = jest.fn(function(el, index) {
      this[index] = el;
    });
    arr.forEach(callback, arr2);

    expect(arr2).toEqual({ 0: 1, 1: 2, 2: 3 });
  });

  test('9.It throws error when callback is undefined', () => {
    const arr = new ArrayLike(1, 2, 3);

    expect(() => arr.forEach()).toThrow(TypeError);
  });

  test('10.It executes callback as many times as original array length, if elements were not deleted during iteration', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const callback = jest.fn(() => {
      arr[arr.length] = 10;
    });
    arr.forEach(callback);

    expect(callback.mock.calls[0][0]).toBe(1);
    expect(callback.mock.calls[1][0]).toBe(2);
    expect(callback.mock.calls[2][0]).toBe(3);
    expect(callback.mock.calls[3][0]).toBe(4);
    expect(callback.mock.calls[4]).toBeUndefined();
  });

  test('11.It call cb for each non-empty element, but not more then length of array(before start) times', () => {
    const arr = new ArrayLike(1, 1, 2);
    let counter = 0;
    const mock = jest.fn(() => {
      if (counter < 3) {
        counter += 1;
        arr.push(1);
      }
    });

    arr.forEach(mock);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
