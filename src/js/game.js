import Abacus from "./Abacus";
import Mental from "./Mental";

let Arr, N;
const M = 10,
	steps = document.querySelectorAll('.step[name]'),
	title = document.querySelector('.title');

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

const createTableAbacus = (tableData) => {
	const table = document.querySelector('#app_abacus'),
		showAnswer = document.querySelector('#button');
	
	tableData.forEach((item, index) => {
		const row = document.createElement('div'),
			cell = document.createElement('div'),
			input = document.createElement("input"),
			answer = document.createElement("div");
		
		row.classList.add('column');
		cell.classList.add('inp');
		answer.classList.add('answer', 'd-none');
		input.setAttribute("type", "number");
		
		item.forEach((cellData) => {
			const cell = document.createElement('div');
			cell.classList.add('column__count');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});
		
		const answerText = document.createTextNode(Arr.sumArr[index]);
		
		table.appendChild(row);
		row.appendChild(cell);
		cell.appendChild(input);
		row.appendChild(answer);
		answer.appendChild(answerText);
	});
	
	showAnswer.addEventListener('click', () => {
		const answer = document.querySelectorAll('.answer'),
			inp = document.querySelectorAll('input'),
			arrTypedAnswers = [];
		
		answer.forEach((item) => {
			item.classList.remove('d-none');
			item.classList.add('d-block');
		});
		// проверка на ответ
		for (let i = 0; i < inp.length; i++) {
			if (!inp[i].value) {
				inp[i].classList.add('red');
			}
			arrTypedAnswers[i] = inp[i].value;
			if (+Arr.sumArr[i] === +inp[i].value) {
				inp[i].classList.add('green');
			}
			else {
				inp[i].classList.add('red');
			}
		}
		//======== проверка степа
		const checkAllArr = checkValueArr(arrTypedAnswers, Arr.sumArr);
		if (checkAllArr) {
			console.log(`You are the best!!!`);
		}
	});
};

const addClass = (className) => {
	const smallFont = document.querySelectorAll('.column__count');
	smallFont.forEach((item) => {
		item.classList.add(className);
	});
};

const chooseAbacus = (step, method, className) => {
	console.log(`==========${step}==========`);
	title.innerHTML = `Аbacus-арифметика`;
	Arr = method;
	createTableAbacus(Arr.countsArr);
	if (className === undefined) {
		className = '';
		console.log(className);
	} else addClass(className);
	
};

for (let i = 0; i < steps.length; i++) {
	const table = document.querySelector('#app_abacus');
	let stepic;
	let step;
	steps[i].addEventListener("click", () => {
		
		table.innerHTML = null;
		stepic = steps[i];
		step = stepic.getAttribute('name');
		switch (step) {
			case 'step_1_2':
				const step_1_2 = new Abacus();
				chooseAbacus(step, step_1_2.getAbacusSimple(M));
				break;
			case 'step_3':
				const step_3 = new Abacus();
				chooseAbacus(step, step_3.getAbacusSimpleStep_3(M));
				break;
			case 'step_4':
				const step_4 = new Abacus();
				chooseAbacus(step, step_4.getAbacusSimpleStep_4(M));
				break;
			case 'step_5_6':
				const step_5_6 = new Abacus();
				chooseAbacus(step, step_5_6.getAbacusSimpleStep_5_6(M));
				break;
			case 'step_7_8':
				const step_7_8 = new Abacus();
				chooseAbacus(step, step_7_8.getAbacusSimpleStep_7_8(M));
				break;
			case 'step_9':
				const step_9 = new Abacus(1, 9);
				chooseAbacus(step, step_9.getAbacusSimpleStep_9(M, N = 3));
				break;
			case 'level_2':
				const level_2 = new Abacus(1, 9);
				chooseAbacus(step, level_2.getAbacusSimpleStep_9(M, N = 5), 'middleFont');
				break;
			case 'level_3':
				const level_3 = new Abacus(1, 9);
				chooseAbacus(step, level_3.getAbacusSimpleStep_9(M, N = 7), 'middleFont');
				break;
			case 'level_4':
				const level_4 = new Abacus(1, 9, true);
				chooseAbacus(step, level_4.getAbacusSimpleStep_9(M, N = 8), 'middleFont');
				break;
			case 'level_5':
				const level_5 = new Abacus(10, 89, true);
				chooseAbacus(step, level_5.getAbacusSimpleStep_9(M, N = 10), 'middleFont');
				break;
			case 'level_6':
				const level_6 = new Abacus(10, 89);
				chooseAbacus(step, level_6.getAbacusSimpleStep_9(M, N = 10), 'middleFont');
				break;
			case 'level_7':
				const level_7 = new Abacus(0.01, 9);
				chooseAbacus(step, level_7.getAbacusSimpleDoubleOne(M, N = 10), 'smallFont');
				break;
			case 'level_8':
				const level_8 = new Abacus(0.01, 9, 99);
				chooseAbacus(step, level_8.getAbacusSimpleDouble(M, N = 10), 'smallFont');
				break;
			case 'level_9':
				const level_9 = new Abacus(10, 99.99);
				chooseAbacus(step, level_9.getAbacusSimpleDoubleOne(M, N = 10), 'smallFont');
				break;
			case 'level_10':
				const level_10 = new Abacus(10, 999, 99);
				chooseAbacus(step, level_10.getAbacusSimpleDouble(M, N = 10), 'smallFont');
				break;
//====================  MENTAL арифметика ===================================
			case 'M_step_1_2_3':
				const M_step_1_2_3 = new Mental();
				chooseMental(step, M_step_1_2_3.getMental(M));
				break;
			default:
				console.log('Я таких значений не знаю');
		}
	});
}


//===================== mental ==================================

/*const hide = (element, bool) => {
	element.hidden = bool;
};*/
const game = document.querySelector('#app_abacus'),
	showAnswer = document.querySelector('#button');

const inputAnswer = document.createElement('input');
inputAnswer.classList.add('inputAnswer');

const createCartMental = (arrData) => {
	
	arrData.forEach(function (data, index) {
		
		setTimeout(() => {
			const cart = document.createElement('div');
			cart.classList.add('mental');
			cart.appendChild(document.createTextNode(data));
			setTimeout(() => {
				cart.style.display = 'none';
			}, 1000);
			cart.style.display = 'flex';
			game.appendChild(cart);
		}, index * 2000);
	});
	
	// game.appendChild(inputAnswer);
};



const chooseMental = (step, method) => {
	console.log(`==========${step}==========`);
	title.innerHTML = 'Mental-арифметика';
	Arr = method;
	createCartMental(Arr.countsArr);
};


// const abacus = {
// 	level_1: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_2: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_3: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_4: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_5: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_6: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_7: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_8: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_9: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// 	level_10: {
// 		step_1: "step_1",
// 		step_2: "step_2",
// 		step_3: "step_3",
// 		step_4: "step_4",
// 		step_5: "step_5",
// 		step_6: "step_6",
// 		step_7: "step_7",
// 		step_8: "step_8",
// 		step_9: "step_9"
// 	},
// };
