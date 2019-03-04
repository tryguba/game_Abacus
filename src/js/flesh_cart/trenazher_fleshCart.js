import FleshCart from "./FleshCart";
import {sound} from "../sound";
import Abacus from "../abacus/Abacus";


const audio_Au_t_3 = new Audio(sound.trenazhor.Au_t_3);
const audio_Au_t_4 = new Audio(sound.trenazhor.Au_t_4);
const audio_Au_t_5 = new Audio(sound.trenazhor.Au_t_5);
const audio_Au_t_6 = new Audio(sound.trenazhor.Au_t_6);
const audio_Au_t_7 = new Audio(sound.trenazhor.Au_t_7);
const audio_Au_t_8 = new Audio(sound.trenazhor.Au_t_8);
const audio_Au_t_9 = new Audio(sound.trenazhor.Au_t_9);
const Zv_2 = new Audio(sound.tune.Zv_2);
const Zv_3 = new Audio(sound.tune.Zv_3);

let Arr;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title'),
	checkingAnswer = document.querySelector('#button');


const table = document.querySelector('#app_simulator');


const createColumn = (column) => {
	const row = document.createElement('div'),
		cell = document.createElement('div'),
		input = document.createElement("input");
	row.classList.add('column-flash');
	cell.classList.add('column-flash__input');
	input.setAttribute("type", "number");
	
	column.forEach((stepData) => {
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
};


const createTableFlashCart = (tableData) => {
	let count = 0;
	let looser = 0;
	createColumn(tableData[count]);
	checkingAnswer.addEventListener('click', () => {
		
		const tt = table.lastChild,
			row = tt.lastChild,
			inp = row.lastChild;
		
		if (+Arr.sumArr[count] === +inp.value) {
			Zv_3.play();
			count++;
			tt.style.display = 'none';
			if (count === tableData.length) {
				document.querySelector('.column-flash').remove();
				const best = document.createElement('div');
				
				if (looser <= 2) {
					best.innerText = "Круто!";
					table.appendChild(best);
					audio_Au_t_8.play();
					setTimeout(() => {
						best.innerText = "Вот это да!";
						table.appendChild(best);
						audio_Au_t_9.play();
					}, 1000);
					looser = 0;
					count = 0;
				} else if (5 <= looser && looser <= 8) {
					best.innerText = "Молодец!";
					table.appendChild(best);
					audio_Au_t_6.play();
					setTimeout(() => {
						best.innerText = "Умница!";
						table.appendChild(best);
						audio_Au_t_7.play();
					}, 1000);
					looser = 0;
					count = 0;
				} else if (looser => 9) {
					audio_Au_t_5.play();
					best.innerText = "Хорошо, давай попробуем еще раз?";
					table.appendChild(best);
					looser = 0;
					count = 0;
				}
				return false;
			}
			createColumn(tableData[count]);
			console.log(`zbs`);
		} else {
			Zv_2.play();
			looser++;
			console.log(`looser=${looser}`);
			inp.value = '';
			inp.classList.add('red');
		}
		
		
	});
};


const chooseFleshCart = (step, method) => {
	console.log(`==========${step}==========`);
	title.innerHTML = `Флеш - карты`;
	Arr = method;
	
	createTableFlashCart(Arr.countsArr);
};

const startFleshCart = () => {
	for (let i = 0; i < steps.length; i++) {
		const table = document.querySelector('#app_simulator');
		let stepic;
		let step;
		steps[i].addEventListener("click", () => {
			// audio_Au_t_1.play();
			table.innerHTML = null;
			stepic = steps[i];
			step = stepic.getAttribute('name');
			switch (step) {
				case 'F_l1_step_1_2_3':
					const F_l1_step_1_2_3 = new FleshCart();
					chooseFleshCart(step, F_l1_step_1_2_3.getFleshCart(M));
					break;
				case 'F_l1_step_4':
					const F_l1_step_4 = new FleshCart();
					chooseFleshCart(step, F_l1_step_4.getFleshCart(M));
					break;
				case 'F_l1_step_5_6':
					const F_l1_step_5_6 = new FleshCart();
					chooseFleshCart(step, F_l1_step_5_6.getFleshCart(M));
					break;
				case 'F_l1_step_7':
					const F_l1_step_7 = new FleshCart();
					chooseFleshCart(step, F_l1_step_7.getFleshCart(M));
					break;
				case 'F_l1_step_8_9':
					const F_l1_step_8_9 = new FleshCart();
					chooseFleshCart(step, F_l1_step_8_9.getFleshCart(M));
					break;
				
				/*// ==================== level 2 ================================
				case 'F_l2_step_1_2':
					const F_l2_step_1_2 = new FleshCart(1, 9);
					chooseAbacus(step, F_l2_step_1_2.getFleshCart(M));
					break;
				case 'F_l2_step_3':
					const F_l2_step_3 = new FleshCart(1, 9);
					chooseAbacus(step, F_l2_step_3.getFleshCart(M));
					break;
				case 'F_l2_step_4':
					const F_l2_step_4 = new FleshCart(1, 9);
					chooseAbacus(step, F_l2_step_4.getFleshCart(M));
					break;
				case 'F_l2_step_5':
					const F_l2_step_5 = new FleshCart(1, 9, true);
					chooseAbacus(step, F_l2_step_5.getFleshCart(M));
					break;
				case 'F_l2_step_6':
					const F_l2_step_6 = new FleshCart(10, 89, true);
					chooseAbacus(step, F_l2_step_6.getFleshCart(M));
					break;
				case 'F_l2_step_7':
					const F_l2_step_7 = new FleshCart(10, 89);
					chooseAbacus(step, F_l2_step_7.getFleshCart(M));
					break;*/
				default:
					console.log('Я таких значений не знаю');
			}
		});
	}
};

startFleshCart();