import Abacus                  from "./Abacus";
import {sound}                 from "../other/sound";
import {createStar, openModal} from "../game";

const audio_Au_t_1 = new Audio(sound.trenazhor.Au_t_1);
const audio_Au_t_2 = new Audio(sound.trenazhor.Au_t_2);
const audio_Au_t_3 = new Audio(sound.trenazhor.Au_t_3);
const au_AA = new Audio(sound.theory.au_AA);
// =======================================================================================================================


export default class RunAbacus extends Abacus {
	
	constructor(level, step, columns = 10, rows = 3, firstCountArr, lastCountArr, digit) {
		super(firstCountArr, lastCountArr, digit);
		this.columns = columns;
		this.rows = rows;
		this.level = level;
		this.step = step;
	}
	
	startAbacus() {
		
		const data = this.choose(this.level, this.step); // отримання левела і степа
		this.createTableAbacus(data.countsArr); //отрисовка таблици
		this.check(data.sumArr); //проверяем уравнение на правильность
		
	}
	
	choose(level, step) {
		let data;
		if (level === 'level_1') {
			switch (step) {
				case 'step_1':
					data = this.getAbacusSimple(this.columns);
					break;
				case 'step_2':
					data = this.getAbacusSimple(this.columns);
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
	
	createTableAbacus(tableData) {
		
		document.querySelector('.title').innerHTML = `Аbacus-арифметика`;
		const table = document.querySelector('#app_simulator');
		const main = document.querySelector('#main');
		// audio_Au_t_1.play();
		tableData.forEach((item) => {
			const row = document.createElement('div'),
				cell = document.createElement('div'),
				input = document.createElement("input");
			row.classList.add('column');
			cell.classList.add('inp');
			input.setAttribute("type", "number");
			item.forEach((cellData) => {
				const cell = document.createElement('div');
				cell.classList.add('column__count');
				cell.appendChild(document.createTextNode(cellData));
				row.appendChild(cell);
			});
			table.appendChild(row);
			row.appendChild(cell);
			cell.appendChild(input);
		});
		
		// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = document.createElement('input');
			button.setAttribute('id', 'button');
			button.setAttribute('type', 'button');
			button.setAttribute('value', 'ПРОВЕРИТЬ');
			main.appendChild(button);
		}
		
		//добавляем класи для изменения шрифтов
		const changeFont = document.querySelectorAll('.column');
		switch (this.level) {
			case 'level_2':
			case 'level_3':
			case 'level_4':
			case 'level_5':
			case 'level_6': {
				changeFont.forEach((item) => {
					item.classList.add('middleFont');
				});
			}
				break;
			case 'level_7':
			case 'level_8':
			case 'level_9':
			case 'level_10': {
				changeFont.forEach((item) => {
					item.classList.add('smallFont');
				});
			}
				break;
		}
	}
	
	check(sumArr) {
		
		const table = document.querySelector('#app_simulator'),
			inp = document.querySelectorAll('.column .inp input'),
			checkAnswer = document.querySelector('#button'),
			arrTypedAnswers = []; // массив ответов
		
		let stars = document.querySelector('.stars');
		
		let res = 0;
		
		checkAnswer.addEventListener('click', () => {
			res = 0;
			// audio_Au_t_2.play();
			
			// проверка на ответ
			for (let i = 0; i < inp.length; i++) {
				if (!inp[i].value) {
					inp[i].style.backgroundColor = '#eb6969';
				}
				
				if (+sumArr[i] === +inp[i].value && inp[i].value !== '') {
					arrTypedAnswers[i] = +inp[i].value;
					inp[i].style.backgroundColor = '#94ec5a';
					res++;
					const xxx = inp[i].parentElement.parentElement;
					createStar(xxx);
					stars.innerHTML = res;
					setTimeout(() => { xxx.remove(); }, 1000);
				}
				else {
					inp[i].style.backgroundColor = '#eb6969';
					inp[i].style.color = 'white';
					inp[i].value = '';
				}
			}
			// удаляем пустие елементи массива
			let filtered = arrTypedAnswers.filter(function (el) {
				return el != null;
			});
			
			//======== проверка степа ===================
			if (filtered.length === inp.length) {
				table.innerHTML = null;
				console.log(`You are the best!!!`);
				// show modal window
				this.openModal(res);
			}
		});
		
		return false;
	}
	
	openModal(res) {
		const button = document.querySelector('#button');
		const modalText = document.querySelector('.modal__text'),
			countAll = document.querySelector(".stars"),
			modal = document.querySelector('.modal'),
			modalBtn = document.querySelector('.modal__buttons'),
			repeatBtn = document.querySelector('.repeatButton');
		modal.style.display = 'flex';
		button.remove();
		
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
				this.startAbacus();
			});
		}
		else {
			repeatBtn.addEventListener('click', () => {
				modal.style.display = 'none';
				repeatBtn.remove();
				this.startAbacus();
			});
		}
	}
}
