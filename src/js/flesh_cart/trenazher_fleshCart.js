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

export function runFlash(level, step, trenazher){
	let Arr;
	const title = document.querySelector('.title'),
		checkingAnswer = document.querySelector('#button'),
		modal = document.querySelector('.modal'),
		table = document.querySelector('#app_simulator');
	
	function startFlashCart(levelStep){
		
		levelStep = new FleshCart();
		Arr = levelStep.getFleshCart();
		title.innerHTML = `Флеш - карты`;
		
		let count = 8;
		let loser = 0;
		let res = 0;
		
		function createColumn (colData) {
			const main = document.querySelector('#main');
			const row = document.createElement('div'),
				cell = document.createElement('div'),
				input = document.createElement("input");
			row.classList.add('column-flash');
			cell.classList.add('column-flash__input');
			input.setAttribute("type", "number");
			input.setAttribute("autofocus", "");
			
			colData.forEach((stepData) => {
				
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
			const button = document.querySelector('#button');
			if (!button) {
				const button = document.createElement('div');
				button.setAttribute('id', 'button');
				button.innerText = 'ПРОВЕРИТЬ';
				main.appendChild(button);
			}
			
		}
		
		createColumn(Arr.countsArr[count]);
		
		function checkValue (e) {
			
			e.stopPropagation();
			
			const tt = table.lastChild;
			let	inp = tt.lastChild.lastChild;
			if (+Arr.sumArr[count] === +inp.value && inp.value !== '') {
				// tt.style.display = 'none';
				tt.remove();
				createStar(table);
				// new Audio(sound.tune.Zv_3).play();
				count++;
				//виводитсься после окончания уровнений
				if (count === Arr.countsArr.length) {
					res = count - loser;
					checkingAnswer.removeEventListener('click', checkValue);
					if (loser <= 2) {
						const text = "Круто!";
						// const text1 = "Вот это да!";
						showModalWindow(res, text, audio_Au_t_8);
					}
					else if (5 >= loser && loser <= 8) {
						const text = "Умница!";
						// const text1 = "Молодец!";
						showModalWindow(res, text, audio_Au_t_7);
					}
					else {
						let text = "Хорошо, давай попробуем еще раз?";
						showModalWindow(res, text, audio_Au_t_5);
					}
					return;
				}
				setTimeout(() => {
					createColumn(Arr.countsArr[count]);
				}, 1000);
				// ======================================
			}
			else {
				// new Audio(sound.tune.Zv_2).play();
				inp.style.background = '#d24a43';
				inp.style.color = '#fff';
				inp.value = '';
				loser++;
			}
		}
		checkingAnswer.addEventListener('click', checkValue);
		return true;
	}
	
	startFlashCart(level, step, trenazher);
	
	function showModalWindow(res, text, soundName){
		const repeat = (e, step) => {
			e.stopPropagation();
			modal.style.display = 'none';
			table.innerHTML = '';
			startFlashCart(step);
		};
		const modalText = document.querySelector('.modal__text'),
			countAll = document.querySelector(".stars"),
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
			`Ты набрал ${res} ${starWord}!
		${text}`;
		countAll.innerHTML = res;
		soundName.play();
		repeatBtn.addEventListener('click', repeat);
	}
}


/*
// runFlash(levelStep.level_1.step_1.fleshCart);

// ======================== TEST =============================================
/!*
for (let i = 0; i < steps.length; i++) {
	const choseStep = () => {
		let step = steps[i].getAttribute('name');
		switch (step) {
			case 'F_l1_step_1_2_3':
				startFlashCart('F_l1_step_1_2_3');
				break;
			case 'F_l1_step_4':
				startFlashCart('F_l1_step_4');
				break;
			case 'F_l1_step_5_6':
				startFlashCart('F_l1_step_5_6');
				break;
			case 'F_l1_step_7':
				startFlashCart('F_l1_step_7');
				break;
			case 'F_l1_step_8_9':
				startFlashCart('F_l1_step_7');
				break;
			/!*!// ==================== level 2 ================================
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
				break;*!/
			default:
				console.log('Я таких значений не знаю');
		}
	};
	// steps[i].removeEventListener("click", choseStep, true);
	steps[i].addEventListener("click", choseStep);
}
*!/
// ======================== END TEST ==========================================*/




