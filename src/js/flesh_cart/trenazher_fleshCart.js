import FleshCart from "./FleshCart";


let Arr, N;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title'),
	trenazher = document.querySelector('#app_simulator'),
	checkingAnswer = document.querySelector('#button');

const checkValueArr = (arr, arr2) => {
	if (arr.length !== arr2.length) return false;
	let on = 0;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			if (+arr[i] === +arr2[j]) {
				on++;
				break;
			}
		}
	}
	return on === arr.length;
};

const createTableFlashCart = (tableData) => {
	
	const table = document.querySelector('#app_simulator'),
		showAnswer = document.querySelector('#button');
	
	tableData.forEach((item, index) => {
		const row = document.createElement('div'),
			cell = document.createElement('div'),
			input = document.createElement("input"),
			answer = document.createElement("div"),
			answerText = document.createTextNode(Arr.sumArr[index]);
		row.classList.add('column-flash');
		cell.classList.add('column-flash__input');
		input.setAttribute("type", "number");
		
		item.forEach((cellData) => {
			const cell = document.createElement('div');
			cell.classList.add('column-flash__count');
			const img = document.createElement('img');
			img.classList.add('image');
			img.setAttribute('src', cellData);
			cell.appendChild(img);
			row.appendChild(cell);
		});
		
		table.appendChild(row);
		row.appendChild(cell);
		cell.appendChild(input);
		answer.appendChild(answerText);
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