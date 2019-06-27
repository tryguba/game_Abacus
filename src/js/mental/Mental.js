import {createHtmlElement, createStar} from "../game";
import Abacus                          from "../abacus/Abacus";

export default class Mental {
	constructor(level, M = 10, N = 3) {
		this.level = level;
		this.iterator = 0;
		this.M = M;
		this.N = N;
		this.lastCountArr = 9;
		this.firstCountArr = 1;
		this.digit = true;
		this.columns = 9;
	}
	
	startMental() {
		try {
			this.iterator++;
			const dataObj = this.choose(this.level);
			console.log(dataObj);
			this.createCartMental(dataObj);
		} catch (error) {
			throw error;
		}
	}
	
	createCount() {
		const result = [];
		for (let i = 0; i < this.M; i++) {
			const operation = Math.random() >= 0.5;
			result[i] = Math.floor((Math.random() * (9)) + 1);
			if (operation) {
				result[i] = result[i] * -1;
			}
		}
		const sums = result.reduce(function (a, b) {
			return a + b;
		});
		return {
			result,
			sums
		}
	}
	
	duplicate(arr) {
		const obj = {};
		return arr.filter((a) => {
			return a in obj ? 0 : obj[a] = 1;
		});
	}
	
	createCountDouble() {
		
		let genSimple = (prevCount, operation, j) => {
			let result = 0;
			let count = Math.floor((Math.random() * (this.lastCountArr - this.firstCountArr)) + this.firstCountArr);
			// if (this.digit) {
			// 	if (count % 2 === 0) {
			// 		count = Math.floor((Math.random() * 89) + 10);
			// 	}
			// 	else {
			// 		count = Math.floor((Math.random() * 9) + 1);
			// 	}
			// }
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
			}
			return result;
		};
		
		const result = [];
		// const sums = [];
		const operation = Math.random() >= 0.5;
		
		for (let i = 0; i < this.N; i++) {
			result[i] = genSimple(result[i - 1], operation);
		}
		
		const sums = result.reduce(function (a, b) {
			return a + b;
		});
		
		//проверка на  одинаковые уравнение
		const verifiedArray = this.duplicate(result);
		
		if (verifiedArray.length < this.N) {
			return this.createCountDouble(this.N);
		}
		
		else {
			console.log(`======= result ====== `, sums);
			return {
				countsArr: result,
				sumArr: sums
			};
		}
	}
	
	choose(level) {
		let data;
		switch (level) {
			case 'level_3':
				data = this.createCountDouble(9,1);
				break;
			case 'level_4':
				data = this.createCount();
				break;
			case 'level_5':
				data = this.createCount();
				break;
			case 'level_6':
				data = this.createCount();
				break;
			case 'level_7':
				data = this.createCount();
				break;
			case 'level_8':
				data = this.createCount();
				break;
			case 'level_9':
				data = this.createCount();
				break;
			default:
				console.log('Я таких значений не знаю');
		}
		return data;
	};
	
	createCartMental(arrData) {
		
		document.querySelector('.title').innerHTML = 'Mental-арифметика';
		const main = document.querySelector('#main'),
			table = document.querySelector('#app_simulator'),
			button = createHtmlElement(`<input id="button" type="button" value="ПРОВЕРИТЬ">`),
			inputAnswer = createHtmlElement(`<input class="inputAnswer" type="number"/>`),
			time1 = 200,
			time2 = time1 * 1.5;
		table.innerHTML = null;
		const cart = createHtmlElement(`<div class="mental"></div>`);
		
		table.appendChild(cart);
		
		const myInterval = () => {
			// const cartCount = createHtmlElement(`<div class="mental__count">${arrData.result[current]}</div>`);
			const cartCount = createHtmlElement(`<div class="mental__count">${arrData.countsArr[current]}</div>`);
			
			cart.appendChild(cartCount);
			
			setTimeout(() => { cartCount.remove() }, time1);
			
			current++;
			
			if (current > this.N) {
				current = 0;
				clearInterval(int);
				cart.remove();
				table.appendChild(inputAnswer);
				if (!document.querySelector('#button')) {
					main.appendChild(button);
				}
			}
		};
		
		let current = 0;
		let int = setInterval(myInterval, time2);
		
		button.addEventListener('click', (e) => {
			clearInterval(int);
			let result = document.querySelector('.stars').innerHTML;
			result++;
			if (+arrData.sumArr === +inputAnswer.value && inputAnswer.value !== '') {
				e.target.remove();
				inputAnswer.remove();
				createStar(table, +result);
				// console.log(`iter=${this.iterator} N=${this.N}`);
				if (this.iterator === this.M) {
					this.iterator = 0;
					e.target.remove();
					this.showModalWindow(result, 'СУПЕР!!!');
					// return clearInterval(int);
				}
				else {
					setTimeout(() => {
						this.startMental();
					}, time2);
				}
			}
			else {
				if (this.iterator === this.M) {
					this.iterator = 0;
					e.target.remove();
					this.showModalWindow(result, 'СУПЕР!!!');
					return false;
				}
				console.log(` не верно `);
				// new Audio(sound.tune.Zv_2).play();
				inputAnswer.style.background = '#d24a43';
				inputAnswer.style.color = '#ffffff';
				e.target.remove();
				setTimeout(() => {
					this.startMental();
				}, time2);
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
				this.startMental();
			});
		}
		else {
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.iterator = 0;
				this.startMental();
			});
		}
	};
}
