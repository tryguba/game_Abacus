import FleshCart from "./FleshCart";
import {sound} from "../sound";

const audio_Au_t_1 = new Audio(sound.trenazhor.Au_t_1);
const audio_Au_t_2 = new Audio(sound.trenazhor.Au_t_2);
const audio_Au_t_3 = new Audio(sound.trenazhor.Au_t_3);

// audio_Au_t_3.play();


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

