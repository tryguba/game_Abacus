import {createHtmlElement, createStar} from "../game";

export default class Umnozheniye {
	constructor(options) {
		this.level = options.level;
		this.M = options.M;
		this.r1 = options.r1;
		this.r2 = options.r2;
		this.digit = options.digit;
		this.iterator = 0;
		this.firstAnswer = true; // получение звезди за правельній ответ с первого раза
	}
	
	startUmnozheniye() {
		try {
			const dataObj = this.choose(this.level);
			console.log(dataObj);
			this.showCount(dataObj);
		} catch (error) {
			throw error;
		}
	}
	
	rozryad1(r1) {
		let count1 = 0;
		let count1Last = 0;
		switch (r1) {
			case 1:
				count1 = 9;
				count1Last = 1;
				break;
			case 2:
				count1 = 89;
				count1Last = 10;
				break;
			case 3:
				count1 = 899;
				count1Last = 100;
				break;
			case 4:
				count1 = 8999;
				count1Last = 1000;
				break;
			default:
				console.log('r1 hz no no no');
		}
		return {
			count1,
			count1Last
		};
	}
	rozryad2(r2) {
		let count2Last = 0;
		let count2 = 0;
		switch (r2) {
			case 1:
				count2 = 9;
				count2Last = 1;
				break;
			case 2:
				count2 = 89;
				count2Last = 10;
				break;
			case 3:
				count2 = 899;
				count2Last = 100;
				break;
			case 4:
				count2 = 8999;
				count2Last = 1000;
				break;
			default:
				console.log('r2 hz no no no');
		}
		return {
			count2Last,
			count2
		};
	}
	
	createCounts() {
		const count1 = Math.floor((Math.random() * this.rozryad1(this.r1).count1) + this.rozryad1(this.r1).count1Last);
		const count2 = Math.floor((Math.random() * this.rozryad2(this.r2).count2) + this.rozryad2(this.r2).count2Last);
		const result = count1 * count2;
		console.log(result);
		return {
			count1,
			count2,
			result
		};
	}
	
	choose(level) {
		let data;
		switch (level) {
			case 'level_3':
				data = this.createCounts();
				break;
			case 'level_4':
				data = this.createCounts();
				break;
			case 'level_5':
				data = this.createCounts();
				break;
			case 'level_6':
				data = this.createCounts();
				break;
			case 'level_7':
				data = this.createCounts();
				break;
			case 'level_8':
				data = this.createCounts();
				break;
			case 'level_9':
				data = this.createCounts();
				break;
			case 'level_10':
				data = this.createCounts();
				break;
			default:
				console.log('Я таких значений не знаю');
		}
		return data;
	};
	
	showCount(arrData) {
		document.querySelector('.title').innerHTML = 'Abacus - умножение';
		const main = document.querySelector('#main'),
			table = document.querySelector('#app_simulator'),
			button = createHtmlElement(`<input id="button" type="button" value="ПРОВЕРИТЬ">`),
			inputAnswer = createHtmlElement(`<input class="umnozheniye__inputAnswer" type="number"/>`);
		
		table.innerHTML = null;
		const cart = createHtmlElement(`<div class="umnozheniye"></div>`);
		const cartCount = createHtmlElement(`
						<div class="umnozheniye__count">
							${arrData.count1} x ${arrData.count2} =
						</div>
				`);
		
		table.appendChild(cart);
		cart.appendChild(cartCount);
		cart.appendChild(inputAnswer);
		
		if (!document.querySelector('#button')) {
			main.appendChild(button);
		}
		// current++;
		// if (current > this.N) {
		// 	current = 0;
		// 	cart.remove();
		// 	table.appendChild(inputAnswer);
		//
		// }
		
		// let current = 0;
		
		button.addEventListener('click', (e) => {
			let result = document.querySelector('.stars').innerHTML;
			result++;
			if (+arrData.result === +inputAnswer.value && inputAnswer.value !== '') {
				this.iterator++;
				e.target.remove();
				inputAnswer.style.background = '#94ec5a';
				cart.style.opacity = '0';
				if (this.firstAnswer) {
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
						this.startUmnozheniye();
					}, 1000);
				}
			}
			else {
				if (this.iterator === this.M) {
					this.iterator = 0;
					e.target.remove();
					this.showModalWindow(result, 'СУПЕР!!!');
				}
				this.firstAnswer = false;
				console.log(` не верно `);
				// new Audio(sound.tune.Zv_2).play();
				inputAnswer.style.background = '#d24a43';
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
				this.startUmnozheniye();
			});
		}
		else {
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.iterator = 0;
				this.startUmnozheniye();
			});
		}
	};
}
