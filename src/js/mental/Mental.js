import {createHtmlElement, createStar} from "../game";

export default class Mental {
	constructor(level, M = 10, N = 3, digit) {
		this.level = level;
		this.iterator = 0;
		this.M = M;
		this.N = N;
		this.time = 2000;
		this.lastCountArr = 10;
		this.firstCountArr = 1;
		this.digit = digit;
		this.firstAnswer = true; // получение звезди за правельній ответ с первого раза
	}
	
	startMental() {
		try {
			const dataObj = this.choose(this.level);
			console.log(dataObj);
			this.createCartMental(dataObj);
		} catch (error) {
			throw error;
		}
	}
	
	createCount() {
		let genSimple = (prevCount, operation, firstCount) => {
			let result = 0;
			let count = Math.floor((Math.random() * (this.lastCountArr - this.firstCountArr)) + this.firstCountArr);
			if (this.digit) {
				if (count % 2 === 0) {
					count = Math.floor((Math.random() * 89) + 10);
				}
				else {
					count = Math.floor((Math.random() * 9) + 1);
				}
			}
			if (this.level === 'level_8' || this.level === 'level_7') {
				count = Math.floor((Math.random() * 89) + 10);
			}
			if (prevCount >= count) {
				result = count * (-1);
			}
			else {
				result = count;
			}
			//проверка и присвоения первого числа в уравнении кроме 7-го и 8-го левела
			if (firstCount === 0 && this.level !== 'level_8' && this.level !== 'level_7') {
				result = Math.floor((Math.random() * (this.lastCountArr - this.firstCountArr)) + this.firstCountArr);
			}
			return result;
		};
		
		const result = [];
		const operation = Math.random() >= 0.5;
		for (let i = 0; i < this.N; i++) {
			result[i] = genSimple(result[i - 1], operation, i);
		}
		const sums = result.reduce((a, b) => { return a + b });
		return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	createCountDouble() {
		this.time = 2800;
		const genSimple = (prev, j) => {
			let count = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
			// let secondCount = (Math.random() * (this.digit - this.firstCountArr) + this.firstCountArr).toFixed(2);
			let result = 0;
			if (prev <= count) {
				result = count;
			}
			else {
				result = count * -1;
			}
			//проверка и присвоения первого числа в уравнении
			if (!j) {
				result = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
				// console.log(`================ firstCount ==================== ${result}`);
			}
			
			result = parseFloat(result).toFixed(2);
			return result.toString().replace(".", ",");
		};
		
		const result = [];
		const sumArr = [];
		for (let i = 0; i < this.N; i++) {
			result[i] = genSimple(result[i - 1], i);
			result.forEach((item) => {
				item = parseFloat(item.replace(",", "."));
				sumArr.push(item);
			});
		}
		const sums = sumArr.reduce(function (a, b) {
			return a + b;
		}).toFixed(2);
		
		return {
			countsArr: result,
			sumArr: sums
		}
	}
	
	choose(level) {
		let data;
		switch (level) {
			case 'level_3':
				data = this.createCount();
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
				data = this.createCountDouble();
				break;
			case 'level_10':
				data = this.createCountDouble();
				break;
			default:
				console.log('Я таких значений не знаю');
		}
		return data;
	};
	
	createCartMental(arrData) {
		console.log(this.time);
		document.querySelector('.title').innerHTML = 'Mental-арифметика';
		const main = document.querySelector('#main'),
			table = document.querySelector('#app_simulator'),
			button = createHtmlElement(`<input id="button" type="button" value="ПРОВЕРИТЬ">`),
			inputAnswer = createHtmlElement(`<input class="inputAnswer" type="number"/>`),
			time2 = this.time * 1.1;
		
		table.innerHTML = null;
		const cart = createHtmlElement(`<div class="mental"></div>`);
		
		table.appendChild(cart);
		
		const myInterval = () => {
			const cartCount = createHtmlElement(`<div class="mental__count">${arrData.countsArr[current]}</div>`);
			cart.appendChild(cartCount);
			setTimeout(() => { cartCount.remove() }, this.time);
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
		/////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////
		let current = 0;
		console.log(time2);
		myInterval();
		let int = setInterval(myInterval, time2);
		
		button.addEventListener('click', (e) => {
			clearInterval(int);
			let result = document.querySelector('.stars').innerHTML;
			result++;
			if (+arrData.sumArr === +inputAnswer.value && inputAnswer.value !== '') {
				this.iterator++;
				e.target.remove();
				inputAnswer.style.background = '#94ec5a';
				
				if (this.firstAnswer) {
					inputAnswer.style.transform = 'scale(0.5)';
					createStar(table, +result);
				}
				
				if (this.iterator === this.M) {
					this.iterator = 0;
					e.target.remove();
					this.showModalWindow(result, 'СУПЕР!!!');
				}
				
				else {
					this.firstAnswer = true;
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
					// return false;
				}
				console.log(` не верно `);
				// new Audio(sound.tune.Zv_2).play();
				inputAnswer.style.background = '#d24a43';
				inputAnswer.style.color = '#ffffff';
				e.target.remove();
				setTimeout(() => {
					this.firstAnswer = false;
					this.createCartMental(arrData);
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
