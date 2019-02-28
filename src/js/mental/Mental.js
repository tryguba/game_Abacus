// Load the full build.
const _ = require('lodash');

export default class Mental {
	
	constructor(firstCountArr, lastCountArr) {
		this.firstCountArr = firstCountArr;
		this.lastCountArr = lastCountArr;
	}
	
	getMental() {
		
		const proba = [9, 3, 5, 2, 9, 6, 7, 2,];
		
		const result = proba;
		let sums = _.sum(result);
		
		
		console.log(`======= result ====== `, result);
		console.log(`======= sum ====== `, sums);
		
		return {
			countsArr: result,
			sumArr: sums
		}
	}
}