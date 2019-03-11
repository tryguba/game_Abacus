export default class Mental {
	
	constructor(firstCountArr, lastCountArr) {
		this.firstCountArr = firstCountArr;
		this.lastCountArr = lastCountArr;
	}
	
	getMental() {
		
		const proba = [55, 3, 5];
		
		const result = proba;
		
		
		let sums = result.reduce(function (a, b) {
			return a + b;
		});
		
		
		console.log(`======= result ====== `, result);
		console.log(`======= sum ====== `, sums);
		
		return {
			countsArr: result,
			sumArr: sums
		}
	}
}