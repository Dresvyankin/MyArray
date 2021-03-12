const ArrayLike = require('../index.js');

describe('Tests for method filter', () => {
  test('1.Instance has not own property filter', () => {
    const arr = new ArrayLike();

    expect(Object.prototype.hasOwnProperty.call(arr, 'filter')).toBeFalsy();
  });

  test('2.Instance has method filter', () => {
    const arr = new ArrayLike();

    expect(arr.filter).toBeInstanceOf(Function);
  });

  test('3.The length property of filter method is 1', () => {
    expect(ArrayLike.prototype.filter).toHaveLength(1);
  });

  test('4.It provides 3 arguments to callback function', () => {
    const arr = new ArrayLike(1, 2, 3);
    const mockCallback = jest.fn();
    arr.filter(mockCallback);

    expect(mockCallback.mock.calls[0]).toHaveLength(3);
    expect(mockCallback.mock.calls[1]).toHaveLength(3);
    expect(mockCallback.mock.calls[2]).toHaveLength(3);
  });

  describe('Arguments in callback function', () => {
    test('4.1.First argument is currentValue', () => {
      const arr = new ArrayLike(1, 2, 3);
      const mockCallback = jest.fn();
      arr.filter(mockCallback);

      expect(mockCallback.mock.calls[0][0]).toBe(1);
      expect(mockCallback.mock.calls[1][0]).toBe(2);
      expect(mockCallback.mock.calls[2][0]).toBe(3);
    });

    test('4.2.Second argument is currentIndex', () => {
      const arr = new ArrayLike(1, 2, 3);
      const mockCallback = jest.fn();
      arr.filter(mockCallback);

      expect(mockCallback.mock.calls[0][1]).toBe(0);
      expect(mockCallback.mock.calls[1][1]).toBe(1);
      expect(mockCallback.mock.calls[2][1]).toBe(2);
    });

    test('4.3.Third argument is an array', () => {
      const arr = new ArrayLike(1, 2, 3);
      const mockCallback = jest.fn();
      arr.filter(mockCallback);

      expect(mockCallback.mock.calls[0][2]).toEqual(new ArrayLike(1, 2, 3));
      expect(mockCallback.mock.calls[1][2]).toEqual(new ArrayLike(1, 2, 3));
      expect(mockCallback.mock.calls[0][2]).toEqual(new ArrayLike(1, 2, 3));
    });
  });

  test('5.It uses second argument as this', () => {
    const arr = new ArrayLike(1, 2, 3);
    const obj = { data: 2 };
    const callback = jest.fn(function(el) {
      return this.data > el;
    });
    const result = arr.filter(callback, obj);

    expect(result).toHaveLength(1);
    expect(result[0]).toBe(1);
  });

  test('6.Returned value is an instance of array', () => {
    const arr = new ArrayLike(1, 2, 3);
    const result = arr.filter(() => null);

    expect(result).toBeInstanceOf(ArrayLike);
  });

  test('7.It returns new array', () => {
    const arr = new ArrayLike(1, 2, 3);
    const callback = jest.fn(() => true);
    const result = arr.filter(callback);

    expect(result).not.toBe(arr);
  });

  test('8.It does not mutate the array on which it is called', () => {
    const arr = new ArrayLike('apple', 'banana', 'grapes');
    arr.filter(el => el.length < 6);

    expect(arr).toEqual(new ArrayLike('apple', 'banana', 'grapes'));
  });

  test('9.It returns empty array when all elements fail test', () => {
    const arr = new ArrayLike(1, 2, 3);
    const result = arr.filter(() => false);

    expect(result).toHaveLength(0);
  });

  test('10.It includes elements in array, when callback returns true', () => {
    const arr = new ArrayLike(1, 2, 3);
    const callback = jest.fn();
    callback.mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const result = arr.filter(num => callback(num));

    expect(result).toHaveLength(2);
  });

  test('11. Call cb for each non-empty element, but not more then length of array(before start) times', () => {
    const arr = new ArrayLike(1, 1, 2);
    let counter = 0;
    const mock = jest.fn(() => {
      if (counter < 3) {
        counter += 1;
        arr.push(1);
      }
    });

    arr.filter(mock);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  test('12.It works with new values of elements if they had been changed during the iteration', () => {
    const arr = new ArrayLike(2, 3, 4);
    const callback = jest.fn((el, index) => {
      arr[index + 1] = '10';
      return true;
    });
    const result = arr.filter(callback);

    expect(result[0]).toBe(2);
    expect(result[1]).toBe('10');
    expect(result[2]).toBe('10');
  });

  test('13.It throws error when cb is undefined', () => {
    const arr = new ArrayLike(1, 2, 3);

    expect(() => arr.filter()).toThrow(TypeError);
  });

  test('14.It doesnt work with empty array', () => {
    const arr = new ArrayLike(5);
    const callback = jest.fn();
    const result = arr.filter(callback);

    expect(result).toHaveLength(0);
  });

  test('15.Callback is not executed on deleted items in array', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    const callback = jest.fn(() => {
      arr.pop();
      return true;
    });
    const result = arr.filter(callback);

    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    expect(result[2]).toBeUndefined();
  });

  test('16.Callback is not executed on empty array items', () => {
    const arr = new ArrayLike(5);
    const callback = jest.fn(() => true);
    arr.filter(callback);

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
