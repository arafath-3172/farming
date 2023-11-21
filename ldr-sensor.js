document.addEventListener('DOMContentLoaded', () => {
    const ldrValueElement = document.getElementById('ldr-value');
    const ldrChartElement = document.getElementById('ldr-chart');
    const ldrTableBodyElement = document.querySelector('#ldr-table tbody');

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
            const value = generateRandomValue(0, 10000); // Adjust the range as needed
            data.push({ time: timestamp, value: parseFloat(value) });
        }

        return data.filter((entry, index) => index % (interval / 10) === 0); // Filter data for every 10 minutes
    };

    // Update LDR sensor value with random data (replace this with actual data)
    ldrValueElement.textContent = generateRandomValue(0, 10000);

    // Generate random data for the past 1 hour with a data point every 10 minutes
    let ldrDataPast1Hour = generateRandomData(60);

    // Display initial data in the LDR table
    displayDataInTable(ldrDataPast1Hour, ldrTableBodyElement);

    // Create and update the LDR chart
    const updateLdrChart = (data) => {
        const timestamps = data.map(entry => entry.time);
        const values = data.map(entry => entry.value);

        if (window.ldrChart) {
            window.ldrChart.destroy(); // Destroy the existing chart if it exists
        }

        const ctx = ldrChartElement.getContext('2d');
        window.ldrChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps.map(time => time.toLocaleTimeString()),
                datasets: [{
                    label: 'LDR Data',
                    data: values,
                    borderColor: 'rgba(255, 99, 132, 1)',
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
                        max: 10000,
                    },
                },
            },
        });
    };

    updateLdrChart(ldrDataPast1Hour);

    // Update the LDR chart every 10 seconds
    setInterval(() => {
        // Generate new data for the past 1 hour with a data point every 10 minutes
        ldrDataPast1Hour = generateRandomData(60);
        displayDataInTable(ldrDataPast1Hour, ldrTableBodyElement);
        updateLdrChart(ldrDataPast1Hour);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Download buttons
    const downloadPdfButtonLdr = document.getElementById('download-pdf-button-ldr');
    const downloadExcelButtonLdr = document.getElementById('download-excel-button-ldr');

    // Event listener for PDF download
    downloadPdfButtonLdr.addEventListener('click', () => {
        downloadPdf(ldrDataPast1Hour, 'ldr_data.pdf');
    });

    // Event listener for Excel download
    downloadExcelButtonLdr.addEventListener('click', () => {
        downloadExcel(ldrDataPast1Hour, 'ldr_data.xlsx');
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
const downloadPdf = (data, fileName) => {
    const pdf = new jsPDF();
    pdf.autoTable({ html: '#ldr-table' }); // Use the HTML table for PDF generation
    pdf.save(fileName);
};

// Function to download data in Excel format
const downloadExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LDR Data');
    XLSX.writeFile(wb, fileName);
};
