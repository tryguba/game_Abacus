import Mental                          from "./Mental";
import {createHtmlElement, createStar} from "../game";
import Abacus                          from "../abacus/Abacus";

export default class RunMental extends Mental {
	constructor(level) {
		super();
		this.level = level;
		
	}
	
	startMental() {
		try {
			const dataObj = this.choose(this.level);
			this.createCartMental(dataObj);
		} catch (error) {
			console.log(error);
		}
	}
	
	choose(level) {
		let data;
		switch (level) {
			case 'level_3':
				data = Mental.getMental();
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
		console.log(data);
		return data;
	};
	
	createCartMental(arrData) {
		document.querySelector('.title').innerHTML = 'Mental-арифметика';
		const main = document.querySelector('#main');
		const table = document.querySelector('#app_simulator');
		table.innerHTML = null;
		const inputAnswer = createHtmlElement(`<input class="inputAnswer" type="number"/>`);
		const time1 = 500;
		const time2 = time1 * 1.3;
		
		
		// for (let i = 0; i < arrData.countsArr.length; i++) {
		// 	const cart = createHtmlElement(`<div class="mental"></div>`);
		// 	for (let j = 0; j < arrData.countsArr[i].length; j++) {
		// 		setTimeout(() => {
		// 			console.log(arrData.countsArr[i]);
		// 			cart.appendChild(document.createTextNode(arrData.countsArr[i][j]));
		// 			setTimeout(() => {
		// 				cart.remove();
		// 			}, time1);
		// 			cart.style.display = 'flex';
		// 			table.appendChild(cart);
		// 		}, i * time2);
		// 		setTimeout(() => {
		// 			table.appendChild(inputAnswer);
		// 		}, arrData.countsArr.length * time2);
		// 	}
		// }
		
		console.log(arrData.countsArr);
		console.log(arrData.sumArr);
		
		let nArr = [];
		
		for (let i = 0; i < arrData.countsArr.length; i++) {
			for (let j = 0; j < arrData.countsArr[i].length; j++) {
				nArr.push(createHtmlElement(`<div class="mental">${arrData.countsArr[i][j]}</div>`));
				// const cart = createHtmlElement(`<div class="mental">${arrData.countsArr[i][j]}</div>`);
				
			}
			table.appendChild(nArr[i]);
		}
		console.log(nArr);
		
		
		// arrData.countsArr.forEach(function (data, index) {
		// 	const cart = createHtmlElement(`<div class="mental"></div>`);
		//
		// 	setTimeout(() => {
		// 		cart.appendChild(document.createTextNode(data));
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
		
		// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = createHtmlElement(`
				<input id="button" type="button" value="ПРОВЕРИТЬ">`);
			main.appendChild(button);
		}
		let loser = 0;
		button.addEventListener('click', (e) => {
			let result = document.querySelector('.stars').innerHTML;
			result++;
			if (+arrData.sumArr[0] === +inputAnswer.value && inputAnswer.value !== '') {
				// res ;
				createStar(table, +result);
				inputAnswer.remove();
				e.target.remove();
				this.showModalWindow(result, 'СУПЕР!!!')
			}
			else {
				console.log(` не верно `);
				// new Audio(sound.tune.Zv_2).play();
				inputAnswer.style.background = '#d24a43';
				inputAnswer.style.color = '#fff';
				inputAnswer.value = '';
				loser++;
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

