function createTickets(arr, sortingCretaria){
    let tickets = [];

    class Ticket{
        constructor(destination, price, status){
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    for(let ticket of arr){
        [destination, price, availability ] = ticket.split('|');
        tickets.push(new Ticket(destination, Number(price), availability));
    }
    const object = {
        destination: function() {
            tickets.sort((a,b) => a.destination.localeCompare(b.destination));
        },
        price: function (){
            tickets.sort((a,b) => a.price - b.price);
        },
        status: function(){
            tickets.sort((a,b) => a.status.localeCompare(b.status));
        }
    }
    object[sortingCretaria]();
    return tickets;
}
console.log(createTickets([
'New York City|95.99|available',
'Philadelphia|94.20|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'status'))