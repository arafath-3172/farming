document.addEventListener('DOMContentLoaded', () => {
    const bh1750ValueElement = document.getElementById('bh1750-value');
    const ldrValueElement = document.getElementById('ldr-value');

    // Function to generate a random value within a given range
    const generateRandomValue = (min, max) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };

    // Update sensor values with random data (replace this with actual data)
    bh1750ValueElement.textContent = generateRandomValue(0.0001, 107527);
    ldrValueElement.textContent = generateRandomValue(0, 1023);
});
