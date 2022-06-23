function sum(a){
    let totalSum = a;
    
    function add(num){
        totalSum += num;
        return add;
    }

    add.toString = () => {
        return totalSum;
    }
    return add;
}

console.log(sum(2).toString())
console.log(sum(1)(6)(-3)(4).toString());