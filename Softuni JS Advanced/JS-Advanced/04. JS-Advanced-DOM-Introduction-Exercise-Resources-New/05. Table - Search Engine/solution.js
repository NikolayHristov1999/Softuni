function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   function onClick() {
      let tbodytr = document.querySelectorAll("tbody tr");
      let searchContent = document.getElementById("searchField").value;

      for(let i = 0; i < tbodytr.length; i++){
         let item = tbodytr[i].children;

         for (let j = 0; j < item.length; j++){
            let regex = new RegExp(searchContent, "gi");
            if(item[j].textContent.match(regex)){
               tbodytr[i].classList.add("select");
               break;
            }
            else{
               tbodytr[i].classList.remove("select");
            }
         }
     }
   }
}