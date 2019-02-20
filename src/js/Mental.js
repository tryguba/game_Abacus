// Load the full build.
const _ = require('lodash');

export default class Mental {
	
	constructor(firstCountArr, lastCountArr, digit) {
		this.firstCountArr = firstCountArr;
		this.lastCountArr = lastCountArr;
		this.digit = digit;
	}
	
	getAbacusSimpleDouble(columns, rows) {
		
		const genSimple = (prev, j, sumRes) => {
			const change = j % 2;
			let count = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2),
				smallCount = (Math.random() * (this.digit - this.firstCountArr) + this.firstCountArr).toFixed(2);
			
			let result = count;
			
			if (change) {
				count = smallCount;
			}
			
			console.log(`sss${sumRes} `);
			
			if (parseFloat(sumRes) >= parseFloat(count)) {
				result = parseFloat(count) * -1;
				console.log(`+| prev=${prev} count= ${count} res= ${result}`);
			}
			else {
				result = parseFloat(count);
				console.log(`-| prev=${prev} count= ${count} res= ${result}`);
			}
			
			//проверка и присвоения первого числа в уравнении
			if (!j) {
				result = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
				// console.log(`================ firstCount ==================== ${result}`);
			}
			
			result = parseFloat(result).toFixed(2).toString().replace(".", ",");
			return result;
		};
		
		const result = [];
		const sums = [];
		for (let i = 0; i < columns; i++) {
			result[i] = [];
			const sumArr = [];
			let sumRes = 0;
			for (let j = 0; j < rows; j++) {
				result[i][j] = genSimple(result[i][j - 1], j, sumRes);
				sumRes += parseFloat(result[i][j]);
			}
			console.log(result[i]);
// =========================================================================
			result[i].forEach((item) => {
				item = parseFloat(item.replace(",", "."));
				sumArr.push(item);
			});
// =========================================================================
			sums[i] = _.sum(sumArr).toFixed(2);
			// console.log(`sums=${sums[i]} sum=${sum}`);
		}
		console.log(`======= result ====== `, result);
		console.log(`======= sum ====== `, sums);
		return {
			countsArr: result,
			sumArr: sums
		}
	}
}