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
	
	constructor(level, step) {
		super();
		this.level = level;
		this.step = step;
	}
	
	startFlashCart() {
		
		const data = this.choose(this.level, this.step); // get level and step
		
		this.createColumn(data.countsArr, data.sumArr, 8);
		
	}
	
	
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
					data = this.getAbacusSimpleStep_3(this.columns);
					break;
				case 'step_4':
					data = this.getAbacusSimpleStep_4(this.columns);
					break;
				case 'step_5':
					data = this.getAbacusSimpleStep_5_6(this.columns);
					break;
				case 'step_6':
					data = this.getAbacusSimpleStep_5_6(this.columns);
					break;
				case 'step_7':
					data = this.getAbacusSimpleStep_7_8(this.columns);
					break;
				case 'step_8':
					data = this.getAbacusSimpleStep_7_8(this.columns);
					break;
				case 'step_9':
					data = this.getAbacusSimpleStep_9(this.columns, this.rows);
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
	
	createColumn(colDataArr, sumArr, index) {
		document.querySelector('.title').innerHTML = `Флеш - карты`;
		
		const table = document.querySelector('#app_simulator'),
			row = document.createElement('div'),
			cell = document.createElement('div'),
			input = document.createElement("input"),
			main = document.querySelector('#main');
		row.classList.add('column-flash');
		cell.classList.add('column-flash__input');
		input.setAttribute("type", "number");
		input.setAttribute("autofocus", "");
		
		
		colDataArr[index].forEach((stepData) => {
			const cell = document.createElement('div');
			cell.classList.add('column-flash__image');
			const img = document.createElement('img');
			img.setAttribute('src', stepData);
			cell.appendChild(img);
			row.appendChild(cell);
		});
		
		table.appendChild(row);
		row.appendChild(cell);
		cell.appendChild(input);
		
		// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = document.createElement('input');
			button.setAttribute('id', 'button');
			button.setAttribute('type', 'button');
			button.setAttribute('value', 'ПРОВЕРИТЬ');
			main.appendChild(button);
		}
		
		
		const tt = table.lastChild;
		let inp = tt.lastChild.lastChild;
		
		let loser = 0;
		let res = 0;
		
		
		button.addEventListener('click', (e) => {
			
			if (+sumArr[index] === +inp.value && inp.value !== '') {
				tt.remove();
				e.target.remove();
				createStar(table);
				index++;
				// виводитсься после окончания уровнений
				if (index === sumArr.length) {
					res = index - loser;
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
					this.createColumn(colDataArr, sumArr, index);
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
			`Ты набрал ${res} ${starWord}!`;
		countAll.innerHTML = res;
		
		if (!repeatBtn) {
			const repeatBtn = document.createElement("input");
			repeatBtn.classList.add('button', 'repeatButton');
			repeatBtn.setAttribute('value', 'Повторить');
			repeatBtn.setAttribute('type', 'submit');
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

