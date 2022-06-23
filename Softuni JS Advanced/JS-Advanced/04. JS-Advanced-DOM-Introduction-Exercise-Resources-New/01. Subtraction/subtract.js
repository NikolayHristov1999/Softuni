function subtract() {
    let firstNumber = document.getElementById("firstNumber");
    let secondNumber = document.getElementById("secondNumber");
    let result = document.getElementById("result");

    let sum = Number(firstNumber.value) - Number(secondNumber.value);
    result.textContent = sum;
}