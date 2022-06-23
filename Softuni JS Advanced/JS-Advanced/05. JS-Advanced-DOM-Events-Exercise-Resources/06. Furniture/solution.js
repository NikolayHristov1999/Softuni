function solve() {
  const ex = document.getElementById("exercise");
  const table = document.querySelector('table.table tbody');
  const [generateBtn, buyBtn] = Array.from(document.getElementsByTagName("button"));
  const [input, output] = Array.from(document.getElementsByTagName("textarea"));

  generateBtn.addEventListener('click',generate);
  buyBtn.addEventListener('click', buy);

  function generate(e) {
    const data = JSON.parse(input.value);

    for (let item of data) {
      const row = document.createElement('tr');
      const imgCell = createCell('img',{src:item.img});
      const nameCell = createCell('p',{}, item.name);
      const priceCell = createCell('p',{}, item.price);
      const decorationCell = createCell('p',{}, item.decFactor);
      const checkCell = createCell('input', {type:'checkbox'});

      row.appendChild(imgCell);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(decorationCell);
      row.appendChild(checkCell);

      table.appendChild(row);

      function createCell(nestedTag, props, content){
        const cell = document.createElement('td');
        const nested = document.createElement(nestedTag);

        for (let prop in props){
          nested[prop] = props[prop];
        }

        if(content){
          nested.textContent = content;
        }

        console.log(nested);
        cell.appendChild(nested);
        return cell;
      }
    }


  }

  function buy(e){
    const furniture = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(b => b.parentElement.parentElement)
      .map(r => ({
        name: r.children[1].textContent,
        price: Number(r.children[2].textContent),
        decFactor:  Number(r.children[3].textContent),
      }))

    const names = [];
    let total = 0;
    let decFactor = 0;

    for(let item of furniture){
      names.push(item.name);
      total += item.price;
      decFactor += item.decFactor;
    }

    const result = `Bought furniture: ${names.join(', ')}
Total price: ${total.toFixed(2)}
Average decoration factor: ${(decFactor / furniture.length)}`
    output.value = result;
  }
}