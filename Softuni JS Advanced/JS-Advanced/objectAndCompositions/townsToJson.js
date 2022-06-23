function townsToJSON(arr) {
    const removeEmptyEntries = strArr => strArr.filter(x => x != "").map(x => x.trim());
    const table = [];
    const [name1, name2, name3] = removeEmptyEntries(arr[0].split("|"));
    for (let i = 1; i < arr.length; i++){
        let [town, latitude, longitude] = removeEmptyEntries(arr[i].split("|"));
        const obj = {[name1]: town, [name2]: Number(Number(latitude).toFixed(2)), [name3]:Number(Number(longitude).toFixed(2))};
        table.push(obj);
    }
    console.log(table);
    console.log(JSON.stringify(table));
}

townsToJSON(['| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']);

//     [{"Town":"Sofia",
//     "Latitude":42.7,
//     "Longitude":23.32
//   },
//   {"Town":"Beijing", 
//    "Latitude":39.91, 
//    "Longitude":116.36
//   }]

