import {createHtmlElement, createStar} from "../game";

export default class Mental {
	constructor(op) {
		this.level = op.level;
		this.digit = op.digit;
		this.column = op.column;
		this.row = op.row;
		this.iterator = 0;
		this.time = 2000;
		this.lastCountArr = 10;
		this.firstCountArr = 1;
		this.firstAnswer = true; // получение звезди за правельній ответ с первого раза
	}
	
	startMental() {
		try {
			document.querySelector('#app_simulator').innerHTML = null;
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
			if (this.level === 8 || this.level === 7) {
				count = Math.floor((Math.random() * 89) + 10);
			}
			if (prevCount >= count) {
				result = count * (-1);
			}
			else {
				result = count;
			}
			//проверка и присвоения первого числа в уравнении кроме 7-го и 8-го левела
			if (firstCount === 0 && this.level !== 8 && this.level !== 7) {
				result = Math.floor((Math.random() * (this.lastCountArr - this.firstCountArr)) + this.firstCountArr);
			}
			return result;
		};
		
		const result = [];
		const operation = Math.random() >= 0.5;
		for (let i = 0; i < this.row; i++) {
			result[i] = genSimple(result[i - 1], operation, i);
		}
		const sums = result.reduce((a, b) => { return a + b });
		return {
			countsArr: result,
			sumArr: sums
		};
	}
	
	createCountDouble() {
		this.time = 3000;
		const genSimple = (prev, j) => {
			let count = (Math.random() * (10 - 1) + 1).toFixed(2);
			let result = 0;
			if (prev <= count) {
				result = count;
			}
			else {
				result = count * -1;
			}
			//проверка и присвоения первого числа в уравнении
			if (!j) {
				result = (Math.random() * (10 - 1) + 1).toFixed(2);
			}
			result = parseFloat(result).toFixed(2);
			return result.toString().replace(".", ",");
		};
		
		const result = [];
		const sumArr = [];
		for (let i = 0; i < this.row; i++) {
			result[i] = genSimple(result[i - 1], i);
		}
		result.forEach((item) => {
			item = parseFloat(item.replace(",", "."));
			sumArr.push(item);
		});
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
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
				data = this.createCount();
				break;
			case 9:
			case 10:
				data = this.createCountDouble();
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
			if (current > this.row) {
				current = 0;
				clearInterval(int);
				cart.remove();
				table.appendChild(inputAnswer);
			}
		};
		let current = 0;
		myInterval();
		let int = setInterval(myInterval, time2);
		
		// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = createHtmlElement(`
						<input id="button" type="button" value="ПРОВЕРИТЬ">`);
			main.appendChild(button);
		}
		
		button.addEventListener('click', (e) => {
			clearInterval(int);
			let result = document.querySelector('.stars').innerHTML;
			result++;
			if (+arrData.sumArr === +inputAnswer.value && inputAnswer.value !== '') {
				this.iterator++;
				e.target.remove();
				inputAnswer.style.background = '#94ec5a';
				
				if (this.firstAnswer) {
					createStar(table, +result);
				}
				
				if (this.iterator === this.column) {
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
				if (this.iterator === this.column) {
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
