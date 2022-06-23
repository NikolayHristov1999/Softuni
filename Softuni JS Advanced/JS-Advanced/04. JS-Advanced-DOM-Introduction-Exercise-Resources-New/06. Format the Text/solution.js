function solve() {
  const text = document.getElementById("input").value.split(".");
  console.log(text);
  let result = "";
  const output = document.getElementById("output");

  for(let i = 0; i < text.length; i++){
    let tmp = text[i].trim();
    if(i % 3 == 0){
      result += "<p>" + tmp + ".";
    }
    else if(i% 3 == 2){
      result += tmp + ".</p>";
    }
    else if(tmp != ""){   
      result += tmp + ".";
    }
  }
  console.log(result);
  output.innerHTML = result;

}