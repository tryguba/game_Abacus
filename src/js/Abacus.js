// Load the full build.
let _ = require('lodash');

export default class Abacus {
	
	constructor(firstCountArr, lastCountArr, digit) {
		this.firstCountArr = firstCountArr;
		this.lastCountArr = lastCountArr;
		this.digit = digit;
	}
	
	duplicate(arr) {
		let obj = {};
		return arr.filter(function (a) {
			return a in obj ? 0 : obj[a] = 1;
		});
	}
	
	//================================================================================
	
	static genAbacusSimple(lastItem, operation) {
		let result = 0;
		if (operation) {
			if (lastItem >= 0 && lastItem <= 4) {
				let toNum = 9 - lastItem;
				let toNum2 = 4 - lastItem;
				let randArr = [];
				for (let i = 5; i <= toNum; i++) {
					randArr.push(i);
				}
				for (let i = 1; i <= toNum2; i++) {
					randArr.push(i);
				}
				result = randArr[Math.floor((Math.random() * (randArr.length - 1)))];
				// console.log(`+ last= ${lastItem}  [${randArr}] res= ${result}`);
			}
			else {
				let randArr = [];
				for (let i = 1; i <= (9 - lastItem); i++) {
					randArr.push(i);
				}
				result = randArr[Math.floor((Math.random() * (randArr.length - 1)))];
				// console.log(`+ last= ${lastItem}  [${randArr}] res= ${result}`);
			}
		}
		else {
			if (lastItem >= 1 && lastItem <= 4) {
				let randArr = [];
				for (let i = 1; i <= lastItem; i++) {
					randArr.push(i);
				}
				result = randArr[Math.floor((Math.random() * (randArr.length - 1)))];
				// console.log(`- last= ${lastItem}  [${randArr}] res= ${result}`);
			}
			else {
				let toNum = lastItem - 5;
				let randArr = [];
				for (let i = 1; i <= toNum; i++) {
					randArr.push(i);
				}
				for (let i = 5; i <= lastItem; i++) {
					randArr.push(i);
				}
				let preresult = Math.floor((Math.random() * (randArr.length - 1)));
				result = randArr[preresult];
				// console.log(`- last= ${lastItem}  [${randArr}] res= ${result}`);
			}
			result = (result) * (-1);
		}
		
		return result;
	}
	
	getAbacusSimple(columns) {
		
		let result = [],
			sums = [],
			randArr = [],
			operation = Math.random() >= 0.5;
		
		for (let i = 1; i <= 8; i++) {
			if (i === 5) {
				continue;
			}
			randArr.push(i);
		}
		let res = function (first, second, operation) {
			let sum = first + second;
			let lastOperation = Math.random() >= 0.5;
			if (sum === 9) {
				lastOperation = false;
			}
			if (operation) {
				return Abacus.genAbacusSimple(first + second, lastOperation);
			}
			else {
				second = second * (-1);
				return Abacus.genAbacusSimple(first - second, lastOperation);
			}
		};
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
			result[i][1] = Abacus.genAbacusSimple(result[i][0], operation);
			result[i][2] = res(result[i][0], result[i][1], operation);
			sums[i] = _.sum(result[i]);
		}
		
		//проверка на  одинаковые уравнение
		let verifiedArray = this.duplicate(result);
		if (verifiedArray.length !== 10) {
			this.getAbacusSimple(columns);
			console.log(`newResult= ${result}`);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
		else return {
			countsArr: result,
			sumArr: sums
		};
		
	}
	
	static genAbacusSimpleStep_3(count, operation) {
		let remainder = count % 10;
		let result = 0;
		
		if (remainder >= 1 && remainder <= 4) {
			let toNum = 10 - remainder;
			let randArr = [];
			for (let i = toNum; i <= 9; i++) {
				randArr.push(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length)));
			result = randArr[preresult];
// =============================проверка============================
//             console.log('1-4| ' + remainder + '| ' + randArr + '| ' + result);
		}
		else if (remainder === 5) {
			result = 5;
// =============================проверка============================
//             console.log('5| ' + remainder + '| ' + result);
		
		}
		else if (remainder >= 6 && remainder <= 9) {
			
			let toNum = 10 - remainder;
			let toNum2 = 15 - remainder;
			let randArr = [];
			for (let i = toNum; i <= 5; i++) {
				randArr.push(i);
			}
			for (let i = toNum2; i <= 9; i++) {
				randArr.push(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length)));
			result = randArr[preresult];

// =============================проверка============================
//             console.log('6-9| ' + remainder + '| ' + randArr + '| ' + result);
		}
		
		// console.log(operation + ' | ' + count + ' | ' + (result));
		if (operation) {
			if ((result % 10) === (10 - remainder)) {
				result = this.genAbacusSimpleStep_3(count, operation);
				// console.log('---' + (result % 10) + '| ' + (10 - remainder) + ' | ' + count);
			}
		}
		return result;
	}
	
	getAbacusSimpleStep_3(columns) {
		let result = [];
		let sums = [];
		let randArr = [];
		for (let i = 2; i <= 29; i++) {
			if (i === 10 || i === 20 || i === 11 || i === 21 || i === 5 || i === 15 || i === 25) {
				continue;
			}
			randArr.push(i);
		}
		
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
			result[i][1] = Abacus.genAbacusSimpleStep_3(result[i][0], true);
			result[i][2] = Abacus.genAbacusSimpleStep_3(result[i][1] + result[i][0], false);
			sums[i] = _.sum(result[i]);
		}
		//проверка на  одинаковые уравнение
		let verifiedArray = this.duplicate(result);
		if (verifiedArray.length !== 10) {
			this.getAbacusSimpleStep_3(columns);
			console.log(`newResult= ${result}`);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
		else return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	static genAbacusSimpleStep_4(count, operation) {
		let remainder = count % 10;
		let result = 0;
		
		if (remainder >= 0 && remainder <= 3) {
			let toNum = remainder + 1;
			let toNum2 = remainder + 6;
			
			let randArr = [];
			for (let i = toNum; i <= 5; i++) {
				randArr.push(i);
			}
			for (let i = toNum2; i <= 9; i++) {
				randArr.push(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length - 1)));
			result = randArr[preresult];
// =============================проверка============================
//             console.log(`| ${remainder} [${randArr}] res= ${result}`);
		
		}
		else if (remainder === 4) {
			result = 5;
// =============================проверка============================
//             console.log(`| ${result}`);
		}
		else if (remainder >= 5 && remainder <= 8) {
			
			let toNum = remainder + 1;
			let randArr = [];
			for (let i = toNum; i <= 9; i++) {
				randArr.unshift(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length - 1)));
			result = randArr[preresult];
// =============================проверка============================
//             console.log(`| ${remainder} [${randArr}] res= ${result}`);
		}
		
		if (operation && ((count - result) % 10) - 9 === 0) {
			result = this.genAbacusSimpleStep_4(count, true);
			// console.log(`NewRes=${result}`);
		}
		
		return result;
	}
	
	getAbacusSimpleStep_4(columns) {
		let result = [];
		let sums = [];
		let randArr = [];
		for (let i = 30; i <= 47; i++) {
			if (i === 34 || i === 38 || i === 39 || i === 44) {
				continue;
			}
			randArr.push(i);
		}
		let res = (first, second) => {
			let min = first - second * -1;
			return Abacus.genAbacusSimpleStep_4(min, false);
		};
		
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
			result[i][1] = Abacus.genAbacusSimpleStep_4(result[i][0], true) * -1;
			result[i][2] = res(result[i][0], result[i][1]) * (-1);
			sums[i] = _.sum(result[i]);
		}
		
		//проверка на  одинаковые уравнение
		let verifiedArray = this.duplicate(result);
		if (verifiedArray.length !== 10) {
			this.getAbacusSimpleStep_4(columns);
			console.log(`newResult= ${result}`);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
		else return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	static genAbacusSimpleStep_5_6(count) {
		let result = 0;
		
		if (count >= 1 && count <= 4) {
			let toNum = 5 - count;
			let randArr = [];
			
			for (let i = toNum; i <= 4; i++) {
				randArr.push(i);
			}
			
			let preresult = Math.floor((Math.random() * (randArr.length)));
			result = randArr[preresult];
// =============================проверка============================
//             console.log('1-4| ' + result);
//             console.log('1-4| ' + remainder + '| ' + randArr + '| ' + result);
		
		}
		
		else {
			let toNum = count - 4;
			let randArr = [];
			for (let i = toNum; i <= 4; i++) {
				randArr.push(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length)));
			result = randArr[preresult] * (-1);

// =============================проверка============================
//             console.log('6-9| ' +result);
//             console.log('6-9| ' + remainder + '| ' + randArr + '| ' + result);
		}
		
		return result;
	}
	
	getAbacusSimpleStep_5_6(columns) {
		let result = [];
		let sums = [];
		
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			result[i][0] = Math.floor((Math.random() * 8) + 1);
			result[i][1] = Abacus.genAbacusSimpleStep_5_6(result[i][0]);
			result[i][2] = Abacus.genAbacusSimpleStep_5_6(result[i][1] + result[i][0]);
			sums[i] = _.sum(result[i]);
		}
		//проверка на  одинаковые уравнение
		let verifiedArray = this.duplicate(result);
		if (verifiedArray.length !== 10) {
			this.getAbacusSimpleStep_5_6(columns);
			console.log(`newResult= ${result}`);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
		else return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	static genAbacusSimpleStep_7_8(count) {
		let result = 0;
		if (count >= 5 && count <= 8) {
			let toNum = 14 - count;
			let randArr = [];
			for (let i = 6; i <= toNum; i++) {
				randArr.push(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length)));
			result = randArr[preresult];
// =============================проверка============================
//             console.log('1-4| ' + result);
//             console.log('5-8| ' + count + '| ' + randArr + '| ' + result);
		
		}
		else {
			let toNum = count - 5;
			let randArr = [];
			for (let i = 6; i <= toNum; i++) {
				randArr.push(i);
			}
			let preresult = Math.floor((Math.random() * (randArr.length)));
			result = randArr[preresult] * (-1);
// =============================проверка============================
//             console.log('6-9| ' +result);
//             console.log('11-14| ' + count + '| ' + randArr + '| ' + result);
		}
		return result;
	}
	
	getAbacusSimpleStep_7_8(columns) {
		let result = [];
		let sums = [];
		let randArr = [];
		for (let i = 5; i <= 14; i++) {
			if (i === 10 || i === 9) {
				continue;
			}
			randArr.push(i);
		}
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
			result[i][1] = Abacus.genAbacusSimpleStep_7_8(result[i][0]);
			result[i][2] = Abacus.genAbacusSimpleStep_7_8(result[i][1] + result[i][0]);
			sums[i] = _.sum(result[i]);
		}
		
		//проверка на  одинаковые уравнение
		let verifiedArray = this.duplicate(result);
		if (verifiedArray.length !== 10) {
			this.getAbacusSimpleStep_7_8(columns);
			console.log(`newResult= ${result}`);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
		else return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	
	genAbacusSimpleStep_9(prevCount, operation, j) {
		let result = 0;
		let count = Math.floor((Math.random() * (this.lastCountArr - this.firstCountArr)) + this.firstCountArr);
		if (this.digit) {
			if (count % 2 === 0) {
				count = Math.floor((Math.random() * 89) + 10);
			}
			else {
				count = Math.floor((Math.random() * 9) + 1);
			}
		}
		
		if (prevCount >= count) {
			result = count * (-1);
			// console.log(`- prevCount= ${prevCount} count= ${count} `)
		}
		else {
			result = count;
			// console.log(`+ prevCount= ${prevCount} count= ${count} `)
		}
		
		//проверка и присвоения первого числа в уравнении
		if (j === 0) {
			result = Math.floor((Math.random() * (this.lastCountArr - this.firstCountArr)) + this.firstCountArr);
			// console.log(`================ firstCount ==================== ${result}`);
		}
		return result;
	}
	
	getAbacusSimpleStep_9(columns, rows) {
		let result = [];
		let sums = [];
		let operation = Math.random() >= 0.5;
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			for (let j = 0; j < rows; j++) {
				result[i][j] = this.genAbacusSimpleStep_9(result[i][j - 1], operation, j);
			}
			sums[i] = _.sum(result[i]);
		}
		
		//проверка на  одинаковые уравнение
		let verifiedArray = this.duplicate(result);
		if (verifiedArray.length !== 10) {
			this.getAbacusSimpleStep_9(columns,rows);
			console.log(`newResult= ${result}`);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
		else return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	genAbacusSimpleDoubleOne(prev, j) {
		let count = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
		// let secondCount = (Math.random() * (this.digit - this.firstCountArr) + this.firstCountArr).toFixed(2);
		let result = 0;
		
		if (prev <= count) {
			result = count;
		}
		else {
			result = count * -1;
		}
		
		//проверка и присвоения первого числа в уравнении
		if (!j) {
			result = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
			// console.log(`================ firstCount ==================== ${result}`);
		}
		
		result = parseFloat(result).toFixed(2);
		return result.toString().replace(".", ",");
	}
	
	getAbacusSimpleDoubleOne(columns, rows) {
		let result = [];
		let sums = [];
		
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			let sumArr = [];
			for (let j = 0; j < rows; j++) {
				result[i][j] = this.genAbacusSimpleDoubleOne(result[i][j - 1], j);
			}
// =========================================================================
			result[i].forEach(function (item) {
				item = parseFloat(item.replace(",", "."));
				sumArr.push(item);
			});
// =========================================================================
			console.log(result[i]);
			sums[i] = _.sum(sumArr).toFixed(2);
		}
		return {
			countsArr: result,
			sumArr: sums
		}
	}
	
	genAbacusSimpleDouble(prev, j) {
		let count = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
		let secondCount = (Math.random() * (this.digit - this.firstCountArr) + this.firstCountArr).toFixed(2);
		let result = 0;
		let change = j % 2;
		
		if (change) {
			count = secondCount;
		}
		
		//====================================================
		let min = parseFloat(prev) - parseFloat(count);
		// console.log(`min=${min} `);
		//====================================================
		
		if (parseFloat(prev) >= count) {
			result = parseFloat(count) * -1;
			// console.log(`+| prev=${prev} count= ${count} res= ${result}`);
		}
		
		else {
			result = count;
			// console.log(`-| prev=${prev} count= ${count} res= ${result}`);
		}
		
		//проверка и присвоения первого числа в уравнении
		if (!j) {
			result = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
			// console.log(`================ firstCount ==================== ${result}`);
		}
		
		result = parseFloat(result).toFixed(2);
		return {
			res: result.toString().replace(".", ","),
			min: min
		}
	}
	
	getAbacusSimpleDouble(columns, rows) {
		let result = [];
		let sums = [];
		
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			let sumArr = [];
			for (let j = 0; j < rows; j++) {
				result[i][j] = this.genAbacusSimpleDouble(result[i][j - 1], j).res;
			}
// =========================================================================
			result[i].forEach(function (item) {
				item = parseFloat(item.replace(",", "."));
				sumArr.push(item);
			});
// =========================================================================
			console.log(result[i]);
			sums[i] = _.sum(sumArr).toFixed(2);
			// console.log(`sums=${sums[i]} sum=${sum}`);
		}
		return {
			countsArr: result,
			sumArr: sums
		}
	}
	
}

