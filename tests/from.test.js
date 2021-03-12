const ArrayLike = require('../index.js');

describe('test cases for method "from"', () => {
  test('1. length of "from" should be 1', () => {
    expect(ArrayLike.from).toHaveLength(1);
  });

  test('2. should return array of each character when string is passed', () => {
    const arr = ArrayLike.from('str');

    expect(arr[0]).toBe('s');
    expect(arr[1]).toBe('t');
    expect(arr[2]).toBe('r');
  });

  test('3. should return array out of array-like objects', () => {
    const arr = ArrayLike.from({ 0: 1, 1: 2, length: 2 });

    expect(arr[0]).toBe(1);
    expect(arr[1]).toBe(2);
  });

  test('4. should return empty array when arguments aren\'t iterable or array-like', () => {
    const arr = ArrayLike.from(25);

    expect(arr[0]).toBeUndefined();
    expect(arr).toHaveLength(0);

    const arr2 = ArrayLike.from({ name: 'Alex' });

    expect(arr2[0]).toBeUndefined();
    expect(arr2).toHaveLength(0);
  });

  test('5. should return new array instance when ', () => {
    const arr = new ArrayLike(1, 2, 3);
    const arr2 = ArrayLike.from(arr);

    expect(arr2).not.toBe(arr);
  });

  test('6. returned array length should be the same as the passed argument\'s length', () => {
    const array = ArrayLike.from({ 0: 1, 1: 2, 2: 3, length: 3 });

    expect(array).toHaveLength(3);
  });

  test('7. callback should be called for each element of the array', () => {
    const arrayLike = { 0: 1, 1: 2, 3: 3, length: 4 };
    const mockFn = jest.fn(() => null);
    ArrayLike.from(arrayLike, mockFn);

    expect(mockFn).toHaveBeenCalledTimes(4);
  });

  test('8. non-primitive third argument should be passed as execution context in callback', () => {
    const someObj = { name: 'Eva' };
    const mockFn = jest.fn(function() {
      return this;
    });
    ArrayLike.from('123', mockFn, someObj);

    expect(mockFn.mock.results[0].value).toBe(someObj);
  });

  describe('test cases for Error throws', () => {
    test('9. should throw TypeError when first argument isn\'t passed', () => {
      const fromFn = () => ArrayLike.from();

      expect(fromFn).toThrow();
    });

    test('10. should throw TypeError when second argument isn\'t callable', () => {
      const notCb = 2;
      const fromFn = () => ArrayLike.from('str', notCb);

      expect(fromFn).toThrow(TypeError);
    });
  });
});
