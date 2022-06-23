class List{
    
    constructor(){
        this.size = 0;
        this.arr = [];
    }

    add(element){
        let i = 0;
        for (i = 0; i < this.size && element > this.arr[i]; i++){}
        this.arr.splice(i, 0, element)
        this.size++;
    }

    remove(index){
        if (index >= this.size || this.size < 0){
            throw new RangeError('Greshka');
        }
        this.arr.splice(index,1);
        this.size--;
    }

    get(index){
        if (index >= this.size || this.size < 0){
            throw new RangeError('Greshka');
        }
        return this.arr[index];
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
