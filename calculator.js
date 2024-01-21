function inputNum(e) {
    // If overall length of problem too long
    if (problemField.innerHTML && problemField.innerHTML.length > 29) {
        alert("Max limit of digits");
        return;
    }
    else{
        if(e.key) { // keyboard input
            problemField.innerHTML += e.key;
        }
        else{ // click input
            problemField.innerHTML += e.target.value;
        }
        if (!(num1)) {
            num1 = problemField.innerHTML;
        }
        if (operateNumbers == false) { // working on first num
            num1on = true;
            // If input is decimal
            if (e.target.value == "." || e.key == ".") { 
                if (decimalOn == false) { // if decimal not already used
                    decimalOn = true;
                    // Decimal is first input - show 0 before decimal
                    if (num1 = ".") {
                        num1 = "0.";
                        num1commas = "0.";
                    }
                    else { // Decimal after digit
                        num1 += ".";
                        num1commas += ".";
                    }
                }
            }
            // Input is digit
            else {
                num1 = (problemField.innerHTML.replace(/\,/g, "")); //strip commas
                num1commas = Number(num1).toLocaleString(); //format if no decimal
            }
            problemField.innerHTML = num1commas;
            workingAnswerField.innerHTML = num1commas;
        
        }
        else if (operateNumbers == true) { //working on second num
            inputSecondNum(e);
        }
    }
}

// When operator is hit - sets first entry as num1, registers which operation
function setNum1(e) {
    // If num1 doesn't exist
    if (!(num1)) {
        alert("You must enter a number first.");
    }
    else {
        if(e.key) { //keyboard input
            operator = e.key;
        }
        else { //clicked input
            operator = e.target.textContent;
        }
        num1 = parseFloat(num1);
        num1on = false; // done with num1
        num2on = false; // not on num2 yet
        decimalOn = false;
        percentOn = false;
        if (operateNumbers == false) { // If first time being used
            operateNumbers = true;
        }
        else { // Used instead of equals to calculate answer before doing more
            snapshotNum1 = problemField.innerHTML;
            num1commas = snapshotNum1;
            snapshotNum1On = true;
            num1 = displayAnswer;
            num2 = "";
        }
        problemField.innerHTML += `${operator}`;
    }
}

// Gives second number
function inputSecondNum(e) {
    num2on = true; // working on num2
    // Num2 already exists
    if (num2) { //double or triple digit number or decimal
        // Input is decimal
        if (e.target.value == "." || e.key == ".") { 
            if (decimalOn == false) { // if decimal not already used
                decimalOn = true;
                num2 += ".";
                num2commas += ".";
            }
        }
        // Input is digit
        else { 
            num2 = num2 + e.target.value;
            num2commas += e.target.value;
            num2commas = Number(num2).toLocaleString();
            num2 = parseFloat(num2);
        }
    }
    // Num2 doesn't exist yet
    else {
        // Decimal first - put 0 in front
        if (e.target.value == "." || e.key == ".") { 
            if (decimalOn == false) {
                decimalOn = true;
                num2 = "0.";
                num2commas = "0.";
            }
        }
        // Digit first
        else {
            num2 = parseFloat(e.target.value);
            num2commas = num2;
        }
    }
    if (snapshotNum1On == true) { // multiple operations
        problemField.innerHTML = snapshotNum1 + operator + num2commas;
    }
    else {
        problemField.innerHTML = num1commas + operator + num2commas;
    }
    // If last input not a decimal, allow to determine answer
    if (!(e.target.value == "." || e.key == ".")) { //only determine answer if last input not decimal
        determineDisplayAnswer();
    }
}

function determineDisplayAnswer() {
    // Shows working answer
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (operator == "+") {
        addOn = true;
        // displayAnswer = addNum(num1, num2);
        displayAnswer = num1 + num2;
    }
    else if (operator == "-") {
        subtractOn = true;
        displayAnswer = num1 - num2;
    }
    else if (operator == "x" || operator == "*") {
        multiplyOn = true;
        displayAnswer = num1 * num2;
    }
    else if (operator == "÷" || operator == "/") {
        divideOn = true;
        if (num2 == 0) {
            alert("Can't divide by zero");
            problemField.innerHTML = problemField.innerHTML.slice(0, -1);
            displayAnswer = "";
        }
        else {
            displayAnswer = num1 / num2;
        }
    }
    workingAnswerField.innerHTML = Number(displayAnswer).toLocaleString();
}

function percentNum() {
    if (!(num1 || num2)) {
        alert("You must enter a number first.");
    }
    else {
        if (percentOn == false) {
            problemField.innerHTML += "%";
            percentOn = true;
            if (num2on == true) { // working on num2
                unpercentNum2 = num2;
                num2 /= 100;
                num2 *= num1;
                num2commas = num2;
                determineDisplayAnswer();
            }
            else { // working on num1
                num1commas = num1 + "%";
                unpercentNum1 = num1;
                num1 /= 100;
                displayAnswer = num1;
                percentNum1on = true;
                percentNum1 = num1;
                workingAnswerField.innerHTML = num1;
            }
        }
    }
}

function squaredNum() {
    if (!(num1 || num2)) {
        alert("You must enter a number first.");
    }
    else {
        problemField.innerHTML += "²";
        if (num2on == true) { // working on num2
            unsquaredNum2 = num2; //saved in case backspace
            num2 *= num2;
            squaredSum2 = num2;
            num2commas = num2;
            determineDisplayAnswer();
        }
        else { // working on num1
            num1commas = num1 + "²";
            unsquaredNum1 = num1;
            num1 *= num1;
            displayAnswer = num1;
            squaredSum1 = num1;
            workingAnswerField.innerHTML = num1;
        }
    }
}

function backspaceNum() {
    if (num1 || num2) {
        if (problemField.innerHTML.slice(-1) == ".") {
            decimalOn = false;
        }
        if (problemField.innerHTML.slice(-1) == "%") {
            percentOn = false;
        }
        if (num1on == true) { // typing num1
            num1 = String(num1);
            num1commas = String(num1commas);
            // Erase last symbol
            if (num1commas.length == 1) { // If last digit
                clearInput()
            }
            else {
                num1commas = num1commas.slice(0, -1);
                // Strip commas
                num1 = num1commas.replace(/\,/g, "") ;
                num1commas = num1commas.replace(/\,/g, "");
                // Convert num1commas to be formatted again
                if (num1 == "-") {
                    num1commas = num1
                }
                else {
                    num1commas = Number(num1).toLocaleString();
                }
                problemField.innerHTML = num1commas;
                workingAnswerField.innerHTML = num1commas;
            }
        }
        else if (num2on == true) { // typing num2
            num2 = String(num2);
            num2commas = String(num2commas);
            // Remove percent or squared
            if (problemField.innerHTML.slice(-1) == "%") {
                problemField.innerHTML = problemField.innerHTML.slice(0, -1);
                num2 = unpercentNum2;
                num2commas = unpercentNum2;
                if (percentNum1on == true) {
                    num1 = percentNum1;
                }
                if (unsquaredNum1) {
                    num1 = squaredSum1;
                }
                determineDisplayAnswer();
            }
            else if (problemField.innerHTML.slice(-1) == "²") {
                problemField.innerHTML = problemField.innerHTML.slice(0, -1);
                num2 = unsquaredNum2;
                num2commas = unsquaredNum2;
                if (percentNum1on == true) {
                    num1 = percentNum1;
                }
                if (unsquaredNum1) {
                    num1 = squaredSum1;
                }
                determineDisplayAnswer();
            }
            // Erase last symbol
            else if (num2commas.length == 1) { // If last digit
                num2commas = "";
                num2 = "";
                num2on = false;
            }
            else {
                num2commas = num2commas.slice(0, -1);
                // Strip commas
                num2 = num2commas.replace(/\,/g, "");
                num2commas = num2commas.replace(/\,/g, "");
                // Reformat
                num2commas = Number(num2).toLocaleString();
                if (snapshotNum1 && snapshotNum1On == true) {
                    problemField.innerHTML = snapshotNum1 + operator + num2commas;
                }
                else {
                    if (num2 == "-") {
                        num2commas = num2
                        workingAnswerField.innerHTML = num1commas
                    }
                    problemField.innerHTML = num1commas + operator + num2commas;
                }
            }
            // if erased all of num2
            if(num2commas == "") {
                workingAnswerField.innerHTML = Number(num1).toLocaleString();
                problemField.innerHTML = problemField.innerHTML.slice(0, -1);
                snapshotNum1On = false;
            }
            else {
                if (percentNum1on == true) {
                    num1 = percentNum1;
                }
                if (num2 != "-") {
                    determineDisplayAnswer();
                }
            }
        }
        else { //typing operator
            problemField.innerHTML = problemField.innerHTML.slice(0, -1);
            // If multiple operators were present
            // Separate back into num1 and num2
            let operatorIndex;
            multipleOperations = false;
            for (let i = problemField.innerHTML.length-1; i >= 0; i--) {
                let c = problemField.innerHTML.charAt(i);
                if (c == "+" || c == "-" || c == "x" || c == "/") {
                    operator = c;
                    operatorIndex = i;
                    num1commas = problemField.innerHTML.slice(0, i);
                    num2commas = problemField.innerHTML.slice(i+1, problemField.innerHTML.length);
                    num1 = parseFloat(num1commas.replace(/\,/g, ""));
                    num2 = parseFloat(num2commas.replace(/\,/g, ""));
                    multipleOperations = true;
                    num2on = true; //will be working on num2
                    break;
                }
            }
            if (multipleOperations == false) { //only num1 left
                problemField.innerHTML = num1commas;
                num1on = true;
                num2on = false;
                operateNumbers = false;
                workingAnswerField.innerHTML = Number(num1).toLocaleString();
            }
            else {
                if (unsquaredNum1) {
                    num1 = squaredSum1;
                }
                if (unsquaredNum2) {
                    num2 = squaredSum2;
                }
                if (percentNum1on == true) {
                    num1 = percentNum1;
                }
            }
        }
    }
}

function showFinalAnswer() {
    if (num2 || num1on == true) { // Will not work after just hitting operator
        problemField.innerHTML = parseFloat(displayAnswer);
        problemField.innerHTML = Number(problemField.innerHTML).toLocaleString(); //show commas
        if (problemField.innerHTML.length > 29) { // shrink font to fit
            problemField.style.fontSize = "30px";
        }

        workingAnswerField.innerHTML = "";
        num1 = displayAnswer;
        num1commas = displayAnswer;
        num2 = "";
        operateNumbers = false;
        num2on = false;
        snapshotNum1On = false;
    }
}

function clearInput() {
    problemField.innerHTML = "";
    workingAnswerField.innerHTML = "";
    displayAnswer = "";
    num1 = "";
    num1commas = "";
    num2 = "";
    num2commas = "";
    operator = "";
    operateNumbers = false;
    num1on = false;
    num2on = false;
    snapshotNum1On = false;
    addOn = false;
    subtractOn = false;
    multiplyOn = false;
    divideOn = false;
    percentNum1on = false;
    decimalOn = false;
    percentOn = false;
}

function addPosNeg() {
    if (!(num1) && num1on == false) { // haven't started typing digits
        if (problemField.innerHTML == "-") { // already has negative sign
            problemField.innerHTML = "";
        }
        else {
            problemField.innerHTML = "-";
        }
    }
    else if (num1on == true) { // typing num1
        num1 *= -1 ;
        num1commas = Number(num1).toLocaleString();
        problemField.innerHTML = num1commas;
    }
    else if (num2on == true) { // typing num2
        if (!(num2) || num2 == "") { // num2 doesn't exist
            num2 = "-";
            problemField.innerHTML += num2;
        }
        else { // already typing num2
            num2 = parseFloat(num2);
            num2 *= -1;
            num2commas = Number(num2).toLocaleString();
            if (snapshotNum1) { // more than 2 nums being operated
                snapshotNum1 += operator; // add last operator
                problemField.innerHTML = snapshotNum1 + num2commas;
            }
            else {
                problemField.innerHTML = num1commas+operator+num2commas;
            }
        }
        determineDisplayAnswer();
    }
    else if (!(num2) && num2on == false) { // start typing nun2 as neg
        num2 = "-";
        problemField.innerHTML += num2;
    }
    else { // looking at final answer (already float)
        displayAnswer *= -1;
        problemField.innerHTML = Number(displayAnswer).toLocaleString();
        num1 = displayAnswer;
        num1commas = problemField.innerHTML;
    }
}



// Query selectors for top part
let problemField = document.querySelector("#problem-field");
let workingAnswerField = document.querySelector("#working-answer-field");

// Query selectors for number buttons
document.querySelectorAll(".number-btn").forEach(numButtons => {
    numButtons.addEventListener("click", inputNum);
})

// Keydown events 
window.addEventListener("keydown", function(e) {
    if(e.key >= 0 && e.key <= 9) {
        e.target.value = e.key;
        inputNum(e);
    }
    else if(e.key == "+" || e.key == "-" || e.key == "*" || e.key == "x" || e.key == "/") {
        setNum1(e);
    }
    else if(e.key == "=") {
        showFinalAnswer();
    }
    else if(e.key == "c") {
        clearInput();
    }
    else if(e.key == ".") {
        inputNum(e);
    }
    else if(e.key == "%") {
        percentNum(e);
    }
    else if(e.key == "Backspace") {
        backspaceNum(e);
    }
})

// Query selectors for operator buttons 
document.querySelectorAll(".operator-btn").forEach(operatorButtons => {
    operatorButtons.addEventListener("click", setNum1);
})

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", backspaceNum);
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearInput);
const squaredButton = document.querySelector("#squared");
squaredButton.addEventListener("click", squaredNum);
const percentButton = document.querySelector("#percent");
percentButton.addEventListener("click", percentNum);
        
const posnegButton = document.querySelector("#pos-neg");
posnegButton.addEventListener("click", addPosNeg);
const zeroButton = document.querySelector("#zero");   
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", inputNum);
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", showFinalAnswer);           

let displayAnswer; // answer after operation
let operateNumbers = false; // if in act of opertion
let num1; // num1 value unformatted
let num1on = false; // working on num1
let num1commas; // num1 formatted
let num2; // num2 value unformatted
let num2on = false; // working on num2
let num2commas; // num2 formatted
let operator;
let addOn = false;
let subtractOn = false;
let multiplyOn = false;
let divideOn = false;
let snapshotNum1; // before combining several numbers into num1
let snapshotNum1On = false; // doing multiple operations
let unsquaredNum1; // num1 before squaring
let unsquaredNum2; // num2 before squaring
let squaredSum1; // save squared answer of num1 in case backspace
let squaredSum2; // save squared answer of num2 in case backspace
let unpercentNum1; // num1 before percenting
let unpercentNum2; // num2 before percenting
let percentNum1; // save percent num1 in case backspace
let percentNum1on = false; // if num1 was percent
let multipleOperations = false; // problem has multiple operator signs
let decimalOn = false; // if decimal already used in number
let percentOn = false; // if percent already used in number
