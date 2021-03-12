const ArrayLike = require('../index.js');

describe.skip('Test case for unshift method', () => {
  test('Instance has not own property unshift', () => {
    const arr = new ArrayLike();
    expect(Object.prototype.isPrototypeOf.call(arr, 'unshift')).toBeFalsy();
  });

  test('Instance has method unshift', () => {
    expect(new ArrayLike().unshift).toBeInstanceOf(Function);
  });

  test('The length of method equal 1', () => {
    expect(ArrayLike.prototype.unshift).toHaveLength(1);
  });

  test('A method returns the length of the array', () => {
    const arr = new ArrayLike();
    let arrLength = arr.unshift(2);
    expect(arrLength).toBe(1);
    arr.unshift(2);
    arr.unshift(2);
    arr.unshift(2);
    arr.unshift(2);
    arrLength = arr.unshift(2);
    expect(arrLength).toBe(6);
  });

  test('Arguments are added at the beginning of the array', () => {
    const arr = new ArrayLike(1, 2, 3);
    arr.unshift('someValue');
    expect(arr[0]).toBe('someValue');
  });

  test('A method with one argument increased length of array by one', () => {
    const arr = new ArrayLike(10, 20, 30);
    arr.unshift(2);
    expect(arr).toHaveLength(4);
    arr.unshift(2);
    arr.unshift(2);
    arr.unshift(2);
    expect(arr).toHaveLength(7);
  });

  test('A method can take multiple values', () => {
    const arr = new ArrayLike(10, 20, 30);
    arr.unshift(2, 3, 4);
    expect(arr[0]).toBe(2);
    expect(arr[3]).toBe(10);
    expect(arr[5]).toBe(30);
  });

  test('Not primitive arguments are passed to the array by reference', () => {
    const obj = { name: 'Dima' };
    const arr = new ArrayLike();
    arr.unshift(obj);
    expect(arr[0]).toBe(obj);
  });

  test('The method called on an empty object will add the property length to this object', () => {
    const obj = {};
    new ArrayLike().unshift.call(obj);
    expect(obj).toHaveLength(0);
  });
});
