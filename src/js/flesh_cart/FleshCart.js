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
		const finishSumArr = [];
		const finishSumArr3 = [];
		
		const addFirstElemToArr = (flash) => {
			for (let i = 0; i < flash.length; i++) {
				const randFirstCount = Math.random() >= 0.5;
				if (randFirstCount) {
					flash[i].shift();
					flash[i].unshift(arrFlashName[i]);
				}
			}
		};
		
		const addElemToArr = (flash2) => {
			for (let i = 0; i < arrFlashName.length; i++) {
				const rand = Math.floor(Math.random() * 5); // рандом от 0 до 4
				for (let j = 0; j < rand; j++) {
					flash2[i].push(arrFlashName[i]);
				}
			}
		};
		
		const calculateSum = (flash, sumArr, finSumArr) => {
			for (let i = 0; i < flash.length; i++) {
				if (!flash[i][0].length) {
					sumArr[i].push(flash[i].length - 1);
				}
				else {
					sumArr[i].push(5);
					sumArr[i].push(flash[i].length - 1);
				}
			}
			sumArr.forEach((value, index) => {
				finSumArr[index] = sumArr[index].reduce(function (a, b) {
					return a + b;
				});
			});
			
		};
		
		
		//добавляем елементи в массив (кроме первого)
		for (let i = 0; i < arrFlashName.length; i++) {
			const rand = Math.floor((Math.random() * (5 - 1)) + 1); // рандом от 1 до 4
			for (let j = 0; j < rand; j++) {
				flash[i].push(arrFlashName[i]);
			}
		}
		
		//добавляем елементи в массив (кроме первого)
		addElemToArr(flash2);
		addElemToArr(flash3);
		
		//добавляем первий елемент массива
		addFirstElemToArr(flash);
		addFirstElemToArr(flash2);
		addFirstElemToArr(flash3);
		
		// считаем сумму
		calculateSum(flash, sumArr, finSumArr);
		calculateSum(flash2, sumArr2, finSumArr2);
		calculateSum(flash3, sumArr3, finSumArr3);
		
		
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


