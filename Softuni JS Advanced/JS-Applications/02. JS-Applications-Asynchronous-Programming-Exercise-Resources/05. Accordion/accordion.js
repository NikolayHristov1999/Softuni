async function solution() {
    const main = document.getElementById('main');
    const data = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    if (data.status != 200) {
        return;
    }
    const json = await data.json();
    for (let title of json) {
        const detailsData = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${title._id}`);

        if (detailsData.status != 200) {
            break;
        }
        const details = await detailsData.json();

        const div = createAccordionDiv(title._id, title.title, details.content);
        main.appendChild(div);

    }

    console.log(json);
}

function createAccordionDiv(id, title, extra) {
    const accordionDiv = document.createElement('div');
    accordionDiv.className = 'accordion';
    accordionDiv.innerHTML = `<div class="head">
<span>${title}</span>
<button class="button" id="${id}">More</button>
</div>
<div class="extra">
    <p>${extra}</p>
</div>`;
    accordionDiv.querySelector('button').addEventListener('click', toggle);
    return accordionDiv;
}

function toggle(e) {
    const accordionDiv = e.target.parentElement.parentElement;
    const extraDiv = accordionDiv.querySelector('.extra');
    if (e.target.textContent == 'More') {
        extraDiv.style.display = 'block';
        e.target.textContent = 'Less';
    } else {
        extraDiv.style.display = 'none';
        e.target.textContent = 'More';
    }
}

solution();

/*<div class="accordion">
    <div class="head">
        <span>Scalable Vector Graphics</span>
        <button class="button" id="ee9823ab-c3e8-4a14-b998-8c22ec246bd3">More</button>
    </div>
    <div class="extra">
        <p>Scalable Vector Graphics .....</p>
    </div>
</div>  */