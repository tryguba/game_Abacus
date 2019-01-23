class Abacus {

    constructor(firstCountArr, lastCountArr, digit) {
        this.firstCountArr = firstCountArr;
        this.lastCountArr = lastCountArr;
        this.digit = digit;
    }

    static genAbacusSimple(lastItem, operation) {
        let result = 0;
        if (operation) {
            if (lastItem >= 0 && lastItem <= 4) {
                let toNum = 9 - lastItem;
                let toNum2 = 4 - lastItem;
                let randArr = [];
                for (let i = 5; i <= toNum; i++) {
                    randArr.push(i);
                }
                for (let i = 1; i <= toNum2; i++) {
                    randArr.push(i);
                }
                result = randArr[Math.floor((Math.random() * (randArr.length - 1)))];
                // console.log(`+ last= ${lastItem}  [${randArr}] res= ${result}`);
            } else {
                let randArr = [];
                for (let i = 1; i <= (9 - lastItem); i++) {
                    randArr.push(i);
                }
                result = randArr[Math.floor((Math.random() * (randArr.length - 1)))];
                // console.log(`+ last= ${lastItem}  [${randArr}] res= ${result}`);
            }
        } else {
            if (lastItem >= 1 && lastItem <= 4) {
                let randArr = [];
                for (let i = 1; i <= lastItem; i++) {
                    randArr.push(i);
                }
                result = randArr[Math.floor((Math.random() * (randArr.length - 1)))];
                // console.log(`- last= ${lastItem}  [${randArr}] res= ${result}`);
            } else {
                let toNum = lastItem - 5;
                let randArr = [];
                for (let i = 1; i <= toNum; i++) {
                    randArr.push(i);
                }
                for (let i = 5; i <= lastItem; i++) {
                    randArr.push(i);
                }
                let preresult = Math.floor((Math.random() * (randArr.length - 1)));
                result = randArr[preresult];
                // console.log(`- last= ${lastItem}  [${randArr}] res= ${result}`);
            }
            result = (result) * (-1);
        }

        return result;
    }

    getAbacusSimple(columns) {
        let result = [],
            sums = [];

        for (let i = 0; i < columns; i++) {
            result[i] = [];
            let randArr = [];
            let operation = Math.random() >= 0.5;

            for (let i = 1; i <= 8; i++) {
                if (i === 5) {
                    continue;
                }
                randArr.push(i);
            }

            let res = function (first, second, operation) {
                // console.log(`op=${operation} first=${first} second=${second}`);
                let sum = first + second;
                let lastOperation = Math.random() >= 0.5;
                if (sum === 9) {
                    lastOperation = false;
                }
                if (operation) {
                    return Abacus.genAbacusSimple(first + second, lastOperation);
                } else {
                    second = second * (-1);
                    return Abacus.genAbacusSimple(first - second, lastOperation);
                }
            };

            result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
            result[i][1] = Abacus.genAbacusSimple(result[i][0], operation);
            result[i][2] = res(result[i][0], result[i][1], operation);

            let sum = result[i].reduce(function (previousValue, currentValue) {
                return currentValue + previousValue;
            });

            sums[i] = sum;
        }
        return {
            countsArr: result,
            sumArr: sums
        };
    }

    genAbacusSimpleStep_3(count, operation) {
        let remainder = count % 10;
        let result = 0;

        if (remainder >= 1 && remainder <= 4) {
            let toNum = 10 - remainder;
            let randArr = [];
            for (let i = toNum; i <= 9; i++) {
                randArr.push(i);
            }
            let preresult = Math.floor((Math.random() * (randArr.length)));
            result = randArr[preresult];
// =============================проверка============================
//             console.log('1-4| ' + remainder + '| ' + randArr + '| ' + result);
        } else if (remainder === 5) {
            result = 5;
// =============================проверка============================
//             console.log('5| ' + remainder + '| ' + result);

        } else if (remainder >= 6 && remainder <= 9) {

            let toNum = 10 - remainder;
            let toNum2 = 15 - remainder;
            let randArr = [];
            for (let i = toNum; i <= 5; i++) {
                randArr.push(i);
            }
            for (let i = toNum2; i <= 9; i++) {
                randArr.push(i);
            }
            let preresult = Math.floor((Math.random() * (randArr.length)));
            result = randArr[preresult];

// =============================проверка============================
//             console.log('6-9| ' + remainder + '| ' + randArr + '| ' + result);
        }

        // console.log(operation + ' | ' + count + ' | ' + (result));
        if (operation) {
            if ((result % 10) === (10 - remainder)) {
                result = this.genAbacusSimpleStep_3(count, operation);
                // console.log('---' + (result % 10) + '| ' + (10 - remainder) + ' | ' + count);
            }
        }
        return result;
    }

    // проверяет и удаляет одинаковые уравнение
    duplicate(arr) {
        let obj = {};
        return arr.filter(function (a) {
            return a in obj ? 0 : obj[a] = 1;
        });
    }

    getAbacusSimpleStep_3(columns) {
        let result = [];
        let sums = [];
        let randArr = [];
        for (let i = 2; i <= 29; i++) {
            if (i === 10 || i === 20 || i === 11 || i === 21 || i === 5 || i === 15 || i === 25) {
                continue;
            }
            randArr.push(i);
        }

        for (let i = 0; i < columns; i++) {
            result[i] = [];
            result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
            result[i][1] = this.genAbacusSimpleStep_3(result[i][0], true);
            result[i][2] = this.genAbacusSimpleStep_3(result[i][1] + result[i][0], false);
            let sum = result[i].reduce(function (previousValue, currentValue) {
                return currentValue + previousValue;
            });
            sums[i] = sum;
        }

        let b = this.duplicate(result);
        let length = b.length;

        if (b.length !== M) {
            for (let i = 0; i < M - length; i++) {
                result[i] = [];
                result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
                result[i][1] = this.genAbacusSimpleStep_3(result[i][0], true);
                result[i][2] = this.genAbacusSimpleStep_3(result[i][1] + result[i][0], false);
                b.push(result[i]);
            }
            console.log(b);
        }

        return {
            countsArr: b,
            sumArr: sums
        };
    }

    static genAbacusSimpleStep_4(count, operation) {
        let remainder = count % 10;
        let result = 0;

        if (remainder >= 0 && remainder <= 3) {
            let toNum = remainder + 1;
            let toNum2 = remainder + 6;

            let randArr = [];
            for (let i = toNum; i <= 5; i++) {
                randArr.push(i);
            }
            for (let i = toNum2; i <= 9; i++) {
                randArr.push(i);
            }
            let preresult = Math.floor((Math.random() * (randArr.length - 1)));
            result = randArr[preresult];
// =============================проверка============================
            console.log(`| ${remainder} [${randArr}] res= ${result}`);

        } else if (remainder === 4) {
            result = 5;
// =============================проверка============================
            console.log(`| ${result}`);
        } else if (remainder >= 5 && remainder <= 8) {

            let toNum = remainder + 1;
            let randArr = [];
            for (let i = toNum; i <= 9; i++) {
                randArr.unshift(i);
            }
            let preresult = Math.floor((Math.random() * (randArr.length - 1)));
            result = randArr[preresult];
// =============================проверка============================
            console.log(`| ${remainder} [${randArr}] res= ${result}`);
        }

        if (operation && ((count - result) % 10) - 9 === 0) {
            result = this.genAbacusSimpleStep_4(count, true);
            console.log(`NewRes=${result}`);
        }

        return result;
    }

    getAbacusSimpleStep_4(columns) {
        let result = [];
        let sums = [];
        let randArr = [];
        for (let i = 30; i <= 47; i++) {
            if (i === 34 || i === 38 || i === 39 || i === 44) {
                continue;
            }
            randArr.push(i);
        }

        for (let i = 0; i < columns; i++) {
            result[i] = [];

            let res = function (first, second) {
                let min = first - second * -1;
                console.log(`${first}${second}=${min}`);
                return Abacus.genAbacusSimpleStep_4(min, false);
            };

            result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
            result[i][1] = Abacus.genAbacusSimpleStep_4(result[i][0], true) * -1;
            result[i][2] = res(result[i][0], result[i][1]) * (-1);

            let sum = result[i].reduce(function (a, b) {
                return a + b;
            });
            sums[i] = sum;
        }
        return {
            countsArr: result,
            sumArr: sums
        }
    }

    genAbacusSimpleStep_5_6(count) {
        let result = 0;

        if (count >= 1 && count <= 4) {
            let toNum = 5 - count;
            let randArr = [];

            for (let i = toNum; i <= 4; i++) {
                randArr.push(i);
            }

            let preresult = Math.floor((Math.random() * (randArr.length)));
            result = randArr[preresult];
// =============================проверка============================
//             console.log('1-4| ' + result);
//             console.log('1-4| ' + remainder + '| ' + randArr + '| ' + result);

        }

        else {
            let toNum = count - 4;
            let randArr = [];
            for (let i = toNum; i <= 4; i++) {
                randArr.push(i);
            }
            let preresult = Math.floor((Math.random() * (randArr.length)));
            result = randArr[preresult] * (-1);

// =============================проверка============================
//             console.log('6-9| ' +result);
//             console.log('6-9| ' + remainder + '| ' + randArr + '| ' + result);
        }

        return result;
    }

    getAbacusSimpleStep_5_6(columns) {
        let result = [];
        let sums = [];

        for (let i = 0; i < columns; i++) {
            result[i] = [];
            result[i][0] = Math.floor((Math.random() * 8) + 1);
            result[i][1] = this.genAbacusSimpleStep_5_6(result[i][0]);
            result[i][2] = this.genAbacusSimpleStep_5_6(result[i][1] + result[i][0]);

            let sum = result[i].reduce(function (previousValue, currentValue) {
                return currentValue + previousValue;
            });

            sums[i] = sum;
        }
        return {
            countsArr: result,
            sumArr: sums
        }
    }

    genAbacusSimpleStep_7_8(count) {
        let result = 0;

        if (count >= 5 && count <= 8) {
            let toNum = 14 - count;

            let randArr = [];

            for (let i = 6; i <= toNum; i++) {
                randArr.push(i);
            }

            let preresult = Math.floor((Math.random() * (randArr.length)));
            result = randArr[preresult];
// =============================проверка============================
//             console.log('1-4| ' + result);
            console.log('5-8| ' + count + '| ' + randArr + '| ' + result);

        }
        else {
            let toNum = count - 5;
            let randArr = [];
            for (let i = 6; i <= toNum; i++) {
                randArr.push(i);
            }
            let preresult = Math.floor((Math.random() * (randArr.length)));
            result = randArr[preresult] * (-1);

// =============================проверка============================
//             console.log('6-9| ' +result);
            console.log('11-14| ' + count + '| ' + randArr + '| ' + result);
        }

        return result;
    }

    getAbacusSimpleStep_7_8(columns) {
        let result = [];
        let sums = [];
        let randArr = [];
        for (let i = 5; i <= 14; i++) {
            if (i === 10 || i === 9) {
                continue;
            }
            randArr.push(i);
        }
        for (let i = 0; i < columns; i++) {
            result[i] = [];
            result[i][0] = randArr[Math.floor((Math.random() * (randArr.length - 1)) + 1)];
            result[i][1] = this.genAbacusSimpleStep_7_8(result[i][0]);
            result[i][2] = this.genAbacusSimpleStep_7_8(result[i][1] + result[i][0]);

            let sum = result[i].reduce(function (previousValue, currentValue) {
                return currentValue + previousValue;
            });

            sums[i] = sum;
        }
        return {
            countsArr: result,
            sumArr: sums
        }
    }

    genAbacusSimpleStep_9(prevCount, operation) {
        let result = 0;
        let count;

        if (this.digit === null) {
            if (prevCount % 2 === 0) {
                count = Math.floor((Math.random() * 89) + 10);
            } else {
                count = Math.floor((Math.random() * this.lastCountArr) + this.firstCountArr);
            }
        }


        if (prevCount >= count) {
            if (operation) {
                result = count;
                console.log(prevCount + ' |+++| ' + ' count=' + count + ' result= ' + result);
            }
            else {
                result = count * (-1);
                console.log(prevCount + ' |---| ' + ' count=' + count + ' result= ' + result);
            }
        }
        else {
            result = count;
            console.log(prevCount + ' |???| ' + ' count=' + count + ' result= ' + result);
        }
        return result;
    }

    getAbacusSimpleStep_9(columns, rows) {
        let result = [];
        let sums = [];

        for (let i = 0; i < columns; i++) {
            result[i] = [];
            let operation = Math.random() >= 0.5;
            for (let j = 0; j < rows; j++) {
                result[i][j] = this.genAbacusSimpleStep_9(result[i][j - 1], operation);
            }
            let sum = result[i].reduce(function (previousValue, currentValue) {
                return currentValue + previousValue;
            });
            sums[i] = sum;
        }
        return {
            countsArr: result,
            sumArr: sums
        }
    }

    genAbacusSimpleDouble(prevCount, operation) {
        let result = 0;
        let count = (Math.random() * (this.lastCountArr - this.firstCountArr) + this.firstCountArr).toFixed(2);
        if (prevCount >= count) {
            if (operation) {
                result = count;
                console.log(prevCount + ' |+++| ' + ' count=' + count + ' result= ' + result);
            }
            else {
                result = count * (-1);
                console.log(prevCount + ' |---| ' + ' count=' + count + ' result= ' + result);
            }
        }
        else {
            result = count;
            console.log(prevCount + ' |???| ' + ' count=' + count + ' result= ' + result);
        }
        return result.toString().replace(".", ",");
    }

    getAbacusSimpleDouble(columns, rows) {
        let result = [];
        let sums = [];

        for (let i = 0; i < columns; i++) {
            result[i] = [];
            let sumArr = [];
            let operation = Math.random() >= 0.5;
            for (let j = 0; j < rows; j++) {
                result[i][j] = this.genAbacusSimpleDouble(result[i][j - 1], operation);
            }

// =========================================================================

            result[i].forEach(function (item) {
                item = parseFloat(item.replace(",", "."));
                sumArr.push(item);
            });

// =========================================================================

            console.log(result[i]);
            let sum = sumArr.reduce(function (a, b) {
                return a + b;
            });
            sums[i] = sum.toFixed(2);
            // console.log(`sums=${sums[i]} sum=${sum}`);
        }
        return {
            countsArr: result,
            sumArr: sums
        }
    }

    static checkValue(arr, arr2) {
        if (arr.length !== arr2.length) return false;
        let on = 0;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr2.length; j++) {
                if (arr[i] === arr2[j]) {
                    on++;
                    break;
                }
            }
        }
        return on === arr.length;
    }

    createTable(tableData) {

        let table = document.querySelector('#app_abacus');
        let showAnswer = document.querySelector('#button');
        let answerText;

        tableData.forEach(function (item, index) {
            let row = document.createElement('div');
            let cell = document.createElement('div');
            let input = document.createElement("input");
            let answer = document.createElement("div");

            row.classList.add('column');
            cell.classList.add('inp');
            answer.classList.add('answer', 'd-none');
            input.setAttribute("type", "text");
            input.setAttribute("placeholder", "Введите ответ");

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
            let answer = document.querySelectorAll('.answer');
            answer.forEach(function (item) {
                item.classList.toggle('d-block');
            });

            // создаем масив введенных ответов
            (function () {
                let inp = document.querySelectorAll('input'),
                    mas = [];

                function save() {
                    for (let i = 0; i < inp.length; i++) {
                        mas[i] = +inp[i].value;
                    }
                    console.log(mas);
                    console.log(Abacus.checkValue(mas, Arr.sumArr))
                }

                save();
            })();
        });
    }

}


let step_3 = new Abacus();
let step_4 = new Abacus();
let step_5_6 = new Abacus();
let step_7_8 = new Abacus();
let step_9 = new Abacus(1, 9, null);

let level_2 = new Abacus(1, 9);
let level_3 = new Abacus(1, 9);
let level_4 = new Abacus(1, 9);
let level_5 = new Abacus(10, 89);
let level_6 = new Abacus(10, 89);
let level_7 = new Abacus(0, 9);
let level_8 = new Abacus(0, 99);
let level_9 = new Abacus(10, 99);
let level_10 = new Abacus(10, 999);
