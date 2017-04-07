import { expect, assert } from 'chai';
import 'babel-polyfill';

describe('let', function() {
	{
		let a = 10;
		var b = 1;
	};
	it('let 的作用域 a 取值不到 ', function() {
		try {
			expect(a).to.equal(10);
			assert.fail();
		} catch(error) {
			if(error instanceof ReferenceError) {

			} else {
				throw error
			}
		}
	});
	it('let 的作用域 b 外部可以使用', function() {
		expect(b).to.equal(1);
	});

});

describe('解构赋值', function() {
	it('字符串的解构赋值', function() {
		const [one, two] = 'ke';
		expect(one).to.equal("k");
	});
	it('字符串的解构赋值 解构失败', function() {
		const [correct, error] = 'k';
		expect(error).to.equal(undefined);
	})

});
describe('变量用途', function() {
	it('交换变量', function() {
		let one = 1;
		let two = 2;
		[one, two] = [two, one];
		assert.equal(one, 2);
		assert.equal(two, 1);

	});
});
describe('字符串扩展', function() {
	it('padstart,padend', function() {
		//es2017新特性
		assert.equal('ke'.padStart(5, 'ji'), 'jijke')
	});

});
describe('正则的扩展', function() {
	it('点字符', function() {
		let name = '𠮷'; //不是正常汉字
		assert.equal(/^.$/.test(name), false);
		assert.equal(/^.$/u.test(name), true);
	});

});
describe('数值的扩展', function() {
	it('parseInt,parseFloat', function() {
		assert.equal(Number.parseInt('12.36'), 12);
		assert.equal(Number.parseInt('12.58'), 12);
		assert.equal(Number.parseFloat('12.58*'), 12.58);
	});
});
describe('Number.EPSILON', function() {
	it('浮点数的误差范围', function() {
		function float(left, right) {
			return Math.abs(left - right) < Number.EPSILON;
		}
		//		console.log(Math.pow(2, -52));
		//		console.log(Math.abs(23.56 - 25.34))
		assert.equal(float(23.56 - 22.9867), false);
	});
});
describe('Math.hypot', function() {
	it('返回所有参数的平方和的平方根', function() {
		console.log(Math.hypot(2, 3, 4))
	});
});
describe('数组的扩展', function() {
	it('把类似数组的对象转为真正的数组', function() {
		var object = {
			'0': 'a',
			'1': 'b',
			'2': 'c',
			length: 3
		}
		assert.deepEqual(Array.from(object), ['a', 'b', 'c'])
	});
});
describe('数组的扩展', function() {
	it('数组实例的fill() 第二个参数是起始位置，第三个是结束位置', function() {
		var newArray = ['a', 'b', 'c'].fill(6);
		assert.deepEqual(newArray, [6, 6, 6]);
		newArray = ['a', 'b', 'c'].fill(6, 0, 2);
		assert.deepEqual(newArray, [6, 6, 'c']);
	});
});
describe('函数的扩展', function() {
	it('默认参数  如果传入undefined，将触发该参数等于默认值,如果传入null，则返回null', function() {
		function testUndefined(argument = 2) {
			return argument;
		}
		assert.equal(testUndefined(undefined), 2);

		function testNull(argument = 2) {
			return argument;
		}
		assert.equal(testNull(null), null);

		function testChangArgument(argument = 2) {
			return argument;
		}
		assert.equal(testNull(5), 5);

	});
});
describe('函数的扩展', function() {
	it('作用域', function() {
		var argumentOne = 1;

		function test(argumentOne,
			argumentTwo = function() { argumentOne = 3; }) {
			var argumentOne = 5;
			argumentTwo();
			return argumentOne;
		}
		assert(test(), 5);
		assert(argumentOne, 1)
	});
});
describe('函数的扩展', function() {
	it('合并数组', function() {
		var arrayOne = [1, 2, 3];
		var arrayTwo = [4, 3];
		var arrayThree = [5];
		assert.deepEqual([...arrayOne, ...arrayTwo, ...arrayThree], [1, 2, 3, 4, 3, 5])
	});
});
describe('symbol', function() {
	it('使用symbol后，属性名是独一无二，不管写多少次相同的属性名都会创建新的symbol值', function() {
		var existParameter = Symbol();
		var notExistParameter = Symbol();
		assert.equal(existParameter === notExistParameter, false);
		existParameter = Symbol('foo');
		notExistParameter = Symbol('foo');
		assert.equal(existParameter === notExistParameter, false);
	});
});
describe('symbol', function() {
	it('symbol for 会在全局环境中搜索是否存在要搜索的属性名，没有则创建', function() {
		var one = Symbol.for('foo');
		var two = Symbol.for('foo');
		assert.equal(one === two, true);
	});
});
describe('set和map数据结构', function() {
	it('map set和get,has方法', function() {
		let map = new Map()
			.set('one', 3)
			.set(3, '5')
			.set(undefined, '6');
		assert.equal(map.get(3), '5');
		assert.equal(map.has(undefined), true);
	});
});
describe('set和map数据结构', function() {
	it('map转为数组使用扩展符(...)', function() {
		let map = new Map()
			.set('one', 3)
			.set(3, '5')
			.set(undefined, '6');
		assert.deepEqual([...map], [
			['one', 3],
			[3, '5'],
			[undefined, '6']
		]);
	});
});
describe('Proxy', function() {
	it('applay(目标对象，目标对象的上下文对象(this),目标对象的参数数组)拦截函数的调用', function() {
		var target = function() { return 'i am kejiayi' };
		var handler = {
			apply: function() {
				return 'I am applay'
			}
		}
		var proxy = new Proxy(target, handler);
		assert.equal(proxy(), 'I am applay');
	});
});
//describe('Proxy', function() {
//	it('ownKeys 拦截对象自身属性的读取操作', function() {
//		let target = {
//			_one: 'one',
//			_two: 'two'
//		}
//		let handler = {
//			ownKeys: function(target) {
//				return Reflect.ownKeys(target).filter(key => key[0] !== '_')
//			}
//		}
//	});
//});
describe('遍历', function() {
	it('for in/for of/forEach', function() {
		let testArray = [
			['one'], 'two', 'three'
		];

		//获取数组索引
		for(let index in testArray) {
			console.log(index);
		}
		//获取数组成员
		for(let value of testArray) {
			console.log(value)
		}
		//for。。of配合使用keys()获取索引
		for(let index of testArray.keys()) {
			console.log(index);
		}
		//获取索引和成员
		testArray.forEach(function(value, index) {
			console.log(value);
			console.log(index);
		})

	});
});