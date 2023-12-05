document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('legoMosaicDimensionsUploadedImage');
    const legoMosaicDimensionsImage = document.getElementById('legoMosaicDimensionsImage');
    const legoMosaicDimensionsPlates = document.getElementById('legoMosaicDimensionsPlates');

    const savedWidth = localStorage.getItem('legoPlateWidth');
    const savedHeight = localStorage.getItem('legoPlateHeight');

    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imgContainer = document.getElementById('legoMosaicDimensionsContainer');
                legoMosaicDimensionsImage.src = e.target.result;

                updateLegoMosaicDimensions();
                updateLegoMosaicDimensionsPlates();

                imgContainer.classList.remove('d-none');
            };

            reader.readAsDataURL(file);
        }
    });

    window.updateLegoMosaicDimensionsPlates = function() {
        const legoPlateWidthInput = document.getElementById('legoPlateWidth');
        const legoPlateHeightInput = document.getElementById('legoPlateHeight');

        if (
            legoPlateWidthInput.value &&
            legoPlateHeightInput.value &&
            !isNaN(legoPlateWidthInput.value) &&
            !isNaN(legoPlateHeightInput.value)
        ) {
            const imageWidth = parseFloat(legoPlateWidthInput.value);
            const imageHeight = parseFloat(legoPlateHeightInput.value);

            const minPlatesHorizontal = Math.floor(legoMosaicDimensionsImage.naturalWidth / imageWidth);
            const maxPlatesHorizontal = Math.ceil(legoMosaicDimensionsImage.naturalWidth / imageWidth);

            const minPlatesVertical = Math.floor(legoMosaicDimensionsImage.naturalHeight / imageHeight);
            const maxPlatesVertical = Math.ceil(legoMosaicDimensionsImage.naturalHeight / imageHeight);

            if (minPlatesHorizontal === maxPlatesHorizontal && minPlatesVertical === maxPlatesVertical) {
                const platesNeeded = minPlatesHorizontal * minPlatesVertical;
                legoMosaicDimensionsPlates.innerHTML = `${minPlatesHorizontal} x ${minPlatesVertical} (${platesNeeded} total)`;
            } else {
                const minPlatesNeeded = minPlatesHorizontal * minPlatesVertical;
                const maxPlatesNeeded = maxPlatesHorizontal * maxPlatesVertical;
                legoMosaicDimensionsPlates.innerHTML = `${minPlatesHorizontal} x ${minPlatesVertical} (${minPlatesNeeded} total) or ${maxPlatesHorizontal} x ${maxPlatesVertical} (${maxPlatesNeeded} total)`;
            }
        } else {
            legoMosaicDimensionsPlates.innerHTML = '<i>Indicate plate dimensions in Options.</i>';
        }
    }

    function updateLegoMosaicDimensions() {
        const imageDimensionsElement = document.getElementById('legoMosaicDimensionsDimensions');
        const imageSizeElement = document.getElementById('legoMosaicDimensionsSize');

        if (legoMosaicDimensionsImage.src) {
            if (legoMosaicDimensionsImage.complete) {
                imageDimensionsElement.innerText = getImageDimensions(legoMosaicDimensionsImage);
                imageSizeElement.innerText = legoMosaicDimensionsImage.naturalWidth + ' x ' + legoMosaicDimensionsImage.naturalHeight + ' pixels';
            } else {
                setTimeout(updateLegoMosaicDimensions, 100);
            }
        } else {
            imageDimensionsElement.innerText = '';
            imageSizeElement.innerText = '';
        }
    }
});
