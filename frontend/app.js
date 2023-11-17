document.addEventListener('DOMContentLoaded', () => {
    const features = document.querySelectorAll('.feature');

    features.forEach((feature) => {
        feature.addEventListener('click', () => {
            const featureId = feature.id;
            window.location.href = `${featureId}.html`;
        });
    });
});
