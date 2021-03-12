/* eslint-disable max-len */
const ArrayLike = require('../index.js');

describe.skip('Test case for slice method', () => {
  test('Instance has not Own Property slice', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'slice')).toBeFalsy();
  });

  test('Instance has method slice', () => {
    expect(new ArrayLike().slice).toBeInstanceOf(Function);
  });

  test('The length of method equals 2', () => {
    expect(ArrayLike.prototype.slice).toHaveLength(2);
  });

  test('A first argument more than length of array returned empty array', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.slice(4)).toHaveLength(0);
  });

  test('Method without arguments returned copy of array', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.slice()).toEqual(arr);
  });

  test('Returned array started with index wich equal first argument of method', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    const finalArr = arr.slice(2);
    expect(finalArr[0]).toBe(3);
    expect(finalArr[2]).toBe(5);
  });

  test('Use negative numbers to select element from the end of an array', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    expect(arr.slice(-2)[1]).toBe(5);
    expect(arr.slice(-1)[0]).toBe(5);
    expect(arr.slice(-4, 4)[0]).toBe(2);
  });

  test('At undefined first argument will start count with zero index', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    expect(arr.slice(undefined)[0]).toBe(1);
    expect(arr.slice(undefined)[4]).toBe(5);
  });

  test('For object Slice copies object references into the new array. Both the original and new array refer to the same object', () => {
    const obj = { a: 3 };
    const arr = new ArrayLike(obj, '1', 'b');
    const newArray = arr.slice(0, 1);
    expect(newArray[0]).toBe(obj);
  });

  test('Slice work as array.from', () => {
    const res = new ArrayLike().slice.call({ 0: 'string', 1: 0, length: 2 });
    expect(res[0]).toEqual('string');
    expect(res[1]).toEqual(0);
  });

  test('First argument equal of negative length of array should return the same array', () => {
    const arr = new ArrayLike(1, 2, 3);
    const res = arr.slice(-arr.length);
    expect(res).toEqual(arr);
  });

  test('At second negative argument`s, method start count from the end of the sequence', () => {
    const res = new ArrayLike(1, 2, 3, 4, 5, 6, 7).slice(1, -3);
    const res1 = new ArrayLike(1, 2, 3, 4, 5, 6, 7).slice(0, -1);
    const res2 = new ArrayLike(1, 2, 3, 4, 5, 6, 7).slice(3, -2);
    expect(res).toEqual(new ArrayLike(2, 3, 4));
    expect(res1).toEqual(new ArrayLike(1, 2, 3, 4, 5, 6));
    expect(res2).toEqual(new ArrayLike(4, 5));
  });

  test('At second non valid argument returned empty array ', () => {
    const res = new ArrayLike(1, 2, 3, 4).slice(0, 'qwer');
    const res1 = new ArrayLike(1, 2, 3, 4).slice(0, { name: 'john' });
    const res2 = new ArrayLike(1, 2, 3, 4).slice(0, new ArrayLike(1, 2));
    expect(res).toHaveLength(0);
    expect(res1).toHaveLength(0);
    expect(res2).toHaveLength(0);
  });

  test('A method must works with arguments which can be converted to integer', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const arrSecond = arr.slice('0', [2]);
    const arrThird = arr.slice('1', [3]);
    expect(arrSecond[1]).toBe(2);
    expect(arrThird[1]).toBe(3);
  });

  test('When the second argument is greater than the length of the array, will select elements to the end of the array', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const arrSecond = arr.slice(0, 100);
    expect(arrSecond[3]).toBe(4);
    expect(arrSecond).toHaveLength(4);
  });

  test('Must return copy of elements from the array', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 5);
    const newArray = arr.slice(0, 3);
    expect(newArray[0]).toBe(1);
    expect(newArray[1]).toBe(2);
    expect(newArray[2]).toBe(3);
    expect(newArray).toHaveLength(3);
  });

  test('A method with a non valid argument returns a new array with the same elements', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    const arrSecond = arr.slice({ name: 'john' });
    expect(arrSecond[0]).toBe(1);
    expect(arrSecond[2]).toBe(3);
    expect(arrSecond[3]).toBe(4);
  });

  test('A method always create and return a new array', () => {
    const arr = new ArrayLike(1, 2, 3);
    expect(arr.slice()).toEqual(arr);
    expect(arr.slice()).not.toBe(arr);
  });

  test('Should not mutate the original array', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    arr.slice(1, 2);
    expect(arr[0]).toBe(1);
    expect(arr[3]).toBe(4);
  });
});
