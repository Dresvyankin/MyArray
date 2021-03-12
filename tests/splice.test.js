
const ArrayLike = require('../index.js');

describe.skip('Tests for method splice', () => {
  test('1.Instance has not own property splice', () => {
    const arr = new ArrayLike();

    expect(Object.prototype.isPrototypeOf.call(arr, 'splice')).toBeFalsy();
  });

  test('2.Instance has method splice', () => {
    const arr = new ArrayLike();

    expect(arr.splice).toBeInstanceOf(Function);
  });

  test('3.The length property of splice method is 2', () => {
    expect(ArrayLike.prototype.splice).toHaveLength(2);
  });

  test('4.Instance returns array', () => {
    const arr = new ArrayLike(1, 2, 3, 4);

    expect(arr.splice(0, 1)).toBeInstanceOf(ArrayLike);
  });

  test('5.It returns array of deleted items', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);
    const arr2 = new ArrayLike(0, 5, null, undefined, NaN, 'arr');
    const res1 = arr1.splice(0, 2);
    const res2 = arr2.splice(0, 5);

    expect(res1[0]).toBe(1);
    expect(res1[1]).toBe(2);
    expect(res2[0]).toBe(0);
    expect(res2[2]).toBe(null);
    expect(res2[4]).toBe(NaN);
  });

  test('6.It returns empty array when second argumnet is equal to 0', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);
    const arr2 = new ArrayLike(1, 2, 3, 4, 'a', 6, 7, 8, 9, 10);

    expect(arr1.splice(3, 0)).toHaveLength(0);
    expect(arr2.splice(-1, 0)).toHaveLength(0);
  });

  test('7.When first argument is negative, start countig from the end', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);
    const arr2 = new ArrayLike(5, 6, 7, 8, null, '123', 10, 17, 10, 0);
    const res1 = arr1.splice(-2, 3);
    const res2 = arr2.splice(-3, 2);

    expect(res1[0]).toBe(3);
    expect(res1[1]).toBe(4);
    expect(res2[0]).toBe(17);
    expect(res2[1]).toBe(10);
  });

  test('8.When second argument is 0, original array doesn\'t change', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);
    arr1.splice(-2, 0);

    expect(arr1).toEqual(new ArrayLike(1, 2, 3, 4));
  });

  test('9.When second argument wasn\'t given, delete all elements after given index', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    const arr2 = new ArrayLike(1, 2, 3);
    arr1.splice(8);
    arr2.splice(1);

    expect(arr1[8]).toBeUndefined();
    expect(arr1[9]).toBeUndefined();
    expect(arr2[1]).toBeUndefined();
    expect(arr2[2]).toBeUndefined();
  });

  test('10.When second argument >= (arr.length - startIndex), all elements are deleted from start', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4, 66, 26, 39);
    const arr2 = new ArrayLike(5, 6, 7, 8, 'abc', 'omg');
    arr1.splice(1, 100);
    arr2.splice(3, 3);

    expect(arr1).toHaveLength(1);
    expect(arr2).toHaveLength(3);
  });

  test('11.Items starting from 3-d argument is added to array at index which specified as 1-st argument', () => {
    const arr = new ArrayLike(5, 6, 7, 8, 'abc', 'omg', 11, 12, 13);
    arr.splice(4, 2, 'one', 'two');

    expect(arr[4]).toBe('one');
    expect(arr[5]).toBe('two');
  });

  test('12.It returns the copy of array, when first argument isn\'t number', () => {
    const arr = new ArrayLike(1, 2, 3, 4, 66, 26, 39);

    expect(arr.splice('Something wrong')).toEqual(new ArrayLike(1, 2, 3, 4, 66, 26, 39));
  });

  test('13.When first argument is float number, it\'s rounds down', () => {
    const arr1 = new ArrayLike(1, 2, 3);
    arr1.splice(1.9, 0, 'new');

    expect(arr1[0]).toBe(1);
    expect(arr1[1]).toBe('new');
  });

  test('14.It returns empty array when methods has only 1 argument with value 0', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4, 5);
    arr1.splice(0);

    expect(arr1).toHaveLength(0);
  });

  test('15.When first argument is string, then it is converted to integer or 0', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4, 5);
    const arr2 = new ArrayLike(1, 2, 3);
    arr1.splice('1', 0, 'new');
    arr2.splice('Smth');

    expect(arr1[1]).toBe('new');
    expect(arr2).toHaveLength(0);
  });

  test('16.When first argument is -Infitinty, then actualStart is 0', () => {
    const arr = new ArrayLike(33, 'JavaScript', 'ab', 4);
    arr.splice(-Infinity, 3);

    expect(arr[0]).toBe(4);
    expect(arr).toHaveLength(1);
  });

  test('17.Array remains the same when 1-st and 2-nd arguments are NaN', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);
    const arr2 = new ArrayLike(33, 'JavaScript', 15, { a: 'where' });
    arr1.splice(NaN, NaN);
    arr2.splice(NaN, NaN);

    expect(arr1).toEqual(new ArrayLike(1, 2, 3, 4));
    expect(arr2).toEqual(new ArrayLike(33, 'JavaScript', 15, { a: 'where' }));
  });

  test('18.Array is empty when mathod has only first argument with value NaN', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);
    const arr2 = new ArrayLike(33, 'JavaScript', 11, 100);
    arr1.splice(NaN);
    arr2.splice(NaN);

    expect(arr1).toHaveLength(0);
    expect(arr2).toHaveLength(0);
  });

  test('19.Returned array is an instance of array class', () => {
    const arr1 = new ArrayLike(1, 2, 3, 4);

    expect(arr1.splice(0, 1)).toBeInstanceOf(ArrayLike);
  });

  test('20.It changes the original length of array', () => {
    const arr = new ArrayLike(1, 2, 3, 4);
    arr.splice(1, 2);

    expect(arr).toHaveLength(2);
  });
});
