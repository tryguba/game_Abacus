import {image}      from "./other/image";
import anime        from "animejs";
import {levelStep}  from "./levelStep";
import RunFlashCart from "./flesh_cart/RunFlashCart"
import RunAbacus    from "./abacus/RunAbacus";
import Mental       from "./mental/Mental"
import Umnozheniye  from "./umnozheniye/Umnozheniye"
import Abacus       from "./abacus/Abacus"
import Deleniye     from "./deleniye/Deleniye";


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

const form = document.querySelector('#form input');

form.addEventListener('click', function (e) {
	e.preventDefault();
	
	const step = +document.querySelector('select[name=step]').value;
	const level = +document.querySelector('select[name=level]').value;
	const trenazhor = document.querySelector('select[name=trenazhor]').value;
	
	startGame(trenazhor, level, step);
})

function startGame(trenazhor, level, step) {
	let data;
	let main = document.querySelector('#app_simulator');
	main.innerHTML = null;
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
	
	// ====================== mental ==========================
	else if (trenazhor === 'mental') {
		let mental = new Mental({
			column: 10,
			step: 1,
			row: 1,
			digit: true
		});
		switch (level) {
			case 3:
				mental.row = 3;
				mental.digit = false;
				break;
			case 4:
				mental.row = 5;
				break;
			case 5:
				mental.row = 6;
				break;
			case 6:
				mental.row = 8;
				break;
			case 7:
				mental.row = 8;
				break;
			case 8:
				mental.row = 10;
				break;
			case 9:
				mental.row = 6;
				mental.digit = false;
				break;
			case 10:
				mental.row = 10;
				break;
		}
		mental.level = level;
		mental.step = step;
		mental.startMental();
		console.log(mental);
	}
	
	// ====================== abacus ==========================
	else if (trenazhor === 'abacus') {
		let abacus = new RunAbacus({
			column: 10,
			firstCount: 1,
			lastCount: 9,
			digit: false
		});
		if (level === 1) {
			abacus.row = 3;
		}
		else {
			switch (level) {
				case 2:
					abacus.row = 3;
					break;
				case 3:
					abacus.row = 7;
					break;
				case 4:
					abacus.row = 8;
					abacus.digit = true;
					break;
				case 5:
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 89;
					break;
				case 6:
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 89;
					break;
				case 7:
					abacus.row = 10;
					abacus.firstCount = 0.01;
					abacus.lastCount = 9;
					break;
				case 8:
					abacus.row = 10;
					abacus.firstCount = 0.01;
					abacus.lastCount = 9;
					abacus.digit = 99;
					break;
				case 9:
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 99.99;
					break;
				case 10:
					abacus.row = 10;
					abacus.firstCount = 10;
					abacus.lastCount = 999;
					abacus.digit = 99;
					break;
			}
		}
		abacus.level = level;
		abacus.step = step;
		abacus.startAbacus();
		console.log(abacus);
	}
	
	// ==================== умножение ========================
	else if (trenazhor === 'umnozhenye') {
		let umn = new Umnozheniye({
			M: 10,
			r1: 2,
			r2: 1
		});
		if (level === 4 && step > 2) {
			umn.r1 = 2;
		}
		if (level === 5) {
			umn.r1 = 3;
		}
		if (level === 6) {
			umn.r1 = 4;
		}
		if (level === 7) {
			if (step < 3) {
				umn.r1 = 4;
				umn.r2 = 1;
			}
			else {
				umn.r1 = 2;
				umn.r2 = 2;
			}
		}
		if (level === 8) {
			if (step === 1) {
				umn.r1 = 3;
				umn.r2 = 2;
			}
			else if (step === 2) {
				umn.r1 = 2;
				umn.r2 = 3;
			}
			else {
				umn.change = true;
			}
		}
		if (level === 9) {
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
		}
		if (level === 10) {
			if (step === 1) {
				umn.r1 = 4;
				umn.r2 = 3;
			}
			else if (step === 2) {
				umn.r1 = 5;
				umn.r2 = 2;
			}
			else {
				umn.change = true;
			}
		}
		umn.level = level;
		umn.startUmnozheniye();
		console.log(umn);
	}
	
	// ==================== деление ========================
	else if (trenazhor === 'deleniye') {
		let del = new Deleniye({
			M: 10,
			level: level,
			step: step,
			digit: false
		});
		if (level === 4 && step > 5) {
			del.R = 2;
			del.r1 = 1;
		}
		else if (level === 5) {
			if (step > 2) {
				del.R = 3;
				del.r1 = 1;
			}
			else {
				del.R = 2;
				del.r1 = 1;
			}
		}
		else if (level === 6) {
			if (step > 3) {
				del.R = 4;
				del.r1 = 1;
			}
			else {
				del.R = 3;
				del.r1 = 1;
			}
		}
		else if (level === 7) {
			if (step > 5) {
				del.R = 2;
				del.r1 = 2;
			}
			else {
				del.R = 4;
				del.r1 = 1;
			}
		}
		else if (level === 8) {
			if (step < 4) {
				del.R = 2;
				del.r1 = 2;
			}
			else if (step === 4) {
				del.R = 3;
				del.r1 = 2;
			}
			else if (step === 5) {
				del.R = 4;
				del.r1 = 2;
			}
			else {
				del.digit = true;
				del.a1 = 3;
				del.a2 = 2;
				del.b1 = 4;
				del.b2 = 2;
			}
		}
		else if (level === 9) {
			if (step < 4) {
				del.digit = true;
				del.a1 = 3;
				del.a2 = 2;
				del.b1 = 4;
				del.b2 = 2;
			}
			else if (step === 4) {
				del.R = 5;
				del.r1 = 2;
			}
			else if (step === 5) {
				del.R = 5;
				del.r1 = 3;
			}
			else {
				del.digit = true;
				del.a1 = 5;
				del.a2 = 3;
				del.b1 = 5;
				del.b2 = 2;
			}
		}
		else if (level === 10) {
			if (step < 4) {
				del.digit = true;
				del.a1 = 5;
				del.a2 = 3;
				del.b1 = 5;
				del.b2 = 2;
			}
			else if (step === 4) {
				del.R = 6;
				del.r1 = 2;
			}
			else if (step === 5) {
				del.R = 6;
				del.r1 = 3;
			}
			else {
				del.digit = true;
				del.a1 = 6;
				del.a2 = 2;
				del.b1 = 6;
				del.b2 = 3;
			}
		}
		else {
			let tab = createHtmlElement(`
						<div class="deleniye__count">
							choose level or step
						</div>
				`);
			main.appendChild(tab);
			return true;
		}
		del.startDeleniye();
		console.log(del);
	}
}


