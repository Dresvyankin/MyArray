/* eslint-disable max-len */
const ArrayLike = require('../index.js');

describe.skip('Tests for method "sort"', () => {
  test('01. instance has not Own Property "sort"', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'sort')).toBeFalsy();
  });

  test('02. instance has method "sort"', () => {
    const arr = new ArrayLike();
    expect(arr.sort).toBeDefined();
  });

  test('03. method "sort" change arr in the place', () => {
    const arr = new ArrayLike(5, 8, 9, 1, 6);
    arr.sort();
    expect(arr.sort()).toBe(arr);
    expect(arr[0]).toBe(1);
    expect(arr[2]).toBe(6);
    expect(arr[4]).toBe(9);
  });

  test('04. should be sorted by Unicode when method is called without callback', () => {
    const arr1 = new ArrayLike(7, 44, 303, 1, 12, 5);
    arr1.sort();
    expect(arr1[0]).toBe(1);
    expect(arr1[5]).toBe(7);

    const arr2 = new ArrayLike('sdf', 'ABC', '*+', 'D23');
    arr2.sort();
    expect(arr2[0]).toEqual('*+');
    expect(arr2[3]).toEqual('sdf');
  });

  test('05. sorted array should be reversed when callback function always returns negative value', () => {
    const arr1 = new ArrayLike('srt5', 'tr21', 'ab2', 'avre3');
    arr1.sort(() => -1);
    expect(arr1[0]).toBe('avre3');
    expect(arr1[3]).toBe('srt5');

    const arr2 = new ArrayLike(45, 6, 67, 98);
    arr2.sort(() => -1);
    expect(arr2[0]).toBe(98);
    expect(arr2[3]).toBe(45);

    const arr3 = new ArrayLike('srt5', { age: 4 }, null, NaN);
    arr3.sort(() => -1);
    expect(arr3[0]).toBe(NaN);
    expect(arr3[3]).toBe('srt5');
  });

  test('06. shouldn`t be the array sorted when callback function returns 0', () => {
    const arr1 = new ArrayLike('srt5', 'tr21', 'ab2', 'avre3');
    arr1.sort(() => 0);
    expect(arr1).toStrictEqual(new ArrayLike('srt5', 'tr21', 'ab2', 'avre3'));

    const arr2 = new ArrayLike(2334, 544, 84, 999999);
    arr2.sort(() => 0);
    expect(arr2).toStrictEqual(new ArrayLike(2334, 544, 84, 999999));

    const arr3 = new ArrayLike('srt5', { age: 4 }, null, NaN);
    arr3.sort(() => 0);
    expect(arr3).toStrictEqual(new ArrayLike('srt5', { age: 4 }, null, NaN));
  });

  test('07. the length property of the "sort" method should be 1', () => {
    expect(ArrayLike.prototype.sort).toHaveLength(1);
  });

  test('08. method "sort" expect 2 arguments for the callback function', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5, 6);
    const callback = jest.fn();
    arr.sort(callback);
    expect(callback).toHaveBeenNthCalledWith(1, 2, 1);
    expect(callback).toHaveBeenNthCalledWith(5, 6, 5);
  });

  test('09. callback should be executed one time less than the length of the array when the callback was passed', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    const callback = jest.fn();
    arr.sort(callback);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  test('10. method moves empty values ​​to the end', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    delete arr[2];
    arr.sort();
    expect(arr[4]).toBeUndefined();
  });
  test('11. call cb for each non-empty element, but not more then length - 1 of array(before start) times', () => {
    const arr = new ArrayLike(1, 1, 2);
    let counter = 0;
    const mock = jest.fn(() => {
      if (counter < 3) {
        counter += 1;
        arr.push(1);
      }
    });

    arr.sort(mock);
    expect(mock).toHaveBeenCalledTimes(2);
  });
});
