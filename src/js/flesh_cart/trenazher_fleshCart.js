import FleshCart from "./FleshCart";
import {sound} from "../sound";
import {image} from "../image";
import anime from '../../../node_modules/animejs/lib/anime.es.js';

// import $ from "../../../node_modules/jquery"
// ======================================================================
const audio_Au_t_3 = new Audio(sound.trenazhor.Au_t_3);
const audio_Au_t_4 = new Audio(sound.trenazhor.Au_t_4);
const audio_Au_t_5 = new Audio(sound.trenazhor.Au_t_5);
const audio_Au_t_6 = new Audio(sound.trenazhor.Au_t_6);
const audio_Au_t_7 = new Audio(sound.trenazhor.Au_t_7);
const audio_Au_t_8 = new Audio(sound.trenazhor.Au_t_8);
const audio_Au_t_9 = new Audio(sound.trenazhor.Au_t_9);
const Zv_2 = new Audio(sound.tune.Zv_2);
const Zv_3 = new Audio(sound.tune.Zv_3);
// ======================================================================
const starGif = image.honorStar.starGif;
const starPng = image.honorStar.starPng;
const starSvg = image.honorStar.starSvg;

// ======================================================================
/*const rocketcss = (rocket, target, theclass) =>{
	
	let cloned = $(rocket).clone();
	
	let offset_target = $(target).offset();
	let offset_rocket = $(rocket).offset();
	
	cloned.insertAfter(rocket);
	$(rocket).css({"display": "none"});
	cloned.css({
		"position": "fixed",
		"z-index": "999999",
		"top": offset_rocket.top + "px",
		"left": offset_rocket.left + "px",
		"right": "auto",
		"bottom": "auto",
		"margin": "auto",
		"padding": "auto",
		"opacity": "1"
	}).animate({'top': offset_target.top + 'px',
				'left': offset_target.left + 'px'}, 1500);
	cloned.addClass('mover ' + (theclass || 'rocketPulseHole'));
	setTimeout(function () {
		cloned.fadeOut(300);
	}, 1500);
	return cloned;
};*/

// ======================================================================

const moveStar  = (star) => {
	
	let tablo = document.querySelector( "#tablo" );
	let rect = tablo.getBoundingClientRect();
	
	tablo.style.top = rect.top + "px";
	tablo.style.left = rect.left + "px";
	console.log(rect);
	anime({
		targets: '.star_img',
		translateX: 350,
		translateY: -250,
		scale: 2,
		rotate: '2turn'
	});
	setTimeout(()=>{
		star.classList.add('d-none')
	}, 1000)
};
// ======================================================================

let Arr;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title'),
	checkingAnswer = document.querySelector('#button');


const table = document.querySelector('#app_simulator');

const showModalWindow = (count, looser, text, soundName) => {
	
	const nextButton = document.createElement("button");
	nextButton.innerHTML = "Продолжить";
	nextButton.classList.add('button', 'nextButton');
	const nextRepeat = document.createElement("button");
	nextRepeat.innerHTML = "Повторить";
	nextRepeat.classList.add('button', 'nextRepeat');
	const modalButtons = document.createElement("div");
	modalButtons.classList.add('modal__buttons');
	const modal = document.createElement('div');
	modal.classList.add('modal');
	const modalText = document.createElement('p');
	modalText.classList.add('modal__text');
	
	let res = count - looser;
	if (res < 0) {
		res = 0;
	}
	let star = 'звезд';
	if (res === 1) {
		star = `звезду`;
	} else if (res <= 4 && res >= 2) {
		star = `звезды`;
	}
	modalText.innerText = `Ты набрал ${res} ${star}!
	${text}`;
	
	modal.appendChild(modalText);
	modalButtons.appendChild(nextRepeat);
	modalButtons.appendChild(nextButton);
	modal.appendChild(modalButtons);
	table.appendChild(modal);
	
	soundName.play();
};

const createColumn = (column) => {
	const row = document.createElement('div'),
		cell = document.createElement('div'),
		input = document.createElement("input");
	row.classList.add('column-flash');
	cell.classList.add('column-flash__input');
	input.setAttribute("type", "number");
	input.setAttribute("autofocus", "");
	
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

const createStar = (teg) => {
	const star = document.createElement('img');
	star.classList.add('star_img');
	star.setAttribute('src', starPng);
	teg.appendChild(star);

// ======================================================================
	moveStar(star);
// ======================================================================
	// rocketcss(star, '#tablo', 'rocketRotate');
	// $('#tablo').addClass('targetPulse');
// ======================================================================

};


const createTableFlashCart = (tableData) => {
	let count = 6;
	let looser = 0;
	createColumn(tableData[count]);
	checkingAnswer.addEventListener('click', () => {
		
		const tt = table.lastChild,
			row = tt.lastChild,
			inp = row.lastChild;
		
		if (+Arr.sumArr[count] === +inp.value) {
			
			
			tt.style.display = 'none';
			
			createStar(table);
			Zv_3.play();
			count++;
			
			
			//виводитсься после окончания уровнений
			if (count === tableData.length) {
				document.querySelector('.column-flash').remove();
				if (looser <= 2) {
					let text = "Круто!";
					let text1 = "Вот это да!";
					// =======================================================
					showModalWindow(count, looser, text, audio_Au_t_8);
					// =======================================================
					looser = 0;
					count = 0;
				} else if (5 >= looser && looser <= 8) {
					let text = "Умница!";
					let text1 = "Молодец!";
					// =======================================================
					showModalWindow(count, looser, text, audio_Au_t_7);
					// =======================================================
					looser = 0;
					count = 0;
				} else if (looser => 9) {
					let text = "Хорошо, давай попробуем еще раз?";
					// =======================================================
					showModalWindow(count, looser, text, audio_Au_t_5);
					// =======================================================
					looser = 0;
					count = 0;
				}
				return false;
			}
			
			setTimeout(() => {
				createColumn(tableData[count]);
				console.log(`zbs=${count}`);
			}, 2000);
			
			
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