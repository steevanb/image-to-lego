document.addEventListener('DOMContentLoaded', function () {
    const legoPlateWidthInput = document.getElementById('legoPlateWidth');
    const legoPlateHeightInput = document.getElementById('legoPlateHeight');

    const savedWidth = localStorage.getItem('legoPlateWidth');
    const savedHeight = localStorage.getItem('legoPlateHeight');

    legoPlateWidthInput.value = savedWidth || '';
    legoPlateHeightInput.value = savedHeight || '';

    document.getElementById('link16x16').addEventListener('click', function () {
        setPlateDimensions(16, 16);
    });

    document.getElementById('link16x32').addEventListener('click', function () {
        setPlateDimensions(16, 32);
    });

    document.getElementById('link32x32').addEventListener('click', function () {
        setPlateDimensions(32, 32);
    });

    document.getElementById('link48x48').addEventListener('click', function () {
        setPlateDimensions(48, 48);
    });

    legoPlateWidthInput.addEventListener('change', function() {
        saveToLocalStorage();
        updateLegoMosaicDimensionsPlates();
    });
    legoPlateWidthInput.addEventListener('keyup', function() {
        saveToLocalStorage();
        updateLegoMosaicDimensionsPlates();
    });
    legoPlateHeightInput.addEventListener('change', function() {
        saveToLocalStorage();
        updateLegoMosaicDimensionsPlates();
    });
    legoPlateHeightInput.addEventListener('keyup', function() {
        saveToLocalStorage();
        updateLegoMosaicDimensionsPlates();
    });

    function setPlateDimensions(width, height) {
        legoPlateWidthInput.value = width;
        legoPlateHeightInput.value = height;
        updateLegoMosaicDimensionsPlates();
        saveToLocalStorage();
    }

    function saveToLocalStorage() {
        localStorage.setItem('legoPlateWidth', legoPlateWidthInput.value);
        localStorage.setItem('legoPlateHeight', legoPlateHeightInput.value);
    }
});
