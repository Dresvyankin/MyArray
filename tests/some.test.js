const ArrayLike = require('../index.js');

describe.skip('Tests for method "some"', () => {
  test('1. Instance has not Own Property some', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'some')).toBeFalsy();
  });

  test('2. Instance has method some', () => {
    const arr = new ArrayLike();
    expect(arr.some).toBeInstanceOf(Function);
  });

  test('3. Some has property lenght which equal 1', () => {
    expect(ArrayLike.prototype.some).toHaveLength(1);
  });

  test('4. Method some returns boolean type', () => {
    const arr = new ArrayLike();
    expect(typeof arr.some(() => null)).toBe('boolean');
  });

  test('5. Method some does not change orgignal arr', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    arr.some(() => null);
    expect(arr).toEqual(new ArrayLike(1, 2, 3, 4));
  });

  test('6. Method some with empty array returns false', () => {
    const arr = new ArrayLike();
    expect(arr.some(() => null)).toBeFalsy();
  });

  test('7. Method some provides 3 arguments to callback function (item, index, array)', () => {
    const mock = jest.fn();
    const arr = new ArrayLike(1, 2, 3);
    arr.some(mock);
    expect(mock).toHaveBeenNthCalledWith(1, 1, 0, arr);
    expect(mock).toHaveBeenNthCalledWith(3, 3, 2, arr);
  });

  test('8. Callback of some must be called with every not empty item of array', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const mock = jest.fn();
    delete arr[1];
    arr.some(mock);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  test('9. Method some returns false when callback does not find true value', () => {
    const arr = new ArrayLike(1, 1, 1, 1);
    expect(arr.some(() => null)).toBeFalsy();
  });

  test('10. Method returns true when callback finds the first true value', () => {
    const arr = new ArrayLike(1, 2, 3);
    const cb = () => true;
    expect(arr.some(cb)).toBeTruthy();
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

    arr.some(mock);
    expect(mock).toHaveBeenCalledTimes(3);
  });

  test('12. Method gets optional arg thisArg used as "this" when calling the callback', () => {
    const arr = new ArrayLike(1, 2, 3);
    const obj = { a: 2 };
    const cb = function(item) {
      return item === this.a;
    };

    const arr2 = arr.some(cb, obj);
    expect(arr2).toBeTruthy();
  });
});
