function argumentInfo (...params){
    const result = [];
    for (let param of params){
        console.log(typeof param  + ": " + param);
        if(!result[typeof param]){
            result[typeof param] = 0;
        }
        result[typeof param]++;
        
    }
    let sorted = Object.keys(result).sort((a,b) => result[b] - result[a]);

    for(let key of sorted){
        console.log(key + " = " + result[key]);
    }
}

console.log(argumentInfo({ name: 'bob'}, 3.333, 9.999));