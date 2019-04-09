import FleshCart    from "./FleshCart";
import {sound}      from "../other/sound";
import {createStar} from "../game";


// ======================================================================
const audio_Au_t_3 = new Audio(sound.trenazhor.Au_t_3);
const audio_Au_t_4 = new Audio(sound.trenazhor.Au_t_4);
const audio_Au_t_5 = new Audio(sound.trenazhor.Au_t_5);
const audio_Au_t_6 = new Audio(sound.trenazhor.Au_t_6);
const audio_Au_t_7 = new Audio(sound.trenazhor.Au_t_7);
const audio_Au_t_8 = new Audio(sound.trenazhor.Au_t_8);
const audio_Au_t_9 = new Audio(sound.trenazhor.Au_t_9);
// ======================================================================

// ======================================================================
export default class RunFlashCart extends FleshCart {
	
	constructor(level, step, bitNumber, bool) {
		// bitNumber --- розрядность числа от 1 до 3
		super();
		this.level = level;
		this.step = step;
		this.bitNumber = bitNumber;
		this.bool = bool;
	}
	
	static createHtmlElement(str) {
		const el = document.createElement('div');
		el.innerHTML = str;
		return el.firstElementChild;
	};
	
	choose(level, step) {
		let data;
		if (level === 'level_1') {
			switch (step) {
				case 'step_1':
					data = this.getFleshCart();
					break;
				case 'step_2':
					data = this.getFleshCart();
					break;
				case 'step_3':
					data = this.getFleshCart();
					break;
				case 'step_4':
					data = this.getFleshCart();
					break;
				case 'step_5':
					data = this.getFleshCart();
					break;
				case 'step_6':
					data = this.getFleshCart();
					break;
				case 'step_7':
					data = this.getFleshCart();
					break;
				case 'step_8':
					data = this.getFleshCart();
					break;
				case 'step_9':
					data = this.getFleshCart();
					break;
				default:
					console.log('Я таких значений не знаю в 1 левеле');
			}
		}
		else {
			switch (level) {
				case 'level_2':
					data = this.getAbacusSimpleStep_9(this.columns, this.rows);
					break;
				case 'level_3':
					data = this.getAbacusSimpleStep_9(this.columns, this.rows, this.firstCountArr, this.lastCountArr);
					break;
				case 'level_4':
					data = this.getAbacusSimpleStep_9(this.columns, this.rows, this.firstCountArr, this.lastCountArr);
					break;
				case 'level_5':
					data = this.getAbacusSimpleStep_9(this.columns, this.rows, this.firstCountArr, this.lastCountArr);
					break;
				case 'level_6':
					data = this.getAbacusSimpleStep_9(this.columns, this.rows, this.firstCountArr, this.lastCountArr);
					break;
				case 'level_7':
					data = this.getAbacusSimpleDoubleOne(this.columns, this.rows, this.firstCountArr, this.lastCountArr);
					break;
				case 'level_8':
					data = this.getAbacusSimpleDouble(this.columns, this.rows, this.firstCountArr, this.lastCountArr, this.digit);
					break;
				case 'level_9':
					data = this.getAbacusSimpleDoubleOne(this.columns, this.rows, this.firstCountArr, this.lastCountArr);
					break;
				case 'level_10':
					data = this.getAbacusSimpleDouble(this.columns, this.rows, this.firstCountArr, this.lastCountArr, this.digit);
					break;
				default:
					console.log('Я таких значений не знаю');
			}
		}
		return data;
	}

// ======================================================================
	
	startFlashCart() {
		const index = 0;
		const dataObj = this.choose(this.level, this.step); // get level and step
		
		this.createColumn(this.bitNumber, dataObj, index);
	}
	
	createColumn(bitNumber, dataObj, index) {
// ======================================================================
		let mainArr = dataObj.sumArr;
		if (bitNumber === 2) {
			mainArr = dataObj.sumAllArr;
		}
		else if (bitNumber === 3) {
			mainArr = dataObj.sumAllArr3;
		}
		
		console.log(mainArr);
// ======================================================================
		document.querySelector('.title').innerHTML = `Флеш - карты`;
		
		const row = RunFlashCart.createHtmlElement(`<div class="column-flash flashLine1"></div>`);
		const row2 = RunFlashCart.createHtmlElement(`<div class="column-flash"></div>`);
		const row3 = RunFlashCart.createHtmlElement(`<div class="column-flash"></div>`);
		const divInput = RunFlashCart.createHtmlElement(`<div class="column-flash__input">
																<input type="number" autofocus/>
															</div>`);
		
		const table = document.querySelector('#app_simulator');
		const main = document.querySelector('#main');
		
		const oneColumn = () => {
			dataObj.countsArr[index].forEach((stepData) => {
				const cell = RunFlashCart.createHtmlElement(`
				<div class="column-flash__image">
					<img src=${stepData}>
				</div>`);
				row.appendChild(cell);
			});
			row.appendChild(divInput);
			table.appendChild(row);
		};
		
		const twoColumn = () => {
			row.classList.remove('flashLine1');
			row2.classList.add('flashLine2');
			dataObj.countsArr[index].forEach((stepData) => {
				const cell = RunFlashCart.createHtmlElement(`
				<div class="column-flash__image">
					<img src=${stepData}>
				</div>`);
				row.appendChild(cell);
			});
			
			dataObj.countsArr2[index].forEach((stepData) => {
				const cell = RunFlashCart.createHtmlElement(`
				<div class="column-flash__image">
					<img src=${stepData}>
				</div>`);
				row2.appendChild(cell);
			});
			table.appendChild(row);
			table.appendChild(row2);
			row2.appendChild(divInput);
		};
		
		const threeColumn = () => {
			row.classList.remove('flashLine1');
			row3.classList.add('flashLine3');
			
			dataObj.countsArr[index].forEach((stepData) => {
				const cell = RunFlashCart.createHtmlElement(`
				<div class="column-flash__image">
					<img src=${stepData}>
				</div>`);
				row.appendChild(cell);
			});
			dataObj.countsArr2[index].forEach((stepData) => {
				const cell = RunFlashCart.createHtmlElement(`
				<div class="column-flash__image">
					<img src=${stepData}>
				</div>`);
				row2.appendChild(cell);
			});
			
			dataObj.countsArr3[index].forEach((stepData) => {
				const cell = RunFlashCart.createHtmlElement(`
				<div class="column-flash__image">
					<img src=${stepData}>
				</div>`);
				row3.appendChild(cell);
			});
			table.appendChild(row);
			table.appendChild(row2);
			table.appendChild(row3);
			row3.appendChild(divInput);
		};
		
		
		const rand = Math.random() >= 0.5;
		
		if (bitNumber === 2) {
			
			if (rand) {
				twoColumn();
			}
			else {
				if (this.bool) {
					oneColumn();
				}
				else {
					twoColumn();
				}
			}
		}
		else if (bitNumber === 3) {
			
			threeColumn();
		}
		else oneColumn();
		
		
		// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = RunFlashCart.createHtmlElement(`
				<input id="button" type="button" value="ПРОВЕРИТЬ">`);
			main.appendChild(button);
		}
		
		const colArr = document.querySelectorAll('.column-flash');
		const inp = document.querySelector('.column-flash__input input');
		
		let loser = 0;
		
		button.addEventListener('click', (e) => {
			let res = document.querySelector('.stars').innerHTML;
			if (+mainArr[index] === +inp.value && inp.value !== '') {
				//удаляем колонки с правильним ответом
				for (let i = 0; i < colArr.length; i++) {
					colArr[i].remove();
				}
				e.currentTarget.remove();
				res++;
				createStar(table, res);
				index++;
				// виводитсься после окончания уровнений
				if (index === dataObj.sumArr.length) {
					// res = index - loser;
					if (loser <= 2) {
						const text = "Круто!";
						// const text1 = "Вот это да!";
						this.showModalWindow(res, text, audio_Au_t_8);
					}
					else if (5 >= loser && loser <= 8) {
						const text = "Умница!";
						// const text1 = "Молодец!";
						this.showModalWindow(res, text, audio_Au_t_7);
					}
					else {
						let text = "Хорошо, давай попробуем еще раз?";
						this.showModalWindow(res, text, audio_Au_t_5);
					}
					return;
				}
				setTimeout(() => {
					this.createColumn(bitNumber, dataObj, index);
				}, 1000);
			}
			else {
				// new Audio(sound.tune.Zv_2).play();
				inp.style.background = '#d24a43';
				inp.style.color = '#fff';
				inp.value = '';
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
			const repeatBtn = RunFlashCart.createHtmlElement(`
				<input type="submit" value="Повторить" class="button repeatButton">`);
			
			modalBtn.appendChild(repeatBtn);
			
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.startFlashCart();
			});
		}
		else {
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.startFlashCart();
			});
		}
	}
}

