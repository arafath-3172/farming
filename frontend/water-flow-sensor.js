document.addEventListener('DOMContentLoaded', () => {
    const waterFlowValueElement = document.getElementById('water-flow-value');
    const waterFlowChartElement = document.getElementById('water-flow-chart');
    const waterFlowTableBodyElement = document.querySelector('#water-flow-table tbody');

    // Function to generate a random value within a given range
    const generateRandomValue = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Function to generate random data for the past time period
    const generateRandomData = (minutes, interval = 10) => {
        const data = [];
        const currentTime = new Date();

        for (let i = minutes; i >= 0; i--) {
            const timestamp = new Date(currentTime.getTime() - i * 60 * 1000);
            const value = generateRandomValue(0, 500); // Adjust the range as needed
            data.push({ time: timestamp, value: parseFloat(value) });
        }

        return data.filter((entry, index) => index % (interval / 10) === 0); // Filter data for every 10 minutes
    };

    // Update sensor value with random data (replace this with actual data)
    waterFlowValueElement.textContent = generateRandomValue(0, 500);

    // Generate random data for the past 1 hour with a data point every 10 minutes
    let dataPast1Hour = generateRandomData(60);

    // Display initial data in the table
    displayDataInTable(dataPast1Hour, waterFlowTableBodyElement);

    // Create and update the chart
    const updateChart = (data) => {
        const timestamps = data.map(entry => entry.time);
        const values = data.map(entry => entry.value);

        if (window.waterFlowChart) {
            window.waterFlowChart.destroy(); // Destroy the existing chart if it exists
        }

        const ctx = waterFlowChartElement.getContext('2d');
        window.waterFlowChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps.map(time => time.toLocaleTimeString()),
                datasets: [{
                    label: 'Water Flow Data',
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
                        min: 0,
                        max: 500,
                    },
                },
            },
        });
    };

    updateChart(dataPast1Hour);

    // Update the chart every 10 seconds
    setInterval(() => {
        // Generate new data for the past 1 hour with a data point every 10 minutes
        dataPast1Hour = generateRandomData(60);
        displayDataInTable(dataPast1Hour, waterFlowTableBodyElement);
        updateChart(dataPast1Hour);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Download buttons
    const downloadPdfButton = document.getElementById('download-pdf-button');
    const downloadExcelButton = document.getElementById('download-excel-button');

    // Event listener for PDF download
    downloadPdfButton.addEventListener('click', () => {
        downloadPdf(dataPast1Hour);
    });

    // Event listener for Excel download
    downloadExcelButton.addEventListener('click', () => {
        downloadExcel(dataPast1Hour);
    });
});

// Function to display data in the table
const displayDataInTable = (data, tableBody) => {
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.time.toLocaleTimeString()}</td>
            <td>${entry.value}</td>
        `;
        tableBody.appendChild(row);
    });
};

// Function to download data in PDF format
const downloadPdf = (data) => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: '#water-flow-table' });
    pdf.save('water_flow_data.pdf');
};

// Function to download data in Excel format
const downloadExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Water Flow Data');
    XLSX.writeFile(wb, 'water_flow_data.xlsx');
};
