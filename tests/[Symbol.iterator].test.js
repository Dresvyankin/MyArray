/* eslint-disable max-len */
const ArrayLike = require('../index.js');

describe('Test case for [Symbol.iterator]', () => {
  test('Return object with method next', () => {
    const obj = new ArrayLike()[Symbol.iterator]();
    expect(obj).toBeInstanceOf(Object);
    expect(obj).toHaveProperty('next');
    expect(obj.next).toBeInstanceOf(Function);
  });

  test('[Symbol.iterator] should be instance of Function', () => {
    expect(ArrayLike.prototype[Symbol.iterator]).toBeInstanceOf(Function);
  });

  describe('Test case for the returned object', () => {
    test('At each iteration the value of the property done == false and value equal of element of array', () => {
      const iterator = new ArrayLike('1', 2, 3)[Symbol.iterator]();
      let next = iterator.next();

      expect(next).toHaveProperty('done', false);
      expect(next).toHaveProperty('value', '1');
      next = iterator.next();

      expect(next.done).toBeFalsy();
      expect(next.value).toBe(2);
      next = iterator.next();

      expect(next.done).toBeFalsy();
      expect(next.value).toBe(3);
    });

    test('At the end of all iterations the object\'s property done == true and property \'value\' equal to undefined', () => {
      const iterator = new ArrayLike()[Symbol.iterator]();
      const iteratorObj = iterator.next();

      expect(iteratorObj).toHaveProperty('done', true);
      expect(iteratorObj).toHaveProperty('value', undefined);
    });
  });
});
