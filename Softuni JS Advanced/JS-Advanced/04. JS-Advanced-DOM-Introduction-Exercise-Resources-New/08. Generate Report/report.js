function generateReport() {
    const el = Array.from(document.querySelectorAll("th input"));
    const checkedHeaders = [];
    const tableBody = document.querySelectorAll("tbody tr");
    const output = document.getElementById("output");
    const result = [];

    el.forEach((item, index) =>{
        if (item.checked == true){
            checkedHeaders[item.name] = index;
        }
    })

    for(let tr of tableBody){
        const obj = {};
        for (let header in checkedHeaders){
            let index = checkedHeaders[header];
            obj[header] = tr.children[index].textContent;
        }
        result.push(obj);
        console.log(obj);
    }
    output.value = JSON.stringify(result);
}