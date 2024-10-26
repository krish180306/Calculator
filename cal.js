const display = document.getElementById("display");


function toggleScientificMode() {
    const basicKeys = document.getElementById("basic-keys");
    const scientificKeys = document.getElementById("scientific-keys");
    
    if (basicKeys.style.display === "none") {
        basicKeys.style.display = "grid";
        scientificKeys.style.display = "none";
    } else {
        basicKeys.style.display = "none";
        scientificKeys.style.display = "grid";
    }
}

function appendToDisplay(input) {
    display.value += input;
    setTimeout(() => {
        display.scrollLeft = display.scrollWidth; 
    }, 0); 
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value.replace('^', '**').replace(/π/g, 'Math.PI').replace(/e/g, 'Math.E'));
    } catch (error) {
        display.value = "Error";
    }
}

function backspace() {
    display.value = display.value.slice(0, -1);
}


function calculateFunction(func) {
    try {
        const inputValue = eval(display.value);
        switch (func) {
            case 'sin':
                display.value = Math.sin(inputValue);
                break;
            case 'cos':
                display.value = Math.cos(inputValue);
                break;
            case 'tan':
                display.value = Math.tan(inputValue);
                break;
            case 'asin':
                display.value = Math.asin(inputValue);
                break;
            case 'acos':
                display.value = Math.acos(inputValue);
                break;
            case 'atan':
                display.value = Math.atan(inputValue);
                break;
            case 'log':
                display.value = Math.log10(inputValue);
                break;
            case 'ln':
                display.value = Math.log(inputValue);
                break;
        }
    } catch (error) {
        display.value = "Error";
    }
}

function calculateFactorial() {
    try {
        const n = eval(display.value);
        if (n < 0) {
            display.value = "Error";
        } else {
            display.value = factorial(n);
        }
    } catch (error) {
        display.value = "Error";
    }
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function calculateRoot() {
    try {
        display.value = Math.sqrt(eval(display.value));
    } catch (error) {
        display.value = "Error";
    }
}

function calculatePowerOfE() {
    try {
        display.value = Math.exp(eval(display.value));
    } catch (error) {
        display.value = "Error";
    }
}

let isDisplayInDegrees = true; 

function convertRadDeg() {
    try {
        const inputValue = parseFloat(display.value);
        if (isNaN(inputValue)) {
            display.value = "Error";
            return;
        }
        
        if (isDisplayInDegrees) {
            display.value = (inputValue * Math.PI / 180).toFixed(4); 
            isDisplayInDegrees = false;
            document.getElementById("rad-deg-convert").innerText = "Deg";
        } else {
            display.value = (inputValue * 180 / Math.PI).toFixed(4);
            isDisplayInDegrees = true;
            document.getElementById("rad-deg-convert").innerText = "Rad";
        }
    } catch (error) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        appendToDisplay(key);
    } 
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } 
    else if (key === "Backspace") {
        backspace();
    }
    else if (key === "Escape") {
        clearDisplay();
    }
});

