const ArrayLike = require('../index.js');

describe('Test case for array\'s costructor', () => {
  test('A call without arguments returns an empty array', () => {
    expect(new ArrayLike()).toHaveLength(0);
  });

  test('A call with a numeric argument returns an empty Array with a length equal to this argument', () => {
    const arr = new ArrayLike(100);
    expect(arr).toHaveLength(100);
    expect(arr[0]).toBeUndefined();
  });

  test('A call with 2 or more arguments returns an Array with these arguments as elements', () => {
    const arr = new ArrayLike({ name: 'Eva' }, 'string');
    expect(arr[0]).toEqual({ name: 'Eva' });
    expect(arr[1]).toBe('string');
  });

  test('A call with a non-numeric argument returns an Array with this argument as element of Array', () => {
    const arr = new ArrayLike('string');
    expect(arr[0]).toBe('string');
    expect(arr).toHaveLength(1);

    const arrSecond = new ArrayLike({ name: 'Jack' });
    expect(arrSecond[0]).toEqual({ name: 'Jack' });
    expect(arrSecond).toHaveLength(1);
  });

  describe('Test case with non valid arguments. Throw Error when call with ', () => {
    test('A negative number', () => {
      expect(() => new ArrayLike(-1)).toThrow(new RangeError('Invalid array length'));
    });

    test('One number argument wich bigger than 2**32-1', () => {
      expect(() => new ArrayLike(2 ** 32)).toThrow(new RangeError('Invalid array length'));
    });

    test('NaN', () => {
      expect(() => new ArrayLike(NaN)).toThrow(new RangeError('Invalid array length'));
    });

    test('Infinity', () => {
      expect(() => new ArrayLike(Infinity)).toThrow(new RangeError('Invalid array length'));
    });
  });

  test('Length of method equal 1', () => {
    expect(ArrayLike.prototype.constructor).toHaveLength(1);
  });

  test('Creates new array object when called as a function', () => {
    // eslint-disable-next-line new-cap
    const arr = ArrayLike(1, 2, 3);
    const arrSecond = new ArrayLike(1, 2, 3);
    expect(arr).toStrictEqual(arrSecond);
  });

  test('Length of array shouldn\'t be enumerable', () => {
    const arr = new ArrayLike(1, 2, 3);
    const arrKeys = Object.keys(arr);
    expect(arrKeys).toHaveLength(3);
  });

  test('Non-primitive arguments are passed to the array by reference', () => {
    const obj = { name: 'Eva' };
    const arr = new ArrayLike(obj, 'string');
    expect(arr[0]).toBe(obj);
  });
});
