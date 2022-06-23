function solve() {
    let text = document.getElementsByTagName("textarea").value;
    console.log(text);
    let items = text.split('"');
    for(let i = 1; i < items.length;i+=2){
        console.log(test[i]);
    }
}