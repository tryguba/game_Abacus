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

export function rozryad(r1, r2) {
	
	let count1 = 0;
	let count1Last = 0;
	let count2Last = 0;
	let count2 = 0;
	switch (r1) {
		case 1:
			count1 = 9;
			count1Last = 1;
			break;
		case 2:
			count1 = 89;
			count1Last = 10;
			break;
		case 3:
			count1 = 899;
			count1Last = 100;
			break;
		case 4:
			count1 = 8999;
			count1Last = 1000;
			break;
		case 5:
			count1 = 89999;
			count1Last = 19000;
			break;
		default:
			console.log('r1 hz no no no');
	}
	switch (r2) {
		case 1:
			count2 = 9;
			count2Last = 1;
			break;
		case 2:
			count2 = 89;
			count2Last = 10;
			break;
		case 3:
			count2 = 899;
			count2Last = 100;
			break;
		case 4:
			count2 = 8999;
			count2Last = 1000;
			break;
		default:
			console.log('r2 hz no no no');
	}
	return {
		count1,
		count1Last,
		count2Last,
		count2
	};
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
	
	const step = +document.querySelector('select[name=step]').value;
	const level = +document.querySelector('select[name=level]').value;
	const trenazhor = document.querySelector('select[name=trenazhor]').value;
	
	// console.log(`trenazhor=${trenazhor}`);
	// console.log(`level=${level}`);
	// console.log(`step=${step}`);
	
	startGame(trenazhor, level, step);
})

function startGame(trenazhor, level, step) {
	let data;
	document.querySelector('#app_simulator').innerHTML = null;
	// ====================== flashCart ==========================
	if (trenazhor === 'fleshCart') {
		let fleshCart = new RunFlashCart();
		if (level === 1) {
			switch (step) {
				case 1:
					fleshCart.startFlashCart(1, false);
					break;
				case 2:
					fleshCart.startFlashCart(1, false);
					break;
				case 3:
					fleshCart.startFlashCart(1, false);
					break;
				case 4:
					fleshCart.startFlashCart(2, false);
					break;
				case 5:
					fleshCart.startFlashCart(2, true);
					break;
				case 6:
					fleshCart.startFlashCart(2, true);
					break;
				case 7:
					fleshCart.startFlashCart(3, false);
					break;
				case 8:
					fleshCart.startFlashCart(3, true);
					break;
				case 9:
					fleshCart.startFlashCart(3, true);
					break;
				default:
					'level_1 doesn`t work'
			}
		}
		else if (level === 2) {
			switch (step) {
				case 1:
					fleshCart.startFlashCart(4, false);
					break;
				case 2:
					fleshCart.startFlashCart(4, false);
					break;
				case 3:
					fleshCart.startFlashCart(5, false);
					break;
				case 4:
					fleshCart.startFlashCart(5, true);
					break;
				case 5:
					fleshCart.startFlashCart(6, false);
					break;
				case 6:
					fleshCart.startFlashCart(6, true);
					break;
				case 7:
					fleshCart.startFlashCart(7, false);
					break;
				case 8:
					fleshCart.startFlashCart(7, true);
					break;
				case 9:
					fleshCart.startFlashCart(7, true);
					break;
				default:
					'level_2 doesn`t work'
			}
		}
		console.log(fleshCart);
	}
	
	// ====================== abacus ==========================
	else if (trenazhor === 'abacus') {
		let abacus = new RunAbacus({
			column: 10,
			level: 1,
			step: 1
		});
		if (level === 1) {
			switch (step) {
				case 1:
					abacus.startAbacus();
					break;
				case 2:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 3:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 4:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 5:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 6:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 7:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 8:
					abacus.step = step;
					abacus.startAbacus();
					break;
				case 9:
					abacus.step = step;
					abacus.row = 3;
					abacus.firstCount = 1;
					abacus.lastCount = 9;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				default:
					console.log('Я таких значений не знаю в 1 левеле abacus');
			}
		}
		else {
			switch (level) {
				case 2:
					abacus.level = level;
					abacus.row = 3;
					abacus.firstCount = 1;
					abacus.lastCount = 9;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				case 3:
					abacus.level = level;
					abacus.row = 7;
					abacus.firstCount = 1;
					abacus.lastCount = 9;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				case 4:
					abacus.level = level;
					abacus.row = 8;
					abacus.firstCount = 1;
					abacus.lastCount = 9;
					abacus.digit = true;
					abacus.startAbacus();
					break;
				case 5:
					abacus.level = level;
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 89;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				case 6:
					abacus.level = level;
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 89;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				case 7:
					abacus.level = level;
					abacus.row = 10;
					abacus.firstCount = 0.01;
					abacus.lastCount = 9;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				case 8:
					abacus.level = level;
					abacus.row = 10;
					abacus.firstCount = 0.01;
					abacus.lastCount = 9;
					abacus.digit = 99;
					abacus.startAbacus();
					break;
				case 9:
					abacus.level = level;
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 99.99;
					abacus.digit = false;
					abacus.startAbacus();
					break;
				case 10:
					abacus.level = level;
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 999;
					abacus.digit = 99;
					abacus.startAbacus();
					break;
			}
		}
		console.log(abacus);
	}
	
	// ====================== mental ==========================
	else if (trenazhor === 'mental') {
		let mental = new Mental({
			column: 10,
			level: 1,
			step: 1,
			row: 1
		});
		switch (level) {
			case 3:
				mental.level = level;
				mental.row = 3;
				mental.digit = false;
				mental.startMental();
				break;
			case 4:
				mental.level = level;
				mental.row = 5;
				mental.digit = true;
				mental.startMental();
				break;
			case 5:
				mental.level = level;
				mental.row = 6;
				mental.digit = true;
				mental.startMental();
				break;
			case 6:
				mental.level = level;
				mental.row = 8;
				mental.digit = true;
				mental.startMental();
				break;
			case 7:
				mental.level = level;
				mental.row = 8;
				mental.digit = true;
				mental.startMental();
				break;
			case 8:
				mental.level = level;
				mental.row = 10;
				mental.digit = true;
				mental.startMental();
				break;
			case 9:
				mental.level = level;
				mental.row = 6;
				mental.digit = false;
				mental.startMental();
				break;
			case 10:
				mental.level = level;
				mental.row = 10;
				mental.digit = true;
				mental.startMental();
				break;
		}
		console.log(mental);
	}
	
	// ==================== умножение ========================
	else if (trenazhor === 'umnozhenye') {
		let umn = new Umnozheniye({
			M: 10,
			r1: 2,
			r2: 1
		});
		
		if (level === 4 && step > 2) {
			umn.level = level;
			umn.r1 = 2;
			umn.startUmnozheniye();
		}
		if (level === 5) {
			umn.level = level;
			umn.r1 = 3;
			umn.startUmnozheniye();
		}
		if (level === 6) {
			umn.level = level;
			umn.r1 = 4;
			umn.startUmnozheniye();
		}
		if (level === 7) {
			umn.level = level;
			if (step < 3) {
				umn.r1 = 4;
				umn.r2 = 1;
			}
			else {
				umn.r1 = 2;
				umn.r2 = 2;
			}
			umn.startUmnozheniye();
		}
		if (level === 8) {
			umn.level = level;
			if (step === 1) {
				umn.r1 = 3;
				umn.r2 = 2;
			}
			else if(step === 2){
				umn.r1 = 2;
				umn.r2 = 3;
			}
			else {
				umn.change = true;
			}
			umn.startUmnozheniye();
		}
		if (level === 9) {
			umn.level = level;
			if (step === 1) {
				umn.r1 = 2;
				umn.r2 = 4;
			}
			else if (step === 2) {
				umn.r1 = 3;
				umn.r2 = 3;
			}
			else if (step === 3) {
				umn.r1 = 4;
				umn.r2 = 2;
			}
			else {
				umn.change = true;
			}
			umn.startUmnozheniye();
		}
		if (level === 10) {
			umn.level = level;
			if (step === 1) {
				umn.r1 = 4;
				umn.r2 = 3;
			}
			else if(step === 2){
				umn.r1 = 5;
				umn.r2 = 2;
			}
			else {
				umn.change = true;
			}
			umn.startUmnozheniye();
		}
		console.log(umn);
	}
	
	else if (trenazhor === 'mental') {
		newExempl = new Mental();
		
		if (level === '444') {
			switch (step) {
				// ====================== Abacus - умножение ==========================
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


