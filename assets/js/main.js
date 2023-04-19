const pesosCl = document.getElementById('pesos').value;
const otraMoneda = document.getElementById('otraMoneda').value;
const resultado = document.getElementById('resultado');

const fetchAPI = async () => {
    const pesosCl = document.getElementById('pesos').value;
    const otraMoneda = document.getElementById('otraMoneda').value;
    await fetch(`https://mindicador.cl/api`)
        .then(response => response.json())
        .then(data => {
            const { dolar, euro, uf, ivp } = data;
            if (otraMoneda == 'dolar') {
                resultado.innerHTML = `$ ${(pesosCl / dolar.valor).toFixed(2)}`;
            } else if (otraMoneda == 'euro') {
                resultado.innerHTML = `€ ${(pesosCl / euro.valor).toFixed(2)}`;
            } else if (otraMoneda == 'uf') {
                resultado.innerHTML = `${(pesosCl / uf.valor).toFixed(2)} UF`;
            } else if (otraMoneda == 'ivp') {
                resultado.innerHTML = `${(pesosCl / ivp.valor).toFixed(2)} IVP`;
            }
        })
        .catch(error => console.log(error));
}

async function renderChart() {
    const grafica = document.getElementById('grafica');
    grafica.innerHTML = `<canvas id="myChart"></canvas>`;
    const otraMoneda = document.getElementById('otraMoneda').value;
    const ctx = document.getElementById('myChart');
    await fetch(`https://mindicador.cl/api/${otraMoneda}/2023`)
        .then(response => response.json())
        .then(data => {
            let valoresMoneda = [];
            let ultimasfechas = [];
            for (let i = 0; i < 10; i++) {
                valoresMoneda.push(data.serie[i].valor);
                ultimasfechas.push((data.serie[i].fecha).substring(0, 10));
            }
            const labels = ultimasfechas.reverse();
            new Chart(ctx, config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Valores del ${otraMoneda.toUpperCase()} los últimos diez días`,
                        data: valoresMoneda,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }
            })
        })
        .catch(error => console.log(error));
}
document.getElementById("convertir").addEventListener('click', renderChart);
document.getElementById("convertir").addEventListener('click', fetchAPI);

