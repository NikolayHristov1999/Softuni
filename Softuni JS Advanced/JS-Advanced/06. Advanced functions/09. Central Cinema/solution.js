function solve() {
    document.querySelector('#container button').addEventListener('click', add);
    [movieNameNode,hallNode,ticketPriceNode] = document.querySelectorAll('#container input');
    document.querySelector('#archive button').addEventListener('click', clear);
    const ulMovies = document.querySelector('#movies ul');
    const archiveList = document.querySelector('#archive ul');

    function add(e){
        e.preventDefault();
        const ticketPrice = Number(ticketPriceNode.value);
        const movieName = movieNameNode.value;
        const hall = hallNode.value;
        console.log(movieName);
        console.log(hall);
        console.log(ticketPrice);
        if (movieName && hall && !isNaN(ticketPrice)){
            const movie = document.createElement('li');
            const nameSpan = document.createElement('span');
            const strongHall = document.createElement('strong')

            const divInLi = document.createElement('div');
            const strongPriceInDiv = document.createElement('strong');
            const inputInDiv = document.createElement('input')
            const archiveBtnInDiv = document.createElement('button');

            strongPriceInDiv.textContent = ticketPrice.toFixed(2);
            inputInDiv.placeholder = "Tickets Sold";
            archiveBtnInDiv.textContent = 'Archive';
            archiveBtnInDiv.addEventListener('click', archiveMovie)

            divInLi.appendChild(strongPriceInDiv);
            divInLi.appendChild(inputInDiv);
            divInLi.appendChild(archiveBtnInDiv);

            nameSpan.textContent = movieName;
            strongHall.textContent = `Hall: ${hall}`;

            movie.appendChild(nameSpan);
            movie.appendChild(strongHall);
            movie.appendChild(divInLi);

            ulMovies.appendChild(movie);

        }
    }
    
    /**
     * 
     * @param  e 
     */
    function archiveMovie(e){
        const parentDiv = e.target.parentElement;
        const parentLi = e.target.parentElement.parentElement;
        const numberOfTickets = Number(parentDiv.children[1].value);
        if (!isNaN(numberOfTickets) && numberOfTickets > 0 ){
            const li = document.createElement('li')
            const nameSpan = document.createElement('span');
            const totalAmountStrong = document.createElement('strong');
            const deleteButton = document.createElement('button');

            nameSpan.textContent = parentLi.children[0].textContent;
            totalAmountStrong.textContent = 'Total amount: ' + (numberOfTickets * Number(parentDiv.children[0].textContent)).toFixed(2);
            deleteButton.textContent = 'deleteButton';
            deleteButton.addEventListener('click', deleteArchive);

            li.appendChild(nameSpan);
            li.appendChild(totalAmountStrong);
            li.appendChild(deleteButton);

            archiveList.appendChild(li);
        }
    }

    function deleteArchive(e){
        const liItem = e.target.parentElement;
        archiveList.removeChild(liItem);
    }

    function clear(){
        archiveList.innerHTML = "";
    }


}