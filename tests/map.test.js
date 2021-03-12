const ArrayLike = require('../index.js');

describe('Tests for method "map"', () => {
  test('1. Instance has not Own Property map', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'map')).toBeFalsy();
  });

  test('2. Instance has method map', () => {
    const arr = new ArrayLike();
    expect(arr.map).toBeInstanceOf(Function);
  });

  test('3. Map has property lenght which equal 1', () => {
    expect(ArrayLike.prototype.map).toHaveLength(1);
  });

  test('4. Method map returns new array', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.map(() => null)).not.toBe(arr);
    expect(arr.map(() => null)).toBeInstanceOf(ArrayLike);
  });

  test('5. Method map does not change the original array', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.map(() => null);
    expect(arr).toEqual(new ArrayLike(1, 2, 3));
  });

  test('6. Method map returned array with the same length', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    expect(arr.map(() => null)).toHaveLength(4);
  });

  test('7. Method map returns new instance of Array, with value returned from cb on each iteration', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const cb = i => 'R';
    expect(arr.map(cb)[0]).toBe('R');
    expect(arr.map(cb)[3]).toBe('R');
  });

  test('8. Method map provides 3 args to callback function (currentValue, index, array)', () => {
    const mock = jest.fn();
    const arr = new ArrayLike(1, 2, 3, 4);
    arr.map(mock);
    expect(mock).toHaveBeenNthCalledWith(1, 1, 0, arr);
    expect(mock).toHaveBeenNthCalledWith(4, 4, 3, arr);
  });

  test('9. Callback of map must be called with every not empty item of array', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const mock = jest.fn();
    delete arr[1];
    arr.map(mock);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  test('10. Method map replace null, undefined and empty\'s item with comma', () => {
    const arr = new ArrayLike(null, undefined, NaN);
    const cb = i => i;
    const arr2 = arr.map(cb);
    expect(arr2[0]).toBe(null);
    expect(arr2[1]).toBe(undefined);
    expect(arr2[2]).toBe(NaN);
  });

  test('11. Method returns empty items on the place where items will be deleted during method execution', () => {
    const arr = new ArrayLike(1, 2, 3);
    const cb = item => {
      arr.pop();
      return item;
    };

    const arr2 = arr.map(cb);
    expect(arr).toHaveLength(1);
    expect(arr2).toHaveLength(3);
    expect(arr2[1]).toBe(2);
    expect(arr2[2]).toBe(undefined);
  });

  test('12. Method gets optional arg thisArg used as "this" when calling the callback', () => {
    const arr = new ArrayLike(1, 2, 3);
    const obj = { a: 100 };
    const cb = function(item) {
      return item + this.a;
    };

    const arr2 = arr.map(cb, obj);
    expect(arr2[0]).toBe(101);
    expect(arr2[1]).toBe(102);
    expect(arr2[2]).toBe(103);
  });

  test('13. Method call cb for each non-empty element, but not more then length of array(before start) times', () => {
    const arr = new ArrayLike(1, 1, 2);
    let counter = 0;
    const mock = jest.fn(() => {
      if (counter < 3) {
        counter += 1;
        arr.push(1);
      }
    });

    arr.map(mock);
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
