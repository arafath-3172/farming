document.addEventListener('DOMContentLoaded', () => {
    const dissolveOxygenValueElement = document.getElementById('dissolve-oxygen-value');
    const dissolveOxygenChartElement = document.getElementById('dissolve-oxygen-chart');
    const dissolveOxygenTableBodyElement = document.querySelector('#dissolve-oxygen-table tbody');

    // Function to generate a random value within a given range
    const generateRandomValue = (min, max) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };

    // Function to generate random data for the past time period
    const generateRandomData = (minutes, interval = 10) => {
        const data = [];
        const currentTime = new Date();

        for (let i = minutes; i >= 0; i--) {
            const timestamp = new Date(currentTime.getTime() - i * 60 * 1000);
            const value = generateRandomValue(0, 20); // Adjust the range as needed
            data.push({ time: timestamp, value: parseFloat(value) });
        }

        return data.filter((entry, index) => index % (interval / 10) === 0); // Filter data for every 10 minutes
    };

    // Update sensor value with random data (replace this with actual data)
    dissolveOxygenValueElement.textContent = generateRandomValue(0, 20);

    // Generate random data for the past 1 hour with a data point every 10 minutes
    let dataPast1Hour = generateRandomData(60);

    // Display initial data in the table
    displayDataInTable(dataPast1Hour, dissolveOxygenTableBodyElement);

    // Create and update the chart
    const updateChart = (data) => {
        const timestamps = data.map(entry => entry.time);
        const values = data.map(entry => entry.value);

        if (window.dissolveOxygenChart) {
            window.dissolveOxygenChart.destroy(); // Destroy the existing chart if it exists
        }

        const ctx = dissolveOxygenChartElement.getContext('2d');
        window.dissolveOxygenChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps.map(time => time.toLocaleTimeString()),
                datasets: [{
                    label: 'Dissolve Oxygen Data',
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
                        max: 20,
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
        displayDataInTable(dataPast1Hour, dissolveOxygenTableBodyElement);
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
    pdf.autoTable({ html: '#dissolve-oxygen-table' }); // Use the HTML table for PDF generation
    pdf.save('dissolve_oxygen_data.pdf');
};

// Function to download data in Excel format
const downloadExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dissolve Oxygen Data');
    XLSX.writeFile(wb, 'dissolve_oxygen_data.xlsx');
};
