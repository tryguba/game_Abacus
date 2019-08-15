
import {createHtmlElement, createStar, rozryad} from "../game";

export default class Common {
	constructor(op) {
		this.level = op.level;
		this.step = op.step;
		this.digit = op.digit;
		this.stars = document.querySelector('.stars').innerHTML;
	}
	
	startCommon() {
		try {
			const dataObj = this.createCounts();
			this.showCount(dataObj);
		} catch (error) {
			throw error;
		}
	}
	
	createCounts() {
	
	}
	
	showCount(arrData) {
		let fontSmall = '';
		if (this.r1 >= 3 || this.r2 >= 3) {
			fontSmall = 'deleniye__middleFont';
		}
		
		document.querySelector('.title').innerHTML = 'Abacus - деление';
		const main = document.querySelector('#main'),
			table = document.querySelector('#app_simulator'),
			inputAnswer = createHtmlElement(`<input class="deleniye__inputAnswer ${fontSmall}" type="number"/>`);
		
		table.innerHTML = null;
		
		const cart = createHtmlElement(`<div class="deleniye"></div>`);
		const cartCount = createHtmlElement(`
						<div class="deleniye__count ${fontSmall}">
							${arrData.delimoe}
							<span>:</span>
							${arrData.delitel}
							<span>=</span>
						</div>
				`);
		
		table.appendChild(cart);
		cart.appendChild(cartCount);
		cart.appendChild(inputAnswer);
		
		/*// создаем кнопку "ПРОВЕРИТЬ"
		if (!document.querySelector('#button')) {
			const button = createHtmlElement(`
				<input id="button" type="button" value="ПРОВЕРИТЬ">`);
			main.appendChild(button);
		}*/
		return false;
	}
	
}
