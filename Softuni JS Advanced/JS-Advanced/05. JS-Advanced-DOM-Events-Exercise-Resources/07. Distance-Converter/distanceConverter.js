function attachEventsListeners() {
    const meterRelations = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254
    }

    document.getElementById('convert').addEventListener('click', convert);

    function convert(e){
        const input = Number(document.getElementById('inputDistance').value);
        const inputUnit = document.getElementById('inputUnits').selectedOptions[0].value;
        const outputUnit = document.getElementById('outputUnits').selectedOptions[0].value;
        const output = document.getElementById('outputDistance');
        output.disabled = false;
        output.value = (input  * meterRelations[inputUnit]) / meterRelations[outputUnit];
    }
}