import {image}      from "./other/image";
import anime        from "animejs";
import {levelStep}  from "./levelStep";
import RunFlashCart from "./flesh_cart/RunFlashCart"
import RunAbacus    from "./abacus/RunAbacus";
import Mental       from "./mental/Mental"
import Umnozheniye  from "./umnozheniye/Umnozheniye"
import Abacus       from "./abacus/Abacus"


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


// const menu = document.querySelector('#header');
// menu.addEventListener('click', function (e) {
// 	const name = e.target;
// 	let step = name.getAttribute('name');
// 	startGame(step);
// })

// let step = document.querySelector('select[name=step]').value;
// let level = document.querySelector('select[name=level]').value;
// let trenazhor = document.querySelector('select[name=trenazhor]').value;


const form = document.querySelector('#form input');

form.addEventListener('click', function (e) {
	e.preventDefault();
	
	const step = document.querySelector('select[name=step]').value;
	const level = document.querySelector('select[name=level]').value;
	const trenazhor = document.querySelector('select[name=trenazhor]').value;
	
	
	console.log(`trenazhor=${trenazhor}`);
	console.log(`level=${level}`);
	console.log(`step=${step}`);
	
	
	startGame(trenazhor, level, step);
})

function startGame(trenazhor, level, step) {
	let newExempl;
	let data;
	document.querySelector('#app_simulator').innerHTML = null;
	// ====================== flashCart ==========================
	if (trenazhor === 'fleshCart') {
		newExempl = new RunFlashCart();
		if (level === '1') {
			switch (step) {
				case '1':
					newExempl.startFlashCart(1, false);
					break;
				case '2':
					newExempl.startFlashCart(1, false);
					break;
				case '3':
					newExempl.startFlashCart(1, false);
					break;
				case '4':
					newExempl.startFlashCart(2, false);
					break;
				case '5':
					newExempl.startFlashCart(2, true);
					break;
				case '6':
					newExempl.startFlashCart(2, true);
					break;
				case '7':
					newExempl.startFlashCart(3, false);
					break;
				case '8':
					newExempl.startFlashCart(3, true);
					break;
				case '9':
					newExempl.startFlashCart(3, true);
					break;
				default:
					'level_1 doesn`t work'
			}
		}
		else if (level === '2') {
			switch (step) {
				case '1':
					newExempl.startFlashCart(4, false);
					break;
				case '2':
					newExempl.startFlashCart(4, false);
					break;
				case '3':
					newExempl.startFlashCart(5, false);
					break;
				case '4':
					newExempl.startFlashCart(5, true);
					break;
				case '5':
					newExempl.startFlashCart(6, false);
					break;
				case '6':
					newExempl.startFlashCart(6, true);
					break;
				case '7':
					newExempl.startFlashCart(7, false);
					break;
				case '8':
					newExempl.startFlashCart(7, true);
					break;
				case '9':
					newExempl.startFlashCart(7, true);
					break;
				default:
					'level_2 doesn`t work'
			}
		}
	}
	
	// ====================== abacus ==========================
	else if (trenazhor === 'abacus') {
		if (level === '1') {
			switch (step) {
				case '1':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 1
					});
					newExempl.startAbacus();
					break;
				case '2':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 2
					});
					newExempl.startAbacus();
					break;
				case '3':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 3
					});
					newExempl.startAbacus();
					break;
				case '4':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 4
					});
					newExempl.startAbacus();
					break;
				case '5':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 5
					});
					newExempl.startAbacus();
					break;
				case '6':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 6
					});
					newExempl.startAbacus();
					break;
				case '7':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 7
					});
					newExempl.startAbacus();
					break;
				case '8':
					newExempl = new RunAbacus({
						column: 10,
						level: 1,
						step: 8
					});
					newExempl.startAbacus();
					break;
				case '9':
					newExempl = new RunAbacus({
						column: 10,
						row: 3,
						firstCount: 1,
						lastCount: 9,
						level: 1,
						step: 9,
						digit: false
					});
					newExempl.startAbacus();
					break;
				default:
					console.log('Я таких значений не знаю в 1 левеле abacus');
			}
		}
		else {
			switch (level) {
				case '2':
					newExempl = new RunAbacus({
						column: 3,
						row: 3,
						firstCount: 1,
						lastCount: 9,
						level: 2,
						digit: false,
					});
					newExempl.startAbacus();
					break;
				case '3':
					newExempl = new RunAbacus({
						column: 10,
						row: 7,
						firstCount: 1,
						lastCount: 9,
						level: 3,
						digit: false,
					});
					newExempl.startAbacus();
					break;
				case '4':
					newExempl = new RunAbacus({
						column: 10,
						row: 8,
						firstCount: 1,
						lastCount: 9,
						level: 4,
						digit: true,
					});
					newExempl.startAbacus();
					break;
				case '5':
					newExempl = new RunAbacus({
						column: 10,
						row: 10,
						firstCount: 10,
						lastCount: 89,
						level: 5,
						digit: form,
					});
					newExempl.startAbacus();
					break;
				case '6':
					newExempl = new RunAbacus({
						column: 10,
						row: 10,
						firstCount: 10,
						lastCount: 89,
						level: 6,
						digit: false,
					});
					newExempl.startAbacus();
					break;
				case '7':
					newExempl = new RunAbacus({
						column: 10,
						row: 10,
						firstCount: 0.01,
						lastCount: 9,
						level: 7,
						
					});
					newExempl.startAbacus();
					break;
				case '8':
					newExempl = new RunAbacus({
						column: 10,
						row: 10,
						firstCount: 0.01,
						lastCount: 9,
						level: 8,
						digit: 99
					});
					newExempl.startAbacus();
					break;
				case '9':
					newExempl = new RunAbacus({
						column: 10,
						row: 10,
						firstCount: 10,
						lastCount: 99.99,
						level: 9,
						
					});
					newExempl.startAbacus();
					break;
				case '10':
					newExempl = new RunAbacus({
						column: 10,
						row: 10,
						firstCount: 10,
						lastCount: 999,
						level: 10,
						digit: 99
					});
					newExempl.startAbacus();
					break;
			}
		}
	}
	
	// ====================== mental ==========================
	else if (trenazhor === 'mental') {
		switch (level) {
			case '3':
				newExempl = new Mental({
					column: 5,
					row: 3,
					level: 3,
					digit: false,
				});
				newExempl.startMental();
				break;
			case '4':
				newExempl = new Mental({
					column: 10,
					row: 5,
					level: 4,
					digit: true,
				});
				newExempl.startMental();
				break;
			case '5':
				newExempl = new Mental({
					column: 10,
					row: 6,
					level: 5,
					digit: true,
				});
				newExempl.startMental();
				break;
			case '6':
				newExempl = new Mental({
					column: 10,
					row: 8,
					level: 6,
					digit: true,
				});
				newExempl.startMental();
				break;
			case '7':
				newExempl = new Mental({
					column: 10,
					row: 8,
					level: 7,
					digit: true,
				});
				newExempl.startMental();
				break;
			case '8':
				newExempl = new Mental({
					column: 10,
					row: 10,
					level: 8,
					digit: true,
				});
				newExempl.startMental();
				break;
			case '9':
				newExempl = new Mental({
					column: 10,
					row: 6,
					level: 9,
					digit: false,
				});
				newExempl.startMental();
				break;
			case '10':
				newExempl = new Mental({
					column: 10,
					row: 10,
					level: 10,
					digit: true,
				});
				newExempl.startMental();
				break;
		}
	}
	
	// ==================== умножение ========================
	else if (trenazhor === 'umnozhenye') {
		switch (level) {
			case '3':
				newExempl = new Mental({
					column: 5,
					row: 3,
					level: 3,
					digit: false,
				});
				newExempl.startMental();
				break;
			case '3':
				newExempl = new Mental({
					column: 5,
					row: 3,
					level: 3,
					digit: false,
				});
				newExempl.startMental();
				break;
		}
	}
	
	
	else if (trenazhor === 'mental') {
		newExempl = new Mental();
		
		if (level === '444') {
			switch (step) {
				// ====================== Abacus - умножение ==========================
				case
				'Umn_level_4'
				:
					newExempl = new Umnozheniye({
						level: 'level_4',
						M: 10,
						r1: 2,
						r2: 1
					});
					newExempl.startUmnozheniye();
					break;
				case
				'Umn_level_5'
				:
					newExempl = new Umnozheniye({
						level: 'level_5',
						M: 10,
						r1: 3,
						r2: 1
					});
					newExempl.startUmnozheniye();
					break;
				case
				'Umn_level_6'
				:
					newExempl = new Umnozheniye({
						level: 'level_6',
						M: 10,
						r1: 4,
						r2: 1
					});
					newExempl.startUmnozheniye();
					break;
				case
				'Umn_level_7'
				:
					newExempl = new Umnozheniye({
						level: 'level_4',
						M: 10,
						r1: 2,
						r2: 2
					});
					newExempl.startUmnozheniye();
					break;
				case
				'Umn_level_8'
				:
					newExempl = new Umnozheniye({
						level: 'level_4',
						M: 10,
						r1: 3,
						r2: 2
					});
					newExempl.startUmnozheniye();
					break;
				case
				'Umn_level_9'
				:
					newExempl = new Umnozheniye('level_9', 10, 6);
					newExempl.startUmnozheniye();
					break;
				case
				'Umn_level_10'
				:
					newExempl = new Umnozheniye('level_10', 10, 10, true);
					newExempl.startUmnozheniye();
					break;
				default:
					console.log('Я таких значений не знаю');
			}
			
		}
	}
}


