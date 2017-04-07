import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('iterator', function() {
	it('类部署iterator接口', function() {
		class newClass {
			constructor(start, stop) {
					this.value = start;
					this.stop = stop;
				}
				[Symbol.iterator]() { return this; }
			next() {
				var value = this.value;
				if(value < this.stop) {
					this.value++;
					return { done: false, value: value }
				}
				return { done: true, value: undefined }
			}

		}

		function range(start, stop) {
			return new newClass(start, stop);
		}
		for(let value of range(2, 6)) {
			console.log(value);
		}
	})
});