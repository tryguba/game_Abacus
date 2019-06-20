import {createHtmlElement, createStar} from "../game";

export default class Mental {
	constructor(level) {
		this.level = level;
		this.iterator = 0;
		this.M = 10;
		this.N = 10;
	}
	
	startMental() {
		try {
			this.iterator++;
			const dataObj = this.choose(this.level);
			this.createCartMental(dataObj);
		} catch (error) {
			throw error;
		}
		
		console.log(this.iterator);
	}
	
	createCount() {
		const result = [];
		for (let i = 0; i < this.N; i++) {
			result[i] = Math.floor((Math.random() * (9)) + 1);
		}
		const sums = result.reduce(function (a, b) {
			return a + b;
		});
		return {
			result,
			sums
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
				data = this.createCount();
				break;
			default:
				console.log('Я таких значений не знаю');
		}
		console.log(data);
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
		
		// console.log(arrData.result.length);
		
		const myInterval = () => {
			const cart = createHtmlElement(`<div class="mental">${arrData.result[current]}</div>`);
			setTimeout(() => {
				cart.remove();
			}, time1);
			table.appendChild(cart);
			current++;
			if (current > arrData.result.length) {
				current = 0;
				clearInterval(int);
				table.innerHTML = null;
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
			if (+arrData.sums === +inputAnswer.value && inputAnswer.value !== '') {
				e.target.remove();
				inputAnswer.remove();
				createStar(table, +result);
				// console.log(`iter=${this.iterator} N=${this.N}`);
				if (this.iterator === this.N) {
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
				if (this.iterator === this.N) {
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
