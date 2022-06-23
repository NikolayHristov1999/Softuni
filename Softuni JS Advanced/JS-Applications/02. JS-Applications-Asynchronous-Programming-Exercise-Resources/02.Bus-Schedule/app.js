function solve() {
    const uri = 'http://localhost:3030/jsonstore/bus/schedule/';
    const info = document.querySelector('#info .info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let nextStopId = 'depot';
    let nextStopName = 'Depot';

    async function depart() {
        let data = await fetch(uri + nextStopId);
        let json = await data.json();
        nextStopId = json.next;
        nextStopName = json.name;

        info.textContent = `Next stop ${nextStopName}`;
        departBtn.disabled = true;
        arriveBtn.removeAttribute('disabled');
    }

    function arrive() {
        info.textContent = `Arriving at ${nextStopName}`;

        arriveBtn.disabled = true;
        departBtn.removeAttribute('disabled');
    }

    return {
        depart,
        arrive
    };
}

let result = solve();