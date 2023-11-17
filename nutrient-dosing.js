document.addEventListener('DOMContentLoaded', () => {
    const phValueElement = document.getElementById('ph-value');
    const tdsValueElement = document.getElementById('tds-value');
    const ultrasonicValueElement = document.getElementById('ultrasonic-value');
    const temperatureValueElement = document.getElementById('temperature-value');

    // Function to generate a random value within a given range
    const generateRandomValue = (min, max) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };
    const waterFlowValueElement = document.getElementById('water-flow-value');
    const dissolveOxygenValueElement = document.getElementById('dissolve-oxygen-value');

    // Update additional sensor values with random data (replace this with actual data)
    waterFlowValueElement.textContent = generateRandomValue(0, 500); // Assuming it's measured in ml
    dissolveOxygenValueElement.textContent = generateRandomValue(0, 20) + ' mg/L';
    // Update sensor values with random data (replace this with actual data)
    phValueElement.textContent = generateRandomValue(0, 14);
    tdsValueElement.textContent = generateRandomValue(0, 1000);
    ultrasonicValueElement.textContent = generateRandomValue(2, 400);
    temperatureValueElement.textContent = generateRandomValue(-10, 85);
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