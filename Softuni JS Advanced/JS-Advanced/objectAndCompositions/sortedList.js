function createSortedList(){
    let obj = {
        list: [],
        size: 0,
    };
    obj.add = function(item) {
        let i = 0;
        for (; i < obj.list.length; i++){
            if (obj.list[i] > item){
                break;
            }
        }
        obj.list.splice(i, 0, item);
        obj.size++;
    }
    obj.remove = function(index){
        if (index >= obj.size && index < 0){
            return ;
        }
        let item = obj.list[index];
        obj.list.splice(index, 1);
        if (obj.size > 0){
            obj.size--;
        }
        return item;
    }

    obj.get = function(index){
        if (index < obj.size && index >= 0){
            return obj.list[index];
        }
    }
    return obj;
}


let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.list);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));
console.log(list.size);
