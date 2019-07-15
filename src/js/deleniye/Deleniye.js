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
		
		
		this.r2 = this.R - this.r1;
		if (this.r2 === 0) {
			this.r2 = 1;
		}
		
		if (this.digit) {
			if (this.iterator % 2) {
				this.r1 = this.a1;
				this.r2 = this.a2;
			}
			else {
				this.r1 = this.b1;
				this.r2 = this.b2;
			}
		}
		
		let Kverh = Math.pow(10, this.R) - 1;
		let Kniz = Math.pow(10, this.R - 1);
		let k1verh = Math.pow(10, this.r1) - 1;
		let k1niz = Math.pow(10, this.r1 - 1);
		let k2verh = Math.pow(10, this.r2) - 1;
		let k2niz = Math.pow(10, this.r2 - 1);
		
		let chastnoe = k2niz;
		
		let delitel = Math.floor(Math.random() * Math.floor(k1verh - k1niz + 1) + k1niz);
		let chastnoeFin = Math.floor(Math.random() * Math.floor(k2verh - chastnoe + 1) + chastnoe);
		
		let delimoe = delitel * chastnoeFin;
		
		// console.log(delitel);
		// console.log(chastnoeFin);
		// console.log(delimoe);
		let n = 1;
		const findDel = (t) => {
			t = (t - t % 10) / 10;
			while (t > 0) {
				t = (t - t % 10) / 10;
				n++;
			}
			return n;
		};
		
		findDel(delimoe);
		
		if (n !== this.R) {
			
			console.log(`chastnoe = ${chastnoe}`);
			console.log(`k2verh = ${k2verh}`);
			
			if (chastnoe === k2verh) {
				console.log('hello');
				let k2verh = Math.pow(10, this.r2);
				let k2niz = Math.pow(10, this.r2 + 1) - 1;
				chastnoe = k2verh;
				chastnoeFin = Math.floor(Math.random() * Math.floor(chastnoe - k2niz + 1) + k2niz);
				let delimoe = delitel * chastnoeFin;
				findDel(delimoe);
			}
		}
		if (this.iterator % 2) {
			this.r1 = this.a1;
			this.r2 = this.a2;
		}
		else {
			this.r1 = this.b1;
			this.r2 = this.b2;
		}
		
		
		const count1 = delimoe;
		const count2 = delitel;
		const result = delimoe / delitel;
		console.log(result);
		return {
			count1,
			count2,
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
							${arrData.count1}
							<span>:</span>
							${arrData.count2}
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
	};
}
