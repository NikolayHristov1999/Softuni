/*You will be given different juices, as strings. You will also receive quantity as a number. If you receive a juice that you already have, you must sum the current quantity of that juice, with the given one. When a juice reaches 1000 quantity, it produces a bottle. You must store all produced bottles and you must print them at the end.
Note: 1000 quantity of juice is one bottle. If you happen to have more than 1000, you must make as many bottles as you can, and store what is left from the juice.
Example: You have 2643 quantity of Orange Juice – this is 2 bottles of Orange Juice and 643 quantity left.
Input
The input comes as an array of strings. Each element holds data about a juice and quantity in the following format:
"{juiceName} => {juiceQuantity}"
*/


function func(arr) {
    const bottles = new Map(); 
    const map = new Map();
    for (let data of arr) {
        [flower, quantity] = data.split(' => ');
        let totalQuantity = Number(quantity);
        if (map.has(flower)) {
            totalQuantity += map.get(flower);
        }

        if (totalQuantity >= 1000){
            map.set(flower, totalQuantity % 1000);
            if (bottles.has(flower)) {
                bottles.set(flower, Math.round(totalQuantity / 1000) + bottles.get(flower));
            } else {
                bottles.set(flower, Math.round(totalQuantity / 1000));
            }
        } else{
            map.set(flower, totalQuantity);
        }
    }
    for(let key of bottles.keys()){
        console.log(`${key} => ${bottles.get(key)}`);
    }

}


func(['Orange => 2000',
    'Peach => 1432',
    'Banana => 450',
    'Peach => 600',
    'Strawberry => 549']
)
