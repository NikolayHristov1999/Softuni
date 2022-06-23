function calculateMoneyForFruit(fruit, weight, pricePerKg)
{
    let weightInKg = weight / 1000;
    let totalMoney = weightInKg * pricePerKg;
    console.log(`I need $${totalMoney.toFixed(2)} to buy ${weightInKg.toFixed(2)} kilograms ${fruit}.`);
}

function greatestCommonDivisor(a, b){
    for (let i = Math.min(a, b); i > 1; i--)
    {
        if (a % i == 0 && b % i == 0)
        {
            console.log(i);
            return;
        }
    }
    console.log(1);
    return;
}

function sameNumbers(a)
{
    let sum = 0;
    let remain = a % 10;
    let areSame = true;

    while(a > 0) {
        if (remain != a % 10) {
            areSame = false;
            sum += a % 10;
        }
        else {
            sum += remain;
        }
        a = Math.floor(a / 10);
    }
    console.log(areSame);
    console.log(sum);
}

function previousDay(year, month, day) {
    let date = new Date(`${year}-${month}-${day}`);
    date.setDate(date.getDate() - 1);
    console.log(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
}

function calculateTimeToUni(steps, lengthInM, kmPerHour) {
    let totalDistanceInKm = steps * lengthInM / 1000;
    let time = (totalDistanceInKm / kmPerHour) * 3600 + Math.floor(totalDistanceInKm / 0.5) * 60;
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let seconds = Math.ceil(time % 60);
    
    console.log(`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`)
}

function isInSpeedLimit(speed, zone) {
    let speedZone = 0;
    switch(zone){
        case "motorway":
            speedZone = 130;
            break;
        case "interstate":
            speedZone = 90;
            break;
        case "city":
            speedZone = 50;
            break;
        case "residential":
            speedZone = 20;
            break;
    }

    if (speed > speedZone){
        console.log(`The speed is ${speed - speedZone} km/h faster than the allowed speed of ${speedZone} - speeding`);
    }
    else{
        console.log(`Driving ${speed} km/h in a ${speedZone} zone`);
    }
    
}

function cookingByNumbers(integer, ...instructions){
    instructions.forEach((instruction) => {
        switch(instruction){
            case "chop":
                integer = integer / 2;
                break;
            case "dice":
                integer = Math.sqrt(integer);
                break;
            case "spice":
                integer++;
                break;
            case "bake":
                integer *= 3;
                break;
            case "fillet":
                integer = integer * 80 / 100;
                break;
        }
        console.log(integer);
    })
}

function fun () {
    counter = 0;
    function inner() {
        console.log(counter++);
    }
    inner();
}

const f = (function fun () {
    let counter = 0;
    return function () {
        console.log(counter++);
    }
})();
f();
f();
f();
f();
f();


