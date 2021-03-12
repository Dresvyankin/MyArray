function MyArray(arg, ...args) {
	let length = arguments.length;

	let array = new Proxy(this, {
		set(target, prop, value) {
			const index = Number(prop);
			if (target.length <= index) {
				target.length = index + 1;
			}
			target[prop] = value;
		},
	});

	if (!(this instanceof MyArray)) return new MyArray(arg, ...args);

	Object.defineProperty(this, 'length', {
		enumerable: false,
		get() {
			return length;
		},
		set(newLength) {
			if (typeof newLength !== 'number') throw new RangeError('Invalid array length');

			if (newLength < length) {
				for (let i = newLength; i < length; i++) {
					delete this[i];
				}
			}
			length = newLength;
		},
	});

	if (arguments.length === 1 && typeof arguments[0] === 'number' && (arguments[0] === Infinity || arguments[0] < 0 || arguments[0] > 2 ** 32 - 1 || isNaN(arguments[0]))) {
		throw new RangeError('Invalid array length');
	}

	if (arguments.length === 1 && typeof arguments[0] === 'number') {
		length = arguments[0];
		return array;
	}

	for (let i = 0; i < length; i++) {
		this[i] = arguments[i];
	}
	return array;
}

MyArray.prototype.push = function (arg, ...args) {
	if (arguments.length > 2 ** 53 - 1) throw Error('Maximum number of arguments exceeded');

	if (typeof this.length !== 'number') this.length = 0;

	for (let i = 0; i < arguments.length; i++) {
		this[this.length] = arguments[i];
		if (!(this instanceof MyArray) && typeof this.length === 'number') this.length++;
	}

	return this.length;
};

MyArray.prototype.pop = function () {
	if (!this.length) {
		this.length = 0;
		return;
	}

	const deletedElem = this[this.length - 1];
	delete this[this.length - 1];

	if (this.length !== 0) this.length -= 1;
	return deletedElem;
};

MyArray.prototype.map = function (callback) {
	const length = this.length;
	const newArr = new MyArray();

	for (let i = 0; i < length; i++) {
		if (!(i in this)) continue;
		newArr[i] = callback.call(arguments[1], this[i], i, this);
	}

	newArr.length = length;
	return newArr;
};

MyArray.prototype.filter = function (callback) {
	const thisArg = arguments.length !== 1 ? arguments[1] : undefined;

	const myArr = new MyArray();
	const length = this.length;
	let count = 0;

	for (let i = 0; i < length; i++) {
		if (this[i] === undefined) continue;

		if (callback.call(thisArg, this[i], i, this)) {
			myArr[i] = this[i];
			count++;
		}
	}
	myArr.length = count;
	return myArr;
};

module.exports = MyArray;
