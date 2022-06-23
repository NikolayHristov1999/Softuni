function solve() {
  let text = document.getElementById("text").value;
  let namingConvention = document.getElementById("naming-convention").value;
  const resultEl = document.getElementById("result");
  const arrStr = text.toLowerCase().split(' ');

  if (namingConvention == "Camel Case") {
    for (let i = 1; i < arrStr.length; i++) {
      arrStr[i] = arrStr[i][0].toUpperCase() + arrStr[i].substr(1);
    }
  } else if (namingConvention == "Pascal Case") {
    for (let i = 0; i < arrStr.length; i++) {
      arrStr[i] = arrStr[i][0].toUpperCase() + arrStr[i].substr(1);
    }
  } else {
    resultEl.textContent = "Error!";
    return;
  }
  resultEl.textContent = arrStr.join("");
}