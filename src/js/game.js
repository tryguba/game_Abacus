import Abacus from "./Abacus";
// Load the full build.
let _ = require('lodash');
const game = {};

let Arr, M, N;
let steps = document.querySelectorAll('.step');


let checkValueArr = (arr, arr2) => {
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

let createTable = (tableData) => {
	let table = document.querySelector('#app_abacus'),
		showAnswer = document.querySelector('#button'),
		answerText;
	
	tableData.forEach(function (item, index) {
		let row = document.createElement('div'),
			cell = document.createElement('div'),
			input = document.createElement("input"),
			answer = document.createElement("div");
		
		row.classList.add('column');
		cell.classList.add('inp');
		answer.classList.add('answer', 'd-none');
		input.setAttribute("type", "number");
		
		item.forEach(function (cellData) {
			let cell = document.createElement('div');
			cell.classList.add('column__count');
			cell.appendChild(document.createTextNode(cellData));
			row.appendChild(cell);
		});
		
		answerText = document.createTextNode(Arr.sumArr[index]);
		
		table.appendChild(row);
		row.appendChild(cell);
		cell.appendChild(input);
		row.appendChild(answer);
		answer.appendChild(answerText);
	});
	
	showAnswer.addEventListener('click', function () {
		let answer = document.querySelectorAll('.answer'),
			inp = document.querySelectorAll('input'),
			arrTypedAnswers = [];
		
		answer.forEach(function (item) {
			item.classList.remove('d-none');
			item.classList.add('d-block');
		});
		// проверка на ответ
		for (let i = 0; i < inp.length; i++) {
			if (!inp[i].value) {
				inp[i].classList.add('red');
			}
			arrTypedAnswers[i] = inp[i].value;
			
			if (Arr.sumArr[i] === +inp[i].value) {
				inp[i].classList.add('green');
			}
			else {
				inp[i].classList.add('red');
			}
		}
		
		//======== проверка степа
		let checkAllArr = checkValueArr(arrTypedAnswers, Arr.sumArr);
		if (checkAllArr) {
			console.log(`You are the best!!!`);
		}
		//========
	});
};

let addClass = (className) => {
	let smallFont = document.querySelectorAll('.column__count');
	smallFont.forEach(function (item) {
		item.classList.add(className);
	});
};

for (let i = 0; i < steps.length; i++) {
	let table = document.querySelector('#app_abacus');
	let step = 'step_1_2';
	steps[i].addEventListener("click", function () {
		
		table.innerHTML = null;
		step = steps[i].textContent;
		
		switch (step) {
			case 'step_1_2':
				console.log(`==========${step}==========`);
				let step_1_2 = new Abacus();
				Arr = step_1_2.getAbacusSimple(M = 10);
				createTable(Arr.countsArr);
				break;
			case 'step_3':
				console.log(`==========${step}==========`);
				let step_3 = new Abacus();
				Arr = step_3.getAbacusSimpleStep_3(M = 10);
				createTable(Arr.countsArr);
				break;
			case 'step_4':
				console.log(`==========${step}==========`);
				let step_4 = new Abacus();
				Arr = step_4.getAbacusSimpleStep_4(M = 10);
				createTable(Arr.countsArr);
				break;
			case 'step_5_6':
				console.log(`==========${step}==========`);
				let step_5_6 = new Abacus();
				Arr = step_5_6.getAbacusSimpleStep_5_6(M = 10);
				createTable(Arr.countsArr);
				break;
			case 'step_7_8':
				console.log(`==========${step}==========`);
				let step_7_8 = new Abacus();
				Arr = step_7_8.getAbacusSimpleStep_7_8(M = 10);
				createTable(Arr.countsArr);
				break;
			case 'step_9':
				console.log(`==========${step}==========`);
				let step_9 = new Abacus(1, 9);
				Arr = step_9.getAbacusSimpleStep_9(M = 10, N = 3);
				createTable(Arr.countsArr);
				break;
			case 'level_2':
				console.log(`==========${step}==========`);
				let level_2 = new Abacus(1, 9);
				Arr = level_2.getAbacusSimpleStep_9(M = 10, N = 5);
				createTable(Arr.countsArr);
				addClass('middleFont');
				break;
			case 'level_3':
				console.log(`==========${step}==========`);
				let level_3 = new Abacus(1, 9);
				Arr = level_3.getAbacusSimpleStep_9(M = 10, N = 7);
				createTable(Arr.countsArr);
				addClass('middleFont');
				break;
			case 'level_4':
				console.log(`==========${step}==========`);
				let level_4 = new Abacus(1, 9, true);
				Arr = level_4.getAbacusSimpleStep_9(M = 10, N = 8);
				createTable(Arr.countsArr);
				addClass('middleFont');
				break;
			case 'level_5':
				console.log(`==========${step}==========`);
				let level_5 = new Abacus(10, 89, true);
				Arr = level_5.getAbacusSimpleStep_9(M = 10, N = 10);
				createTable(Arr.countsArr);
				addClass('middleFont');
				
				break;
			case 'level_6':
				console.log(`==========${step}==========`);
				let level_6 = new Abacus(10, 89);
				Arr = level_6.getAbacusSimpleStep_9(M = 10, N = 10);
				createTable(Arr.countsArr);
				addClass('middleFont');
				break;
			case 'level_7':
				console.log(`==========${step}==========`);
				let level_7 = new Abacus(0.01, 9);
				Arr = level_7.getAbacusSimpleDoubleOne(M = 10, N = 3);
				createTable(Arr.countsArr);
				addClass('smallFont');
				break;
			case 'level_8':
				console.log(`==========${step}==========`);
				let level_8 = new Abacus(0.01, 9, 99);
				Arr = level_8.getAbacusSimpleDouble(M = 10, N = 10);
				createTable(Arr.countsArr);
				addClass('smallFont');
				break;
			case 'level_9':
				console.log(`==========${step}==========`);
				let level_9 = new Abacus(10, 99.99);
				Arr = level_9.getAbacusSimpleDoubleOne(M = 10, N = 10);
				createTable(Arr.countsArr);
				addClass('smallFont');
				break;
			case 'level_10':
				console.log(`==========${step}==========`);
				let level_10 = new Abacus(10, 999, 99);
				Arr = level_10.getAbacusSimpleDouble(M = 10, N = 10);
				createTable(Arr.countsArr);
				addClass('smallFont');
				break;
			default:
				console.log('Я таких значений не знаю');
		}
	});
}
