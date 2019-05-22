import Abacus from "../abacus/Abacus";

export default class Mental {
	
	constructor(firstCountArr, lastCountArr) {
		this.firstCountArr = firstCountArr;
		this.lastCountArr = lastCountArr;
	}
	
	static getMental() {
		
		const result = [];
		const sums = [];
		// const operation = Math.random() >= 0.5;
		for (let i = 0; i < 10; i++) {
			result[i] = [];
			for (let j = 0; j < 3; j++) {
				result[i][j] = Math.floor((Math.random() * (9)) + 1);
			}
			sums[i] = result[i].reduce(function (a, b) {
				return a + b;
			});
		}
		return {
			countsArr: result,
			sumArr: sums
		}
	}
}