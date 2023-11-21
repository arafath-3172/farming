document.addEventListener('DOMContentLoaded', () => {
    const bh1750ValueElement = document.getElementById('bh1750-value');
    const bh1750ChartElement = document.getElementById('bh1750-chart');
    const bh1750TableBodyElement = document.querySelector('#bh1750-table tbody');

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

    // Update BH1750 sensor value with random data (replace this with actual data)
    bh1750ValueElement.textContent = generateRandomValue(0, 10000);

    // Generate random data for the past 1 hour with a data point every 10 minutes
    let bh1750DataPast1Hour = generateRandomData(60);

    // Display initial data in the BH1750 table
    displayDataInTable(bh1750DataPast1Hour, bh1750TableBodyElement);

    // Create and update the BH1750 chart
    const updateBh1750Chart = (data) => {
        const timestamps = data.map(entry => entry.time);
        const values = data.map(entry => entry.value);

        if (window.bh1750Chart) {
            window.bh1750Chart.destroy(); // Destroy the existing chart if it exists
        }

        const ctx = bh1750ChartElement.getContext('2d');
        window.bh1750Chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps.map(time => time.toLocaleTimeString()),
                datasets: [{
                    label: 'BH1750 Data',
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
                        max: 10000,
                    },
                },
            },
        });
    };

    updateBh1750Chart(bh1750DataPast1Hour);

    // Update the BH1750 chart every 10 seconds
    setInterval(() => {
        // Generate new data for the past 1 hour with a data point every 10 minutes
        bh1750DataPast1Hour = generateRandomData(60);
        displayDataInTable(bh1750DataPast1Hour, bh1750TableBodyElement);
        updateBh1750Chart(bh1750DataPast1Hour);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Download buttons
    const downloadPdfButton = document.getElementById('download-pdf-button-bh1750');
    const downloadExcelButton = document.getElementById('download-excel-button-bh1750');

    // Event listener for PDF download
    downloadPdfButton.addEventListener('click', () => {
        downloadPdf(bh1750DataPast1Hour, 'bh1750_data.pdf');
    });

    // Event listener for Excel download
    downloadExcelButton.addEventListener('click', () => {
        downloadExcel(bh1750DataPast1Hour, 'bh1750_data.xlsx');
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
    pdf.autoTable({ html: '#bh1750-table' }); // Use the HTML table for PDF generation
    pdf.save(fileName);
};

// Function to download data in Excel format
const downloadExcel = (data, fileName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BH1750 Data');
    XLSX.writeFile(wb, fileName);
};
