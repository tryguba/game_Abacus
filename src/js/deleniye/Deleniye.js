import {createHtmlElement, createStar, rozryad} from "../game";
import {sound}                                  from "../other/sound";

export default class Deleniye {
	constructor(op) {
		this.level = op.level;
		this.step = op.step;
		this.change = op.change;
		this.M = op.M;
		this.r1 = op.r1;
		this.r2 = op.r2;
		this.a1 = op.a1;
		this.a2 = op.a2;
		this.b1 = op.b1;
		this.b2 = op.b2;
		this.R = op.R;
		this.digit = op.digit;
		this.iterator = 0;
		this.firstAnswer = true; // получение звезди за правельній ответ с первого раза
		this.stars = document.querySelector('.stars').innerHTML;
	}
	
	startDeleniye() {
		try {
			const dataObj = this.createCounts();
			this.showCount(dataObj);
		} catch (error) {
			throw error;
		}
	}
	
	createCounts() {
		if (this.digit) {
			if (this.iterator % 2) {
				this.R = this.a1;
				this.r1 = this.a2;
			}
			else {
				this.R = this.b1;
				this.r1 = this.b2;
			}
		}
		
		function isInteger(num) {
			return (num ^ 0) === num;
		}

// ============================================================================================
// 		if (this.level === 8 && this.change) {
// 				if (this.iterator % 2) {
// 					this.r1 = 3;
// 					this.r2 = 2;
// 				}
// 				else {
// 					this.r1 = 2;
// 					this.r2 = 3;
// 				}
// 			}
// 			else if (this.level === 9 && this.change) {
// 				switch (this.iterator) {
// 					case 0:
// 					case 3:
// 					case 6:
// 					case 9:
// 						this.r1 = 2;
// 						this.r2 = 4;
// 						break;
// 					case 1:
// 					case 4:
// 					case 7:
// 						this.r1 = 3;
// 						this.r2 = 3;
// 						break;
// 					case 2:
// 					case 5:
// 					case 8:
// 						this.r1 = 4;
// 						this.r2 = 2;
// 						break;
// 				}
// 			}
// 			else if (this.level === 10 && this.change) {
// 				if (this.iterator % 2) {
// 					this.r1 = 5;
// 					this.r2 = 2;
// 				}
// 				else {
// 					this.r1 = 4;
// 					this.r2 = 3;
// 				}
// 			}
		
		let counts = rozryad(this.R, this.r1);
		let delimoe = Math.floor((Math.random() * counts.count1) + counts.count1Last);
		let delitel = Math.floor((Math.random() * counts.count2) + counts.count2Last);
		let result = delimoe / delitel;
// ============================================================================================
		
		
		// допустим, делитель=1, частное ищем в промежутке от 1-го до 9-и.
		// При этом нам необходимо получить двухзначное делимое.
		// По алгоритму, в какой-то момент, в качестве частного останется для выбора одна 9-ка,
		// если при выборе 9-ки, все же не удалось получить n==R (а в случае примера не удастся),
		// то идет сравнение значения частного и верхней границы частного,
		// то есть 9==9, если "да", то повышаем разрядность частного.
		// частное начинаем искать в промежутке от 10 до 99
		// let k1verh = Math.pow(10, this.r1) - 1;
		// let k1niz = Math.pow(10, this.r1 - 1);
		// let k2verh = Math.pow(10, this.r2) - 1;
		// let k2niz = Math.pow(10, this.r2 - 1);
		//
		// console.log(`k1verh=${k1verh} k1niz=${k1niz} k2verh=${k2verh} k2niz=${k2niz}`);
		// let delitel = Math.floor(Math.random() * Math.floor(k1verh - k1niz + 1) + k1niz); // делитель=1
		// let chastnoe = Math.floor(Math.random() * Math.floor(k2verh - k2niz + 1) + k2niz);
		// let delimoe;
		// let n;
		// let _this = this;
		// function createMainCount() {
		// 	chastnoe = Math.floor(Math.random() * Math.floor(k2verh - k2niz + 1) + k2niz);
		// 	delimoe = delitel * chastnoe;
		// 	let n = 1, t = delimoe;
		// 	t = (t - t % 10) / 10;
		// 	while (t > 0) {
		// 		t = (t - t % 10) / 10;
		// 		n++;
		// 	}
		// 	return {
		// 		chastnoe,
		// 		delimoe,
		// 		n
		// 	}
		// }
		
		
		while (!isInteger(result)) {
			console.log(`=======================`);
			counts = rozryad(this.R, this.r1);
			delimoe = Math.floor((Math.random() * counts.count1) + counts.count1Last);
			// delitel = Math.floor((Math.random() * counts.count2) + counts.count2Last);
			result = delimoe / delitel;
		}
		
		console.log(result);
		
		// function funcCreateAll() {
		//
		// 	chastnoe = Math.floor(Math.random() * Math.floor(89) + 10);
		// 	delitel = Math.floor(Math.random() * Math.floor(8) + 1);
		// 	delimoe = delitel * chastnoe;
		//
		//
		//
		// 	/*let xxx = createMainCount();
		//
		// 	chastnoe = xxx.chastnoe;
		// 	delimoe = xxx.delimoe;
		// 	n = xxx.n;
		//
		//
		// 	console.log(`chastnoe1=${chastnoe}`);
		//
		// 	if (n > _this.R && chastnoe !== k2verh) {
		// 		console.log('================== 1 ====================');
		// 		while (delimoe.toString().length < _this.R) {
		// 			funcCreateAll();
		// 		}
		// 	}
		// 	else if (n <= _this.R && chastnoe !== k2verh) {
		// 		console.log('================== 2 ====================');
		// 		if (delimoe.toString().length < _this.R) {
		// 			funcCreateAll();
		// 		}
		// 	}
		// 	else if (n !== _this.R && chastnoe === k2verh) {
		// 		k2niz = Math.pow(10, _this.r2);
		// 		k2verh = Math.pow(10, _this.r2 + 1) - 1;
		// 		chastnoe = Math.floor(Math.random() * Math.floor(k2verh - k2niz + 1) + k2niz);
		// 		delimoe = delitel * chastnoe;
		//
		// 		console.log('================== 3 ====================');
		// 		console.log(`delitel=${delitel} chastnoe2=${chastnoe}`);
		//
		//
		// 	}
		// 	else {
		// 		console.log('================== 4 ====================');
		// 	}*/
		// 	return {
		// 		delimoe,
		// 		delitel,
		// 		chastnoe
		// 	}
		// }
		//
		// funcCreateAll();
		
		// delimoe = delitel * chastnoe;
		// const result = delimoe / delitel;
		//
		// console.log(result);
		
		return {
			delimoe,
			delitel,
			result
		};
	}
	
	
	showCount(arrData) {
		let fontSmall = '';
		if (this.r1 >= 3 || this.r2 >= 3) {
			fontSmall = 'deleniye__middleFont';
		}
		
		document.querySelector('.title').innerHTML = 'Abacus - деление';
		const main = document.querySelector('#main'),
			table = document.querySelector('#app_simulator'),
			inputAnswer = createHtmlElement(`<input class="deleniye__inputAnswer ${fontSmall}" type="number"/>`);
		
		table.innerHTML = null;
		
		const cart = createHtmlElement(`<div class="deleniye"></div>`);
		const cartCount = createHtmlElement(`
						<div class="deleniye__count ${fontSmall}">
							${arrData.delimoe}
							<span>:</span>
							${arrData.delitel}
							<span>=</span>
						</div>
				`);
		
		table.appendChild(cart);
		cart.appendChild(cartCount);
		cart.appendChild(inputAnswer);
		
		// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = createHtmlElement(`
				<input id="button" type="button" value="ПРОВЕРИТЬ">`);
			main.appendChild(button);
		}
		
		button.addEventListener('click', (e) => {
			
			console.log(this.stars);
			
			if (+arrData.result === +inputAnswer.value && inputAnswer.value !== '') {
				this.iterator++;
				e.target.remove();
				inputAnswer.style.background = '#94ec5a';
				cart.style.opacity = '0';
				
				if (this.firstAnswer) {
					this.stars++;
					// new Audio(sound.tune.Zv_3).play();
					createStar(table, +this.stars);
				}
				
				if (this.iterator === this.M) {
					this.firstAnswer = true;
					this.iterator = 0;
					e.target.remove();
					this.showModalWindow(this.stars, 'СУПЕР!!!');
				}
				else {
					this.firstAnswer = true;
					setTimeout(() => {
						this.startDeleniye();
					}, 1000);
				}
			}
			else {
				this.firstAnswer = false;
				console.log(` не верно `);
				// new Audio(sound.tune.Zv_2).play();
				inputAnswer.style.background = '#d24a43';
				inputAnswer.value = '';
				inputAnswer.style.color = '#ffffff';
			}
		});
		return false;
	}
	
	showModalWindow(res, text) {
		const modalText = document.querySelector('.modal__text'),
			countAll = document.querySelector(".stars"),
			modal = document.querySelector('.modal'),
			modalBtn = document.querySelector('.modal__buttons'),
			repeatBtn = document.querySelector('.repeatButton');
		modal.style.display = 'flex';
		
		function resData(res) {
			if (res < 0) {
				res = 0;
			}
			if (res === 1) {
				return `звезду`;
			}
			else if (res <= 4 && res >= 2) {
				return `звезды`;
			}
			return 'звезд';
		}
		
		modalText.innerText = `${text} Ты набрал ${res} ${resData(res)}!`;
		countAll.innerHTML = res;
		
		if (!repeatBtn) {
			const repeatBtn = createHtmlElement(`
				<input type="submit" value="Повторить" class="button repeatButton">`);
			
			modalBtn.appendChild(repeatBtn);
			
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.startDeleniye();
			});
		}
		else {
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.iterator = 0;
				this.startDeleniye();
			});
		}
	}
	;
}
