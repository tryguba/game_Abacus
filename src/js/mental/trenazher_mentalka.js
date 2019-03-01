import Mental from "./Mental";


let Arr;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title'),
	inputAnswer = document.createElement('input'),
	trenazher = document.querySelector('#app_simulator'),
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
			trenazher.appendChild(cart);
		}, index * time2);
	});
	setTimeout(() => {
		trenazher.appendChild(inputAnswer);
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
				case 'M_level_3':
					const M_level_3 = new Mental();
					chooseMental(step, M_level_3.getMental(M));
					break;
				case 'M_level_4':
					const M_level_4 = new Mental();
					chooseMental(step, M_level_4.getMental(M));
					break;
				case 'M_level_5':
					const M_level_5 = new Mental();
					chooseMental(step, M_level_5.getMental(M));
					break;
				default:
					console.log('Я таких значений не знаю');
			}
		});
	}
};

// startMental();
