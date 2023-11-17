document.addEventListener('DOMContentLoaded', () => {
    const temperatureValueElement = document.getElementById('temperature-value');
    const humidityValueElement = document.getElementById('humidity-value');
    const co2ValueElement = document.getElementById('co2-value');
    const oxygenValueElement = document.getElementById('oxygen-value');
    const barometricValueElement = document.getElementById('barometric-value');

    // Function to generate a random value within a given range
    const generateRandomValue = (min, max) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };

    // Update sensor values with random data (replace this with actual data)
    temperatureValueElement.textContent = generateRandomValue(-10, 40) + ' °C';
    humidityValueElement.textContent = generateRandomValue(20, 80) + ' %';
    co2ValueElement.textContent = generateRandomValue(300, 1000) + ' ppm';
    oxygenValueElement.textContent = generateRandomValue(0, 20) + ' %';
    barometricValueElement.textContent = generateRandomValue(300, 1100) + ' hPa';
});
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    // Event listener for "View Sensor's Data" buttons
    const viewSensorDataButtons = document.querySelectorAll('.view-sensor-data-button');
    viewSensorDataButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sensorName = button.dataset.sensor;
            window.location.href = `${sensorName}.html`;
        });
    });
});