import {createHtmlElement, createStar} from "../game";
import {sound}                         from "../other/sound";

export default class Umnozheniye {
	constructor(options) {
		this.level = options.level;
		this.change = options.change;
		this.M = options.M;
		this.r1 = options.r1;
		this.r2 = options.r2;
		this.digit = options.digit;
		this.iterator = 0;
		this.firstAnswer = true; // получение звезди за правельній ответ с первого раза
		this.stars = document.querySelector('.stars').innerHTML;
	}
	
	startUmnozheniye() {
		try {
			const dataObj = this.createCounts();
			this.showCount(dataObj);
		} catch (error) {
			throw error;
		}
	}
	
	rozryad(r1, r2) {
		
		let count1 = 0;
		let count1Last = 0;
		let count2Last = 0;
		let count2 = 0;
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
			case 5:
				count1 = 89999;
				count1Last = 19000;
				break;
			default:
				console.log('r1 hz no no no');
		}
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
			count1,
			count1Last,
			count2Last,
			count2
		};
	}
	
	createCounts() {
		if (this.change) {
			if (this.iterator === 0 || this.iterator === 3 || this.iterator === 6 || this.iterator === 9) {
				this.r1 = 2;
				this.r2 = 4;
			}
			if (this.iterator === 1 || this.iterator === 4 || this.iterator === 7) {
				this.r1 = 3;
				this.r2 = 3;
			}
			if (this.iterator === 2 || this.iterator === 5 || this.iterator === 8) {
				this.r1 = 4;
				this.r2 = 2;
			}
		}
		let counts = this.rozryad(this.r1, this.r2);
		const count1 = Math.floor((Math.random() * counts.count1) + counts.count1Last);
		const count2 = Math.floor((Math.random() * counts.count2) + counts.count2Last);
		const result = count1 * count2;
		console.log(result);
		return {
			count1,
			count2,
			result
		};
	}
	
	showCount(arrData) {
		let fontSmall = null;
		if (this.r1 >= 3 || this.r2 >= 3) {
			fontSmall = 'umnozheniye__middleFont';
		}
		
		document.querySelector('.title').innerHTML = 'Abacus - умножение';
		const main = document.querySelector('#main'),
			table = document.querySelector('#app_simulator'),
			inputAnswer = createHtmlElement(`<input class="umnozheniye__inputAnswer ${fontSmall}" type="number"/>`);
		
		table.innerHTML = null;
		
		const cart = createHtmlElement(`<div class="umnozheniye"></div>`);
		const cartCount = createHtmlElement(`
						<div class="umnozheniye__count ${fontSmall}">
							${arrData.count1} x ${arrData.count2} =
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
						this.startUmnozheniye();
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
