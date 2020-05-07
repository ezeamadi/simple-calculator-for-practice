// GLOBAL VARIABLES

// Running total initially set to zero
let runningTotal = 0;

// initial state of the calculations set to string zero.
let buffer = '0';

//  declare the previous operator used and can be set to null
let previousOperator;

// grab the class of screnn and save in a screen variable
const screen = document.querySelector('.screen');

// Event Listeners

let calcButtons = document.querySelector('.calc-buttons');

// on-clicking the buttons, get the inner text of the clicked button and pass it as an parameter to the buttonClick function
calcButtons.addEventListener('click', (event) => {
	buttonClick(event.target.innerText);
});

// Helper Functions

// function to re-render / refresh the screen with most recent value
const reRender = () => (screen.innerText = buffer);

// function to handle when the button clicked is a number. add the number to the buffer if it is not zero.
const handleNumber = (value) => (buffer === '0' ? (buffer = value) : (buffer += value));

// function to click button. if the integer conversion of the number is not a number, use it an argument for the handleSymbol function; else is it a number so the handleNumber function will be used.
// rerender and any of the two operations.

const buttonClick = (value) => {
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	reRender();
};

// flushOperation uses the integer converted buffer as argument to perform corresponding operaions for add, subtract, multiply and divide

const flushOperation = (intBuffer) => {
	if (previousOperator === '+') {
		runningTotal += intBuffer;
	} else if (previousOperator === '-') {
		runningTotal -= intBuffer;
	} else if (previousOperator === 'X') {
		runningTotal *= intBuffer;
	} else {
		runningTotal /= intBuffer;
	}
};

// function used for the mathematics operations when the buttons are clicked

const handleMath = (value) => {
	// do nothing if the buffer is zero.
	if (buffer === '0') {
		return;
	}

	// converting buffer to integer
	const intBuffer = parseInt(buffer);

	// assign buffer integer value to running total if the running total is zero. Else, use the (non-zero ) value of the runningTotal as an argument in flushOperation function.

	runningTotal === 0 ? (runningTotal = intBuffer) : flushOperation(intBuffer);

	// previousOperator is now assigned the value passed as argument.
	previousOperator = value;

	// buffer is reset to zero.
	buffer = '0';
};

// function used to handle symbol.

const handleSymbol = (value) => {
	switch (value) {
		case 'C':
			buffer = '0';
			runningTotal = 0;
			previousOperator = null;
			break;
		case '=':
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = +runningTotal;
			runningTotal = 0;
			break;
		case '←':
			buffer.length === 1 ? (buffer = '0') : (buffer = buffer.substring(0, buffer.length - 1));
			break;
		default:
			handleMath(value);
			break;
	}
};

// More Things to Do: Add a period (.) as an operation, add a modulus sign as an operation for percentage