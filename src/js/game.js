import {image}     from "./other/image";
import anime       from "animejs";
import {levelStep} from "./levelStep";
import {runFlash}  from "./flesh_cart/trenazher_fleshCart";
import {runAbacus} from "./abacus/trenazher_abacus";
import RunAbacus   from "./abacus/trenazher_abacus";


export function createStar(teg) {
	//create star
	const star = document.createElement('img');
	star.classList.add('star_img');
	star.setAttribute('src', image.honorStar.starPng);
	teg.appendChild(star);
	// move star
	const tablo = document.querySelector("#tablo img");
	const rect = tablo.getBoundingClientRect();
	const xxx = star.getBoundingClientRect();
	const y = rect.top - xxx.top - 40;
	const x = rect.left - xxx.left - 40;
	anime({
		targets: '.star_img',
		translateX: x,
		translateY: y,
		easing: 'easeInOutQuad',
		opacity: .5,
		// scale: 2,
		rotate: '2turn'
	});
	setTimeout(() => {
		star.classList.add('d-none')
	}, 1000);
}

export function openModal(runMethod, res) {
	const modalText = document.querySelector('.modal__text'),
		countAll = document.querySelector(".stars"),
		modal = document.querySelector('.modal'),
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
	
	
	repeatBtn.removeEventListener('click', repBtn);
	repeatBtn.addEventListener('click', repBtn);
	
	function repBtn(e) {
		modal.style.display = 'none';
		runMethod();
		check();
		return false;
	}
}


const steps = document.querySelectorAll('.step[name]');


function start() {
	
	let newExemplyar;
// ======================== TEST =============================================
	for (let i = 0; i < steps.length; i++) {
		const choseStep = () => {
			document.querySelector('#app_simulator').innerHTML = null;
			let step = steps[i].getAttribute('name');
			switch (step) {
				// ====================== flashCart ==========================
				case 'F_l1_step_1_2_3':
					runFlash(levelStep.level_1.step_1.fleshCart);
					break;
				case 'F_l1_step_4':
					runFlash(levelStep.level_1.step_1.fleshCart);
					break;
				case 'F_l1_step_5_6':
					runFlash(levelStep.level_1.step_1.fleshCart);
					break;
				case 'F_l1_step_7':
					runFlash(levelStep.level_1.step_1.fleshCart);
					break;
				case 'F_l1_step_8_9':
					runFlash(levelStep.level_1.step_1.fleshCart);
					break;
				// ====================== abacus ==========================
				case 'step_1_2':
					newExemplyar = new RunAbacus('level_1', 'step_1', 3);
					newExemplyar.startAbacus();
					break;
				case 'step_3':
					newExemplyar = new RunAbacus('level_1', 'step_3', 3);
					newExemplyar.startAbacus();
					break;
				case 'step_4':
					newExemplyar = new RunAbacus('level_1', 'step_4', 3);
					newExemplyar.startAbacus();
					break;
				case 'step_5_6':
					newExemplyar = new RunAbacus('level_1', 'step_5', 3);
					newExemplyar.startAbacus();
					break;
				case 'step_7_8':
					newExemplyar = new RunAbacus('level_1', 'step_7', 3);
					newExemplyar.startAbacus();
					break;
				case 'step_9':
					newExemplyar = new RunAbacus('level_1', 'step_9', 10, 3);
					newExemplyar.startAbacus();
					break;
				case 'level_2':
					newExemplyar = new RunAbacus('level_2', 'step_1', 10, 5);
					newExemplyar.startAbacus();
					break;
				case 'level_3':
					newExemplyar = new RunAbacus('level_6', 'step_1', 10, 7, 1, 9);
					newExemplyar.startAbacus();
					break;
				case 'level_4':
					newExemplyar = new RunAbacus('level_6', 'step_1', 10, 8, 1, 9, true);
					newExemplyar.startAbacus();
					break;
				case 'level_5':
					newExemplyar = new RunAbacus('level_6', 'step_1', 10, 10, 10, 89, true);
					newExemplyar.startAbacus();
					break;
				case 'level_6':
					newExemplyar = new RunAbacus('level_6', 'step_1', 10, 10, 10, 89);
					newExemplyar.startAbacus();
					break;
				case 'level_7':
					newExemplyar = new RunAbacus('level_7', 'step_1', 10, 10, 0.01, 9);
					newExemplyar.startAbacus();
					break;
				case 'level_8':
					newExemplyar = new RunAbacus('level_8', 'step_1', 10, 10, 0.01, 9, 99);
					newExemplyar.startAbacus();
					break;
				case 'level_9':
					newExemplyar = new RunAbacus('level_9', 'step_1', 10, 10, 10, 99.99);
					newExemplyar.startAbacus();
					break;
				case 'level_10':
					newExemplyar = new RunAbacus('level_10', 'step_1', 10, 10, 10, 999, 99);
					newExemplyar.startAbacus();
					break;
				default:
					console.log('Я таких значений не знаю');
			}
		};
		// steps[i].removeEventListener("click", choseStep, true);
		steps[i].addEventListener("click", choseStep);
	}
// ======================== END TEST ==========================================
	return false;
}

start();