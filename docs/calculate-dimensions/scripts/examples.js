function setOriginalImage(imgElement = null) {
    const legoMosaicDimensionsImage = document.getElementById('legoMosaicDimensionsImage');
    const imageUpload = document.getElementById('legoMosaicDimensionsUploadedImage');

    if (imgElement === null) {
        if (imageUpload.files.length > 0) {
            const reader = new FileReader();

            reader.onload = function (e) {
                legoMosaicDimensionsImage.src = e.target.result;

                showImageDisplaySection();
                updateLegoMosaicDimensions();
                updateLegoMosaicDimensionsPlates();
            };

            reader.readAsDataURL(imageUpload.files[0]);
        }
    } else {
        legoMosaicDimensionsImage.src = imgElement.src;
        imageUpload.value = '';

        showImageDisplaySection();
        updateLegoMosaicDimensions();
        updateLegoMosaicDimensionsPlates();
    }
}

document.querySelectorAll('.img-example').forEach(function(image) {
    image.addEventListener('click', function(el) {
        setOriginalImage(image);
    });
});

function showImageDisplaySection() {
    document.getElementById('legoMosaicDimensionsContainer').classList.remove('d-none');
}

function updateLegoMosaicDimensions() {
    const imageDimensionsElement = document.getElementById('legoMosaicDimensionsDimensions');
    const imageSizeElement = document.getElementById('legoMosaicDimensionsSize');

    if (legoMosaicDimensionsImage.src) {
        if (legoMosaicDimensionsImage.complete) {
            imageDimensionsElement.innerText = getImageDimensions(legoMosaicDimensionsImage);
            imageSizeElement.innerText =
                legoMosaicDimensionsImage.naturalWidth.toLocaleString('en-EN')
                + ' x '
                + legoMosaicDimensionsImage.naturalHeight.toLocaleString('en-EN')
                + ' pixels';
        } else {
            setTimeout(updateLegoMosaicDimensions, 100);
        }
    } else {
        imageDimensionsElement.innerText = '';
        imageSizeElement.innerText = '';
    }
}
