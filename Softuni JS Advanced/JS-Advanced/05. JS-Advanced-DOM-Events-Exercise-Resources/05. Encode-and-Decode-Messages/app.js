function encodeAndDecodeMessages() {
    const buttons = document.getElementsByTagName("button");
    buttons[0].addEventListener('click', encode)
    buttons[1].addEventListener('click', decode)
    

    function encode(e){
        const textAreas = document.getElementsByTagName("textarea");
        const text = textAreas[0].value;
        encoded = [];
        for(let i = 0; i < text.length; i++){
            encoded.push(String.fromCharCode(text.charCodeAt(i) + 1));
        }
        encoded = encoded.join("");

        textAreas[1].value = encoded;
        textAreas[0].value = "";
    }

    function decode(e){
        const textArea = e.target.parentElement.querySelector("textArea");
        const text = textArea.value;
        encoded = [];
        for(let i = 0; i < text.length; i++){
            encoded.push(String.fromCharCode(text.charCodeAt(i) - 1));
        }
        encoded = encoded.join("");

        textArea.value = encoded;
    }
}