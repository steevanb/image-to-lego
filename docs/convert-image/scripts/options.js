document.getElementById('normalRadio').addEventListener('change', function () {
    hideProcessedImageSection();
    toggleBlackAndWhiteColors();
    checkAllCheckboxes();

});

document.getElementById('lightestRadio').addEventListener('change', function () {
    hideProcessedImageSection();
    toggleBlackAndWhiteColors();
    checkAllCheckboxes();
});

document.getElementById('blackAndWhiteRadio').addEventListener('change', function () {
    hideProcessedImageSection();
    toggleBlackAndWhiteColors();
    checkAllCheckboxes();
});

function toggleBlackAndWhiteColors() {
    const checkboxes = legoColorsCheckboxes.getElementsByTagName('input');
    const isBlackAndWhiteMode = document.querySelector('input[name="colorsType"]:checked').value === 'blackAndWhite';

    for (const checkbox of checkboxes) {
        const colorData = legoColors[checkbox.value];
        const isBlackAndWhite = colorData && colorData.blackAndWhite === true;
        const colorDataContainer = checkbox.parentElement.parentElement;

        if (isBlackAndWhiteMode) {
            if (isBlackAndWhite) {
                colorDataContainer.classList.remove('d-none');
            } else {
                colorDataContainer.classList.add('d-none');
            }
        } else {
            colorDataContainer.classList.remove('d-none');
        }
    }
}
