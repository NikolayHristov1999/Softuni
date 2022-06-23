function solution(){
    const menu = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    }
    const ingredients = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }
    const command = {
        prepare: function(value, quantity){
            const keys = Object.keys(menu[value]);
            for (let i = 0 ; i < Number(quantity); i++){
                for (let key of keys){
                    if (ingredients[key] < menu[value][key]){
                        return `Error: not enough ${key} in stock`;
                        
                    } else{
                        ingredients[key] -= menu[value][key];
                    }
                }
            }
            return "Success";
        },
        restock: function(value, quantity){
            ingredients[value] += Number(quantity);
            return "Success";
        }
    }

    return (option) => {
        if (option == "report"){
            let result = "";
            for (let key in ingredients){
                result += `${key}=${ingredients[key]} `;
            }
            return result.trim();
        }
        [cmd, product, quantity] = option.split(" ")
        return command[cmd](product, quantity);
    }
}

let manager = solution (); 

console.log(manager("restock flavour 50"))
console.log(manager("prepare lemonade 4 "));
console.log(manager("restock carbohydrate 10"));
console.log(manager("restock flavour 10"));
console.log(manager("prepare apple 1"));
console.log(manager("restock fat 10"));
console.log(manager("prepare burger 1"));
console.log(manager("report"));