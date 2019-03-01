import {image} from "../image_flash";

// Load the full build.
const _ = require('lodash');

export default class FleshCart {
	
	constructor(firstCountArr, lastCountArr, digit) {
		this.firstCountArr = firstCountArr;
		this.lastCountArr = lastCountArr;
		this.digit = digit;
	}
	
	//================================================================================
	
	
	getFleshCart() {
		
		const star = image.flashCart.star,
			ball = image.flashCart.ball,
			dog = image.flashCart.dog,
			cat = image.flashCart.cat,
			fish = image.flashCart.fish,
			heart = image.flashCart.heart,
			apple = image.flashCart.apple,
			circle = image.flashCart.circle,
			flower = image.flashCart.flower,
			bear = image.flashCart.bear;
		
		const arrFlashName = [star, ball, circle, apple, fish, heart, cat, dog, flower, bear];
		const flash = [[''], [''], [''], [''], [''], [''], [''], [''], [''], ['']];
		const summArr = [[], [], [], [], [], [], [], [], [], []];
		let finSummArr = [[], [], [], [], [], [], [], [], [], []];
		
		
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
		
		let sum = 0;
		
		for (let i = 0; i < flash.length; i++) {
			if (!flash[i][0].length) {
				if (flash[i].length) {
					summArr[i].push(flash[i].length - 1);
				}
			}
			if (flash[i][0].length) {
				summArr[i].push(5);
				if (flash[i].length) {
					summArr[i].push(flash[i].length - 1);
				}
			}
		}
		
		const result = flash;
		
		summArr.forEach((value, index)=>{
			
			finSummArr[index] = summArr[index].reduce(function(a, b) {
				return a + b;
			});
		});
		
		console.log(`======= result ====== `, result);
		console.log(`======= sum ====== `, finSummArr);
		
		return {
			countsArr: result,
			sumArr: finSummArr
		}
	}
}


