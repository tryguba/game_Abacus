import {image} from "../other/image";

export default class FleshCart {
	
	constructor(firstCountArr) {
		this.firstCountArr = firstCountArr;
	}
	
	getFleshCart() {
		
		const x = image.flashCart;
		const arrFlashName = [
			x.star, x.ball, x.circle,
			x.apple, x.fish, x.heart,
			x.cat, x.dog, x.flower, x.bear
		];
		
		const flash = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
		const flash2 = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
		const flash3 = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
		const sumArr = [[], [], [], [], [], [], [], [], [], []];
		const sumArr2 = [[], [], [], [], [], [], [], [], [], []];
		const sumArr3 = [[], [], [], [], [], [], [], [], [], []];
		let finSumArr = [];
		let finSumArr2 = [];
		let finSumArr3 = [];
		
		//добавляем елементи в массив (кроме первого)
		for (let i = 0; i < arrFlashName.length; i++) {
			// const rand = Math.floor(Math.random() * 5); // рандом от 0 до 4
			const rand = Math.floor((Math.random() * (5 - 1)) + 1); // рандом от 1 до 4
			for (let j = 0; j < rand; j++) {
				flash[i].push(arrFlashName[i]);
			}
		}
		
		//добавляем елементи в массив (кроме первого)2
		for (let i = 0; i < arrFlashName.length; i++) {
			// const rand = Math.floor((Math.random() * (5 - 1)) + 1); // рандом от 0 до 4
			const rand = Math.floor(Math.random() * 5); // рандом от 0 до 4
			for (let j = 0; j < rand; j++) {
				flash2[i].push(arrFlashName[i]);
			}
		}
		
		//добавляем елементи в массив (кроме первого)3
		for (let i = 0; i < arrFlashName.length; i++) {
			const rand = Math.floor(Math.random() * 5); // рандом от 0 до 4
			for (let j = 0; j < rand; j++) {
				flash3[i].push(arrFlashName[i]);
			}
		}
		//добавляем первий елемент массива
		for (let i = 0; i < flash.length; i++) {
			const randFirstCount = Math.random() >= 0.5;
			if (randFirstCount) {
				flash[i].shift();
				flash[i].unshift(arrFlashName[i]);
			}
		}
		//добавляем первий елемент массива2
		for (let i = 0; i < flash2.length; i++) {
			const randFirstCount = Math.random() >= 0.5;
			if (randFirstCount) {
				flash2[i].shift();
				flash2[i].unshift(arrFlashName[i]);
			}
		}
		//добавляем первий елемент массива2
		for (let i = 0; i < flash3.length; i++) {
			const randFirstCount = Math.random() >= 0.5;
			if (randFirstCount) {
				flash3[i].shift();
				flash3[i].unshift(arrFlashName[i]);
			}
		}
		// считаем сумму
		for (let i = 0; i < flash.length; i++) {
			if (!flash[i][0].length) {
				sumArr[i].push(flash[i].length - 1);
			}
			else {
				sumArr[i].push(5);
				sumArr[i].push(flash[i].length - 1);
			}
		}
		// считаем сумму2
		for (let i = 0; i < flash2.length; i++) {
			if (!flash2[i][0].length) {
				sumArr2[i].push(flash2[i].length - 1);
			}
			else {
				sumArr2[i].push(5);
				sumArr2[i].push(flash2[i].length - 1);
			}
		}
		// считаем сумму3
		for (let i = 0; i < flash3.length; i++) {
			if (!flash3[i][0].length) {
				sumArr3[i].push(flash3[i].length - 1);
			}
			else {
				sumArr3[i].push(5);
				sumArr3[i].push(flash3[i].length - 1);
			}
		}
		
		sumArr.forEach((value, index) => {
			finSumArr[index] = sumArr[index].reduce(function (a, b) {
				return a + b;
			});
		});
		sumArr2.forEach((value, index) => {
			finSumArr2[index] = sumArr2[index].reduce(function (a, b) {
				return a + b;
			});
		});
		sumArr3.forEach((value, index) => {
			finSumArr3[index] = sumArr3[index].reduce(function (a, b) {
				return a + b;
			});
		});
		
		const finishSumArr = [];
		const finishSumArr3 = [];
		
		for (let i = 0; i < finSumArr2.length; i++) {
			finishSumArr[i] = String(finSumArr[i]) + finSumArr2[i];
		}
		
		for (let i = 0; i < finSumArr3.length; i++) {
			finishSumArr3[i] = String(finSumArr[i]) + finSumArr2[i] + finSumArr3[i];
		}
		
		return {
			countsArr: flash,
			countsArr2: flash2,
			countsArr3: flash3,
			sumArr: finSumArr,
			sumArr2: finSumArr2,
			sumAllArr: finishSumArr,
			sumAllArr3: finishSumArr3
		}
	}
}


