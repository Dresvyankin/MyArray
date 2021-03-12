const ArrayLike = require('../index.js');

describe('Test for method "reduce"', () => {
  test('1. Instance has not Own Property reduce', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'reduce')).toBeFalsy();
  });

  test('2. Instance has method reduce', () => {
    const arr = new ArrayLike();
    expect(arr.reduce).toBeInstanceOf(Function);
  });

  test('3. Reduce has property length which equal 1', () => {
    expect(ArrayLike.prototype.reduce).toHaveLength(1);
  });

  test('4. Arr is empty and call reduce without an initial value - throw Error', () => {
    const arr = new ArrayLike();
    expect(() => {
      arr.reduce(() => null);
    }).toThrow(TypeError);
  });

  test('5. Array without items call reduce with initialValue - returns initialValue', () => {
    const arr = new ArrayLike();
    expect(arr.reduce(() => null, 10)).toBe(10);
  });

  test('6. Array with 1 item call reduce without initialValue - returns this item', () => {
    const arr = new ArrayLike('10');
    expect(arr.reduce(() => null)).toBe('10');
  });

  test('7. Method provides 4 args to callback function', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const mock = jest.fn();
    arr.reduce(mock, 0);
    expect(mock.mock.calls[0]).toHaveLength(4);
    expect(mock.mock.calls[3]).toHaveLength(4);
  });

  test('8. Callback of reduce must be called only with not empty item of array and starts from arr[1]', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const mock = jest.fn();
    delete arr[1];
    arr.reduce(mock);
    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).not.toHaveBeenNthCalledWith(1, 1, 2, 1, arr);
  });

  test('9. InitialValue is not provided, then accumulator is equal arr[0], and currentValue is equal arr[1]', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const mock = jest.fn((accum, item) => accum + item);
    arr.reduce(mock);
    expect(mock).toHaveBeenNthCalledWith(1, 1, 2, 1, arr);
    expect(mock).toHaveBeenNthCalledWith(3, 6, 4, 3, arr);
  });

  test('10. Items are deleted during method execution - method does not work with its', () => {
    const arr = new ArrayLike(1, 2, 3);
    const cb = (accum, item) => {
      arr.pop();
      return item;
    };
    expect(arr.reduce(cb)).toBe(2);
  });

  test('11. Method has parameter initialValue = accumulator equals to initialValue', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const mock = jest.fn((accum, item) => accum + item);
    arr.reduce(mock, 100);
    expect(mock).toHaveBeenNthCalledWith(1, 100, 1, 0, arr);
    expect(mock).toHaveBeenNthCalledWith(4, 106, 4, 3, arr);
  });

  test('12. Call cb for each non-empty element, but not more then length of array(before start) times', () => {
    const arr = new ArrayLike(1, 1, 2);
    let counter = 0;
    const mock = jest.fn(() => {
      if (counter < 3) {
        counter += 1;
        arr.push(1);
      }
    });

    arr.reduce(mock);
    expect(mock).toHaveBeenCalledTimes(2);
  });

  describe('13. work with falsy values as initial value', () => {
    let arr = null;
    let mock = null;
    beforeEach(() => {
      arr = new ArrayLike(1, 2, 3);
      mock = jest.fn();
    });

    test('13.1. use undefined as initial value', () => {
      arr.reduce(mock, undefined);
      expect(mock).toHaveBeenNthCalledWith(1, undefined, 1, 0, arr);
    });

    test('13.2. use null as initial value', () => {
      arr.reduce(mock, null);
      expect(mock).toHaveBeenNthCalledWith(1, null, 1, 0, arr);
    });

    test('13.3. use 0 as initial value', () => {
      arr.reduce(mock, 0);
      expect(mock).toHaveBeenNthCalledWith(1, 0, 1, 0, arr);
    });

    test('13.4. use 0n as initial value', () => {
      arr.reduce(mock, 0n);
      expect(mock).toHaveBeenNthCalledWith(1, 0n, 1, 0, arr);
    });

    test('13.5. use "" as initial value', () => {
      arr.reduce(mock, '');
      expect(mock).toHaveBeenNthCalledWith(1, '', 1, 0, arr);
    });

    test('13.6. use false as initial value', () => {
      arr.reduce(mock, false);
      expect(mock).toHaveBeenNthCalledWith(1, false, 1, 0, arr);
    });

    test('13.7. use NaN as initial value', () => {
      arr.reduce(mock, NaN);
      expect(mock).toHaveBeenNthCalledWith(1, NaN, 1, 0, arr);
    });
  });
});
