document.addEventListener('DOMContentLoaded', function () {
    const legoMosaicDimensionsImage = document.getElementById('legoMosaicDimensionsImage');
    const legoMosaicDimensionsPlates = document.getElementById('legoMosaicDimensionsPlates');

    document.getElementById('legoMosaicDimensionsUploadedImage').addEventListener('change', function (event) {
        setOriginalImage();
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
            if (legoMosaicDimensionsImage.complete) {
                const imageWidth = parseFloat(legoPlateWidthInput.value);
                const imageHeight = parseFloat(legoPlateHeightInput.value);

                const minPlatesHorizontal = Math.floor(legoMosaicDimensionsImage.naturalWidth / imageWidth);
                const maxPlatesHorizontal = Math.ceil(legoMosaicDimensionsImage.naturalWidth / imageWidth);

                const minPlatesVertical = Math.floor(legoMosaicDimensionsImage.naturalHeight / imageHeight);
                const maxPlatesVertical = Math.ceil(legoMosaicDimensionsImage.naturalHeight / imageHeight);

                if (minPlatesHorizontal === maxPlatesHorizontal && minPlatesVertical === maxPlatesVertical) {
                    const platesNeeded = (minPlatesHorizontal * minPlatesVertical).toLocaleString('en-EN');
                    legoMosaicDimensionsPlates.innerHTML = `${minPlatesHorizontal} x ${minPlatesVertical} - ${platesNeeded} total`;
                } else {
                    const minPlatesNeeded = (minPlatesHorizontal * minPlatesVertical).toLocaleString('en-EN');
                    const maxPlatesNeeded = (maxPlatesHorizontal * maxPlatesVertical).toLocaleString('en-EN');

                    const minResizeImageWidth = (minPlatesHorizontal * legoPlateWidthInput.value).toLocaleString('en-EN');
                    const minResizeImageHeight = (minPlatesVertical * legoPlateHeightInput.value).toLocaleString('en-EN');

                    const maxResizeImageWidth = (maxPlatesHorizontal * legoPlateWidthInput.value).toLocaleString('en-EN');
                    const maxResizeImageHeight = (maxPlatesVertical * legoPlateHeightInput.value).toLocaleString('en-EN');

                    let innerHTML = `${minPlatesHorizontal} x ${minPlatesVertical} - ${minPlatesNeeded} total - Resize image: ${minResizeImageWidth} x ${minResizeImageHeight}`;
                    innerHTML += '<br />';
                    innerHTML += `${maxPlatesHorizontal} x ${maxPlatesVertical} - ${maxPlatesNeeded} total - Resize image: ${maxResizeImageWidth} x ${maxResizeImageHeight}`;

                    legoMosaicDimensionsPlates.innerHTML = innerHTML;
                }
            } else {
                setTimeout(updateLegoMosaicDimensionsPlates, 100);
            }
        } else {
            legoMosaicDimensionsPlates.innerHTML = '<i>Indicate plate dimensions.</i>';
        }
    }
});
