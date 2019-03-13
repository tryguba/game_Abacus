import Abacus from "./Abacus";
import {sound} from "../other/sound";
import {createStar} from "../game";
import {levelStep} from "../levelStep";

const audio_Au_t_1 = new Audio(sound.trenazhor.Au_t_1);
const audio_Au_t_2 = new Audio(sound.trenazhor.Au_t_2);
const audio_Au_t_3 = new Audio(sound.trenazhor.Au_t_3);
const au_AA = new Audio(sound.theory.au_AA);

let Arr, N;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title');


export const runAbacus = (level, step, trenazher) => {
	
	const checkValueArr = (arr, arr2) => {
		if (arr.length !== arr2.length) return false;
		let on = 0;
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr2.length; j++) {
				if (+arr[i] === +arr2[j]) {
					on++;
					break;
				}
			}
		}
		return on === arr.length;
	};
	
	const createTableAbacus = (tableData) => {
		const table = document.querySelector('#app_simulator'),
			checkAnswer = document.querySelector('#button');
		audio_Au_t_1.play();
		
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
		
		checkAnswer.addEventListener('click', () => {
			// audio_Au_t_2.play();
			const inp = document.querySelectorAll('.column .inp input'),
				arrTypedAnswers = [];
			console.log(inp);
			// проверка на ответ
			for (let i = 0; i < inp.length; i++) {
				if (!inp[i].value) {
					inp[i].classList.add('red');
				}
				arrTypedAnswers[i] = inp[i].value;
				if (+Arr.sumArr[i] === +inp[i].value) {
					inp[i].classList.add('green');
					// const xxx = inp[i].parentElement;
					// console.log(xxx);
					// createStar(xxx.parentElement);
					// xxx.parentElement.style.display = 'none';
				}
				else {
					inp[i].classList.add('red');
					inp[i].style.color = 'white';
					inp[i].value = '';
				}
				
				// const colum = document.querySelectorAll('.inp .green');
				// createStar(colum[i]);
				// colum.style.display = 'none';
			}
			
			//======== проверка степа
			const checkAllArr = checkValueArr(arrTypedAnswers, Arr.sumArr);
			if (checkAllArr) {
				console.log(`You are the best!!!`);
			}
		});
	};
	const addClass = (className) => {
		const smallFont = document.querySelectorAll('.column');
		const inp = document.querySelectorAll('.inp');
		smallFont.forEach((item) => {
			item.classList.add(className);
		});
	};
	
	const chooseAbacus = (method, className) => {
		title.innerHTML = `Аbacus-арифметика`;
		Arr = method;
		createTableAbacus(Arr.countsArr);
		if (className === undefined) {
			className = null;
		} else addClass(className);
		
	};
	
	
	if (level === 'level_1') {
		switch (step) {
			case 'step_1':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimple(M));
				break;
			case 'step_2':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimple(M));
				break;
			case 'step_3':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_3(M));
				break;
			case 'step_4':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_4(M));
				break;
			case 'step_5':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_5_6(M));
				break;
			case 'step_6':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_5_6(M));
				break;
			case 'step_7':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_7_8(M));
				break;
			case 'step_8':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_7_8(M));
				break;
			case 'step_9':
				trenazher = new Abacus();
				chooseAbacus(trenazher.getAbacusSimpleStep_9(M, N = 3));
				break;
			default:
				console.log('Я таких значений не знаю в 1 левеле');
		}
		return false;
	}
	
	switch (level) {
		case 'level_2':
			level = new Abacus(1, 9);
			chooseAbacus(level.getAbacusSimpleStep_9(M, N = 5), 'middleFont');
			break;
		case 'level_3':
			level = new Abacus(1, 9);
			chooseAbacus(level.getAbacusSimpleStep_9(M, N = 7), 'middleFont');
			break;
		case 'level_4':
			level = new Abacus(1, 9, true);
			chooseAbacus(level.getAbacusSimpleStep_9(M, N = 8), 'middleFont');
			break;
		case 'level_5':
			level = new Abacus(10, 89, true);
			chooseAbacus(level.getAbacusSimpleStep_9(M, N = 10), 'middleFont');
			break;
		case 'level_6':
			level = new Abacus(10, 89);
			chooseAbacus(level.getAbacusSimpleStep_9(M, N = 10), 'middleFont');
			break;
		case 'level_7':
			level = new Abacus(0.01, 9);
			chooseAbacus(level.getAbacusSimpleDoubleOne(M, N = 10), 'smallFont');
			break;
		case 'level_8':
			level = new Abacus(0.01, 9, 99);
			chooseAbacus(level.getAbacusSimpleDouble(M, N = 10), 'smallFont');
			break;
		case 'level_9':
			level = new Abacus(10, 99.99);
			chooseAbacus(level.getAbacusSimpleDoubleOne(M, N = 10), 'smallFont');
			break;
		case 'level_10':
			level = new Abacus(10, 999, 99);
			chooseAbacus(level.getAbacusSimpleDouble(M, N = 10), 'smallFont');
			break;
		default:
			console.log('Я таких значений не знаю');
	}
};
