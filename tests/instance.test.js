const ArrayLike = require('../index.js');

describe('Tests for instance', () => {
  test('1. Created object is an instance of a class', () => {
    expect(new ArrayLike()).toBeInstanceOf(ArrayLike);
  });

  test('2. Instance has property length which equal 0', () => {
    expect(new ArrayLike()).toHaveLength(0);
  });

  test('3. Instance does not have any own properties', () => {
    const arr = new ArrayLike();
    expect(Object.keys(arr)).toHaveLength(0);
  });

  test('4. Instance is a prototype of Array', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(ArrayLike, arr));
  });

  test('5. __proto__ have only declarated method and constructor', () => {
    const arr = new ArrayLike();
    expect(Object.getPrototypeOf(arr)).toEqual(ArrayLike.prototype);
  });

  test('6. The first item is always at position 0', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    expect(arr[0]).toBe(1);
  });

  test('7. By default last item of array is equal array\'s length - 1', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    expect(arr[3]).toBe(4);
  });

  test('8. Property length of the array can be assigned', () => {
    const arr = new ArrayLike(10);
    arr.length = 5;
    expect(arr).toHaveLength(5);
  });

  test('9. Explicit array`s length changes the array', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.length = 2;
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBeUndefined();
    arr.length = 5;
    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
    expect(arr[2]).toBeUndefined();
    expect(arr[3]).toBeUndefined();
    expect(arr[4]).toBeUndefined();
  });

  test('10. Property length is assigned value which js can not primitive to number - throw Error', () => {
    const arr = new ArrayLike();
    expect(() => {
      arr.length = 'string';
    }).toThrow(RangeError);
    expect(() => {
      arr.length = {};
    }).toThrow(RangeError);
    expect(() => {
      arr.length = undefined;
    }).toThrow(RangeError);
  });

  describe('Assigning new element by key', () => {
    test('10.1 which equals more than array length change array length', () => {
      const arr = new ArrayLike(1, 2, 3);
      arr[10] = 4;

      expect(arr).toHaveLength(11);
      expect(arr[0]).toBe(1);
      expect(arr[2]).toBe(3);
      expect(arr[10]).toBe(4);
    });

    test('10.2 which is negative number - add element as object property', () => {
      const arr = new ArrayLike(1, 2, 3);
      arr[-2] = 4;

      expect(arr).toHaveLength(3);
      expect(arr[0]).toBe(1);
      expect(arr[2]).toBe(3);
      expect(arr[-2]).toBe(4);
    });

    test('10.3 which in array length range add this element - reassign this element', () => {
      const arr = new ArrayLike(1, 2, 3);
      arr[1] = 4;

      expect(arr).toHaveLength(3);
      expect(arr[0]).toBe(1);
      expect(arr[1]).toBe(4);
      expect(arr[2]).toBe(3);
    });

    test('10.4 which can be converted to number and bigger'
      + 'than array length - add this element and cahnge array length', () => {
      const arr = new ArrayLike(1, 2, 3);
      arr['10'] = 4;

      expect(arr).toHaveLength(11);
      expect(arr[0]).toBe(1);
      expect(arr[2]).toBe(3);
      expect(arr[5]).toBeUndefined();
      expect(arr[10]).toBe(4);
    });

    test('10.5 which can\'t be converted to number - add element as object property', () => {
      const arr = new ArrayLike(1, 2, 3);
      arr['str'] = 4;
      expect(arr).toHaveLength(3);
      expect(arr[0]).toBe(1);
      expect(arr[2]).toBe(3);
      expect(arr['str']).toBe(4);
    });
  });
});
