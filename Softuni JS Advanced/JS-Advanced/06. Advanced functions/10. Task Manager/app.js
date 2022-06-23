function solve() {
    document.getElementById('add').addEventListener('click',add);
    const openDiv = document.querySelectorAll("section")[1].querySelectorAll('div')[1];
    const inProgressDiv = document.getElementById('in-progress');
    const completedDiv = document.querySelectorAll("section")[3].querySelectorAll('div')[1];

    function add(e){
        e.preventDefault();
        const task = document.getElementById('task');
        const description = document.getElementById('description');
        const dueDate = document.getElementById('date');
        
        if (task.value && description.value && dueDate.value){
            const article = document.createElement('article');
            const titleH3 = document.createElement('h3');
            const descrP = document.createElement('p');
            const dueDateP = document.createElement('p');
            const buttonsDiv = document.createElement('div');

            titleH3.textContent = task.value;
            descrP.textContent = 'Description: ' + description.value;
            dueDateP.textContent = `Due Date: ${dueDate.value}`;
            buttonsDiv.classList.add('flex');

            const startBtn = document.createElement('button');
            startBtn.classList.add('green');
            startBtn.textContent = 'Start';
            startBtn.addEventListener('click', start);
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('red');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', deleteArticle);

            buttonsDiv.appendChild(startBtn);
            buttonsDiv.appendChild(deleteBtn);

            article.appendChild(titleH3);
            article.appendChild(descrP);
            article.appendChild(dueDateP);
            article.appendChild(buttonsDiv);

            openDiv.appendChild(article);
        }
    }
    

    /**
     * 
     * @param {PointerEvent} e 
     */
    function start(e){
        const leftBtn = e.target;
        const rightBtn = e.target.parentElement.children[1];
        const article = e.target.parentElement.parentElement;
        inProgressDiv.appendChild(article);

        leftBtn.textContent = 'Delete';
        leftBtn.className = 'red';
        leftBtn.removeEventListener('click', start);
        leftBtn.addEventListener('click', deleteArticle);
        rightBtn.textContent = 'Finish';
        rightBtn.className = 'green';
        rightBtn.removeEventListener('click', deleteArticle);
        rightBtn.addEventListener('click', complete);
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    function deleteArticle(e){
        const article = e.target.parentElement.parentElement;
        article.parentElement.removeChild(article);
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    function complete(e){
        const article = e.target.parentElement.parentElement;
        completedDiv.appendChild(article);
        article.removeChild(article.querySelector('div'));
    }
}