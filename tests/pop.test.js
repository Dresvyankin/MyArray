/* eslint-disable max-len */
const ArrayLike = require('../index.js');

describe('Tests for method "pop"', () => {
  test('01. instance has not Own Property "pop"', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'pop')).toBeFalsy();
  });

  test('02. instance has method "pop"', () => {
    const arr = new ArrayLike();
    expect(arr.pop).toBeDefined();
  });

  test('03. method "pop" return removing element', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.pop()).toBe(3);
  });

  test('04. method removes the last element from the array', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.pop();
    expect(arr[2]).toBeUndefined();
  });

  test('05. should return undefined when using the method on an empty array', () => {
    const arr = new ArrayLike();
    expect(arr.pop()).toBeUndefined();
  });

  test('06. amount of items after "pop" should be one less than it was', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    arr.pop();
    expect(arr).toHaveLength(4);
  });

  test('07. the length of the array shouldn`t change when the "pop" method is used for an empty array', () => {
    const arr = new ArrayLike();
    arr.pop();
    expect(arr).toHaveLength(0);
  });

  test('08. the length property should be added to the object with a value - 0 when the method was used on an empty object without arguments', () => {
    const arr = new ArrayLike();
    const obj = {};
    arr.pop.call(obj);
    expect(obj).toHaveProperty('length', 0);
  });

  test('09. method don`t apply any arguments', () => {
    expect(ArrayLike.prototype.pop).toHaveLength(0);
  });

  test('10. method can be used on objects', () => {
    const arr = new ArrayLike();
    const obj = { 0: 1, 1: 2, length: 2 };
    arr.pop.call(obj);
    expect(obj).toStrictEqual({ 0: 1, length: 1 });
  });
});
