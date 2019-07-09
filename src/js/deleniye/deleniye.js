import {createHtmlElement, createStar, rozryad} from "../game";
import {sound}                                  from "../other/sound";

export default class Deleniye {
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
	
	startDeleniye() {
		try {
			const dataObj = this.createCounts();
			this.showCount(dataObj);
		} catch (error) {
			throw error;
		}
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
		let counts = rozryad(this.r1, this.r2);
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
	};
}
