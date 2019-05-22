import Mental                          from "./Mental";
import {createHtmlElement, createStar} from "../game";

import Abacus from "../abacus/Abacus";

export default class RunMental extends Mental {
	constructor(level) {
		super();
		this.level = level;
		this.iterator = 0;
	}
	
	startMental() {
		try {
			let zzz = this.iterator++;
			console.log(zzz);
			const dataObj = this.choose(this.level);
			this.createCartMental(dataObj);
		} catch (error) {
			console.log(error);
		}
	}
	
	createCount() {
		
		const result = [];
		
		for (let i = 0; i < 3; i++) {
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
				data = Mental.getMental();
				break;
			case 'level_5':
				data = Mental.getMental();
				break;
			case 'level_6':
				data = Mental.getMental();
				break;
			case 'level_7':
				data = Mental.getMental();
				break;
			case 'level_8':
				data = Mental.getMental();
				break;
			case 'level_9':
				data = Mental.getMental();
				break;
			default:
				console.log('Я таких значений не знаю');
		}
		console.table(data);
		return data;
	};
	
	createCartMental(arrData) {
		document.querySelector('.title').innerHTML = 'Mental-арифметика';
		const main = document.querySelector('#main');
		const table = document.querySelector('#app_simulator');
		table.innerHTML = null;
		const button = createHtmlElement(`<input id="button" type="button" value="ПРОВЕРИТЬ">`);
		const inputAnswer = createHtmlElement(`<input class="inputAnswer" type="number"/>`);
		const time1 = 500;
		const time2 = time1 * 1.5;
		
		let current = 0;
		let int = setInterval(function () {
			const cart = createHtmlElement(`<div class="mental">${arrData.result[current]}</div>`);
			setTimeout(() => {
				cart.remove();
			}, time1);
			table.appendChild(cart);
			current++;
			if (current > arrData.result.length) {
				clearInterval(int);
				table.innerHTML = null;
				table.appendChild(inputAnswer);
				if (!document.querySelector('#button')) {
					main.appendChild(button);
				}
			}
		}, time2);
		
		// arrData.countsArr.forEach(function (data, index) {
		// 	const cart = createHtmlElement(`<div class="mental"></div>`);
		//
		// 	setTimeout(() => {
		//
		// 		setTimeout(() => {
		// 			cart.remove();
		// 		}, time1);
		// 		cart.style.display = 'flex';
		// 		table.appendChild(cart);
		// 	}, index * time2);
		//
		// 	setTimeout(() => {
		// 		table.appendChild(inputAnswer);
		// 	}, arrData.countsArr.length * time2);
		// });
		
		
		button.addEventListener('click', (e) => {
			let result = document.querySelector('.stars').innerHTML;
			result++;
			if (+arrData.sums === +inputAnswer.value && inputAnswer.value !== '') {
				e.target.remove();
				inputAnswer.remove();
				createStar(table, +result);
				
				setTimeout(() => {
					this.startMental();
				}, 1500);
				
				if (this.iterator === 3) {
					this.iterator = 0;
					e.target.remove();
					this.showModalWindow(result, 'СУПЕР!!!');
					return false;
				}
				// this.showModalWindow(result, 'СУПЕР!!!')
			}
			else {
				if (this.iterator === 3) {
					this.iterator = 0;
					e.target.remove();
					console.log(this);
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
				}, 1500);
			}
		});
	}
	
	showModalWindow(res, text) {
		const modalText = document.querySelector('.modal__text'),
			countAll = document.querySelector(".stars"),
			modal = document.querySelector('.modal'),
			modalBtn = document.querySelector('.modal__buttons'),
			repeatBtn = document.querySelector('.repeatButton');
		modal.style.display = 'flex';
		
		if (res < 0) {
			res = 0;
		}
		let starWord = 'звезд';
		if (res === 1) {
			starWord = `звезду`;
		}
		else if (res <= 4 && res >= 2) {
			starWord = `звезды`;
		}
		modalText.innerText =
			`${text}
			Ты набрал ${res} ${starWord}!`;
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
				this.startMental();
			});
		}
	};
}

