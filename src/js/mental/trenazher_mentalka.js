import Mental from "./Mental";


let Arr;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title'),
	inputAnswer = document.createElement('input'),
	trenazher_abacus = document.querySelector('#app_simulator'),
	checkingAnswer = document.querySelector('#button');


inputAnswer.classList.add('inputAnswer');


const chooseMental = (step, method) => {
	console.log(`==========${step}==========`);
	title.innerHTML = 'Mental-арифметика';
	Arr = method;
	createCartMental(Arr.countsArr);
};

// ==========================================================================
const createCartMental = (arrData) => {
	const time1 = 400;
	const time2 = time1 * 2;
	arrData.forEach(function (data, index) {
		setTimeout(() => {
			const cart = document.createElement('div');
			cart.classList.add('mental');
			cart.appendChild(document.createTextNode(data));
			setTimeout(() => {
				cart.style.display = 'none';
			}, time1);
			cart.style.display = 'flex';
			trenazher_abacus.appendChild(cart);
		}, index * time2);
	});
	setTimeout(() => {
		trenazher_abacus.appendChild(inputAnswer);
	}, arrData.length * time2);
};

// ==========================================================================
export const startMental = () => {
	for (let i = 0; i < steps.length; i++) {
		const table = document.querySelector('#app_simulator');
		let stepic;
		steps[i].addEventListener("click", () => {
			table.innerHTML = null;
			stepic = steps[i];
			const step = stepic.getAttribute('name');
			switch (step) {
				case 'M_step_1_2_3':
					const M_step_1_2_3 = new Mental();
					chooseMental(step, M_step_1_2_3.getMental(M));
					break;
				case 'M_step_4':
					const M_step_4 = new Mental();
					chooseMental(step, M_step_4.getMental(M));
					break;
				case 'M_step_5_6':
					const M_step_5_6 = new Mental();
					chooseMental(step, M_step_5_6.getMental(M));
					break;
				default:
					console.log('Я таких значений не знаю');
			}
		});
	}
};

// start1();
