function createCars(arr){
    const brandCars = new Map();
    for(let data of arr){
        [brand, model, quantity] = data.split(' | ');
        let totalCars = Number(quantity);
        if (!brandCars.has(brand)){
            brandCars.set(brand, new Map());
        }
        if (!brandCars.get(brand).has(model)){
            brandCars.get(brand).set(model, 0);
        } else{
            totalCars += brandCars.get(brand).get(model);
        }
        brandCars.get(brand).set(model, totalCars);
    }
    let brands = brandCars.keys();
    for (let carBrand of brands){
        console.log(carBrand);
        const models = brandCars.get(carBrand).keys();
        for (let carModel of models){
            console.log(`###${carModel} -> ${brandCars.get(carBrand).get(carModel)}`);
        }
    }
}


console.log(createCars(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']));
