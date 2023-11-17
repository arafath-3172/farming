document.addEventListener('DOMContentLoaded', () => {
    const pressureValueElement = document.getElementById('pressure-value');
    const pressureChartElement = document.getElementById('pressure-chart');
    const pressureTableBodyElement = document.querySelector('#pressure-table tbody');

    const generateRandomValue = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    const generateRandomData = (minutes, interval = 10) => {
        const data = [];
        const currentTime = new Date();

        for (let i = minutes; i >= 0; i--) {
            const timestamp = new Date(currentTime.getTime() - i * 60 * 1000);
            const value = generateRandomValue(900, 1100); // Adjust the range as needed
            data.push({ time: timestamp, value: parseFloat(value.toFixed(2)) });
        }

        return data.filter((entry, index) => index % (interval / 10) === 0);
    };

    pressureValueElement.textContent = generateRandomValue(900, 1100).toFixed(2);

    let dataPast1Hour = generateRandomData(60);

    displayDataInTable(dataPast1Hour, pressureTableBodyElement);

    const updateChart = (data) => {
        const timestamps = data.map(entry => entry.time);
        const values = data.map(entry => entry.value);

        if (window.pressureChart) {
            window.pressureChart.destroy();
        }

        const ctx = pressureChartElement.getContext('2d');
        window.pressureChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps.map(time => time.toLocaleTimeString()),
                datasets: [{
                    label: 'Pressure Data',
                    data: values,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    lineTension: 0,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        min: 900,
                        max: 1100,
                    },
                },
            },
        });
    };

    updateChart(dataPast1Hour);

    setInterval(() => {
        dataPast1Hour = generateRandomData(60);
        displayDataInTable(dataPast1Hour, pressureTableBodyElement);
        updateChart(dataPast1Hour);
    }, 10000);

    const downloadPdfButton = document.getElementById('download-pdf-button');
    const downloadExcelButton = document.getElementById('download-excel-button');

    downloadPdfButton.addEventListener('click', () => {
        downloadPdf(dataPast1Hour);
    });

    downloadExcelButton.addEventListener('click', () => {
        downloadExcel(dataPast1Hour);
    });
});

const displayDataInTable = (data, tableBody) => {
    tableBody.innerHTML = '';

    data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.time.toLocaleTimeString()}</td>
            <td>${entry.value}</td>
        `;
        tableBody.appendChild(row);
    });
};

const downloadPdf = (data) => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: '#pressure-table' });
    pdf.save('pressure_data.pdf');
};

const downloadExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pressure Data');
    XLSX.writeFile(wb, 'pressure_data.xlsx');
};
