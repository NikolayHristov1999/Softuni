function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      let text = document.getElementsByTagName("textarea")[0].value;
      let items = text.split('"');
      const bestRestaurant = document.querySelector("#bestRestaurant p");
      const workersInRest = document.querySelector("#workers p");
      const result = [];

      for (let i = 1; i < items.length; i += 2) {
         let data = items[i].split(" - ");
         let workers = data[1].split(", ");
         const obj = {workers: {}};
         let sum = 0;
         let max = Number.MIN_SAFE_INTEGER;
         
         for (let j = 0; j < workers.length; j++) {
            let workerData = workers[j].split(" ");
            salary = Number(workerData[1])
            obj["workers"][workerData[0]] = salary;
            sum += salary;
            if (salary > max){
               max = salary;
            }
         }
         obj["avrSalary"] = sum / workers.length;
         obj["bestSalary"] = max;

         result[data[0]] = obj;
         console.log(result);
      }

      let nameBest;
      let maxAverage = 0;
      for (let key in result){
         if (result[key]["avrSalary"] > maxAverage){
            nameBest = key;
         }
      }
      bestRestaurant.textContent = `Name: ${nameBest} Average Salary: ${result[nameBest]["avrSalary"].toFixed(2)} Best Salary: ${result[nameBest]["bestSalary"].toFixed(2)}`;
      
      let str = "";
      for (let key in result[nameBest]["workers"]){
         str += `Name: ${key} With Salary: ${result[nameBest]["workers"][key]} `;
      }
      workersInRest.textContent = str;

   }
}