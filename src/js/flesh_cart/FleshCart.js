import {image} from "../other/image";

export default class FleshCart {
	
	constructor(firstCountArr) {
		this.firstCountArr = firstCountArr;
	}
	
	//================================================================================
	getFleshCart() {
		
		const arrFlashName = [
			image.flashCart.star,
			image.flashCart.ball,
			image.flashCart.circle,
			image.flashCart.apple,
			image.flashCart.fish,
			image.flashCart.heart,
			image.flashCart.cat,
			image.flashCart.dog,
			image.flashCart.flower,
			image.flashCart.bear
		];
		const flash = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
		const sumArr  = [[], [], [], [], [], [], [], [], [], []];
		let finSumArr = [[], [], [], [], [], [], [], [], [], []];
		
		
		arrFlashName.forEach((item, index) => {
			const rand = Math.floor(Math.random() * 5);
			for (let i = 0; i < rand; i++) {
				flash[index].push(arrFlashName[index]);
			}
		});
		
		//добавляем перввий елемент массива
		for (let i = 0; i < flash.length; i++) {
			const randFirstCount = Math.random() >= 0.5;
			if (randFirstCount) {
				flash[i].shift();
				flash[i].unshift(arrFlashName[i]);
			}
		}
		
		for (let i = 0; i < flash.length; i++) {
			if (!flash[i][0].length) {
				if (flash[i].length) {
					sumArr[i].push(flash[i].length - 1);
				}
			}
			if (flash[i][0].length) {
				sumArr[i].push(5);
				if (flash[i].length) {
					sumArr[i].push(flash[i].length - 1);
				}
			}
		}
		
		const result = flash;
		
		sumArr.forEach((value, index) => {
			
			finSumArr[index] = sumArr[index].reduce(function (a, b) {
				return a + b;
			});
		});
		
		// console.log(`======= result ====== `, result);
		console.log(`======= sum ====== `, finSumArr);
		
		return {
			countsArr: result,
			sumArr: finSumArr
		}
	}
}


