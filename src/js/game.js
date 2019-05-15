import {image}      from "./other/image";
import anime        from "animejs";
import {levelStep}  from "./levelStep";
import RunFlashCart from "./flesh_cart/trenazher_fleshCart"
import RunAbacus    from "./abacus/trenazher_abacus";
import RunMental    from "./mental/trenazher_mentalka"

export const createHtmlElement = (str) => {
	const el = document.createElement('div');
	el.innerHTML = str;
	return el.firstElementChild;
};


export function createStar(teg, starCount) {
	//create star
	const stars = document.querySelector('.stars');
	const star = createHtmlElement(`<img class="star_imgFlash" src="${image.honorStar.starPng}"></img>`);
	teg.appendChild(star);
	
	const getCoords = (elem) => {
		let box = elem.getBoundingClientRect();
		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}
	
	// move star
	const tablo = document.querySelector("#tablo img");
	const x = getCoords(tablo).left - getCoords(star).left - 40;
	const y = getCoords(tablo).top - getCoords(star).top - 40;
	
	anime({
		targets: '.star_imgFlash',
		translateX: x,
		translateY: y,
		easing: 'easeInOutQuad',
		opacity: .5,
		scale: 1.5,
		rotate: '2turn'
	});
	setTimeout(() => {
		stars.innerHTML = starCount;
		star.remove();
	}, 1000);
}

const menu = document.querySelector('#header');
menu.addEventListener('click', function (e) {
	const name = e.target;
	let step = name.getAttribute('name');
	startGame(step);
})

function startGame(step) {
	let newExempl;
	document.querySelector('#app_simulator').innerHTML = null;
	switch (step) {
		// ====================== flashCart ==========================
		case 'F_l1_step_1_2_3':
			newExempl = new RunFlashCart(1);
			newExempl.startFlashCart();
			break;
		case 'F_l1_step_4':
			newExempl = new RunFlashCart(2);
			newExempl.startFlashCart();
			break;
		case 'F_l1_step_5_6':
			newExempl = new RunFlashCart(2, true);
			newExempl.startFlashCart();
			break;
		case 'F_l1_step_7':
			newExempl = new RunFlashCart(3);
			newExempl.startFlashCart();
			break;
		case 'F_l1_step_8_9':
			newExempl = new RunFlashCart(3, true);
			newExempl.startFlashCart();
			break;
		// ====================== flashCart l2==========================
		case 'F_l2_step_1_2':
			newExempl = new RunFlashCart(4);
			newExempl.startFlashCart();
			break;
		case 'F_l2_step_3':
			newExempl = new RunFlashCart(5);
			newExempl.startFlashCart();
			break;
		case 'F_l2_step_4':
			newExempl = new RunFlashCart(5, true);
			newExempl.startFlashCart();
			break;
		case 'F_l2_step_5':
			newExempl = new RunFlashCart(6);
			newExempl.startFlashCart();
			break;
		case 'F_l2_step_6':
			newExempl = new RunFlashCart(6, true);
			newExempl.startFlashCart();
			break;
		case 'F_l2_step_7':
			newExempl = new RunFlashCart(7);
			newExempl.startFlashCart();
			break;
		case 'F_l2_step_8_9':
			newExempl = new RunFlashCart(7, true);
			newExempl.startFlashCart();
			break;
		// ====================== abacus ==========================
		case 'step_1_2':
			newExempl = new RunAbacus('level_1', 'step_1', 10);
			newExempl.startAbacus();
			break;
		case 'step_3':
			newExempl = new RunAbacus('level_1', 'step_3', 10);
			newExempl.startAbacus();
			break;
		case 'step_4':
			newExempl = new RunAbacus('level_1', 'step_4', 10);
			newExempl.startAbacus();
			break;
		case 'step_5_6':
			newExempl = new RunAbacus('level_1', 'step_5', 10);
			newExempl.startAbacus();
			break;
		case 'step_7_8':
			newExempl = new RunAbacus('level_1', 'step_7', 10);
			newExempl.startAbacus();
			break;
		case 'step_9':
			newExempl = new RunAbacus('level_1', 'step_9', 10, 3);
			newExempl.startAbacus();
			break;
		case 'level_2':
			newExempl = new RunAbacus('level_2', 'step_1', 10, 5);
			newExempl.startAbacus();
			break;
		case 'level_3':
			newExempl = new RunAbacus('level_6', 'step_1', 10, 7, 1, 9);
			newExempl.startAbacus();
			break;
		case 'level_4':
			newExempl = new RunAbacus('level_6', 'step_1', 10, 8, 1, 9, true);
			newExempl.startAbacus();
			break;
		case 'level_5':
			newExempl = new RunAbacus('level_6', 'step_1', 10, 10, 10, 89, true);
			newExempl.startAbacus();
			break;
		case 'level_6':
			newExempl = new RunAbacus('level_6', 'step_1', 10, 10, 10, 89);
			newExempl.startAbacus();
			break;
		case 'level_7':
			newExempl = new RunAbacus('level_7', 'step_1', 10, 10, 0.01, 9);
			newExempl.startAbacus();
			break;
		case 'level_8':
			newExempl = new RunAbacus('level_8', 'step_1', 10, 10, 0.01, 9, 99);
			newExempl.startAbacus();
			break;
		case 'level_9':
			newExempl = new RunAbacus('level_9', 'step_1', 10, 10, 10, 99.99);
			newExempl.startAbacus();
			break;
		case 'level_10':
			newExempl = new RunAbacus('level_10', 'step_1', 10, 10, 10, 999, 99);
			newExempl.startAbacus();
			break;
		
		// ====================== mental ==========================
		case 'M_level_3':
			newExempl = new RunMental('level_3');
			newExempl.startMental();
			break;
		case 'M_level_4':
			newExempl = new RunMental('level_4');
			newExempl.startMental();
			break;
		case 'M_level_5':
			newExempl = new RunMental('level_5');
			newExempl.startMental();
			break;
		default:
			console.log('Я таких значений не знаю');
	}
}

