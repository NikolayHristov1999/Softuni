function search() {
   const towns = document.getElementById("towns").children;
   const searchQuery = document.getElementById("searchText").value;
   const result = document.getElementById("result");
   let reg = new RegExp(searchQuery, 'gi');
   let counter = 0;

   for (let i = 0; i < towns.length; i++){
      if (towns[i].textContent.match(reg)){
         towns[i].style.fontWeight = "bold";
         towns[i].style.textDecoration = "underline";
         counter++;
      }
   }
   result.textContent = `${counter} matches found`;
}
