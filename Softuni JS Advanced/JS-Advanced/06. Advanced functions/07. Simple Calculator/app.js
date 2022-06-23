function calculator() {
    return {
        a:0,
        b:0,
        result: 0,
        init(sel1, sel2, resultSel) {
            a = document.querySelector(sel1);
            b = document.querySelector(sel2);
            result = document.querySelector(resultSel);
        },
        add(){
            result.value = Number(a.value) + Number(b.value);
        },
        subtract(){
            result.value = Number(a.value) - Number(b.value);
        }
    }
}


const calculate = calculator (); 
calculate.init('#num1', '#num2', '#result'); 
