import {image} from "./other/image";
import anime from "animejs";
import {levelStep} from "./levelStep";
import {runFlash} from "./flesh_cart/trenazher_fleshCart";
import {runAbacus} from "./abacus/trenazher_abacus";
import Abacus from "./abacus/Abacus";

export const createStar = (teg) => {
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
};

const steps = document.querySelectorAll('.step[name]');

// ======================== TEST =============================================
for (let i = 0; i < steps.length; i++) {
	
	const choseStep = () => {
		document.querySelector('#app_simulator').innerHTML = null;
		let step = steps[i].getAttribute('name');
		switch (step) {
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
			case 'step_1_2':
				runAbacus(
					Object.keys(levelStep)[0],
					Object.keys(levelStep.level_1)[0],
					levelStep.level_1.step_1.abacus);
				break;
			case 'step_3':
				runAbacus(
					Object.keys(levelStep)[0],
					Object.keys(levelStep.level_1)[2],
					levelStep.level_1.step_1.abacus);
				break;
			case 'step_4':
				runAbacus(
					Object.keys(levelStep)[0],
					Object.keys(levelStep.level_1)[3],
					levelStep.level_1.step_1.abacus);
				break;
			case 'step_5_6':
				runAbacus(
					Object.keys(levelStep)[0],
					Object.keys(levelStep.level_1)[4],
					levelStep.level_1.step_1.abacus);
				break;
			case 'step_7_8':
				runAbacus(
					Object.keys(levelStep)[0],
					Object.keys(levelStep.level_1)[6],
					levelStep.level_1.step_1.abacus);
				break;
			case 'step_9':
				runAbacus(
					Object.keys(levelStep)[0],
					Object.keys(levelStep.level_1)[8],
					levelStep.level_1.step_1.abacus);
				break;
			case 'level_2':
				runAbacus(
					Object.keys(levelStep)[1],
					Object.keys(levelStep.level_2)[0],
					levelStep.level_2.step_1.abacus);
				break;
			case 'level_3':
				runAbacus(
					Object.keys(levelStep)[2],
					Object.keys(levelStep.level_3)[0],
					levelStep.level_3.step_1.abacus);
				break;
			case 'level_4':
				runAbacus(
					Object.keys(levelStep)[3],
					Object.keys(levelStep.level_4)[0],
					levelStep.level_4.step_1.abacus);
				break;
			case 'level_5':
				runAbacus(
					Object.keys(levelStep)[4],
					Object.keys(levelStep.level_5)[0],
					levelStep.level_5.step_1.abacus);
				break;
			case 'level_6':
				runAbacus(
					Object.keys(levelStep)[5],
					Object.keys(levelStep.level_6)[0],
					levelStep.level_6.step_1.abacus);
				break;
			case 'level_7':
				runAbacus(
					Object.keys(levelStep)[6],
					Object.keys(levelStep.level_7)[0],
					levelStep.level_7.step_1.abacus);
				break;
			case 'level_8':
				runAbacus(
					Object.keys(levelStep)[7],
					Object.keys(levelStep.level_8)[0],
					levelStep.level_8.step_1.abacus);
				break;
			case 'level_9':
				runAbacus(
					Object.keys(levelStep)[8],
					Object.keys(levelStep.level_9)[0],
					levelStep.level_9.step_1.abacus);
				break;
				case 'level_10':
				runAbacus(
					Object.keys(levelStep)[9],
					Object.keys(levelStep.level_10)[0],
					levelStep.level_10.step_1.abacus);
				break;
			default:
				console.log('Я таких значений не знаю');
		}
	};
	// steps[i].removeEventListener("click", choseStep, true);
	steps[i].addEventListener("click", choseStep);
}

// ======================== END TEST ==========================================