function setOriginalImage(imgElement = null) {
    const originalImage = document.getElementById('originalImage');
    const imageUpload = document.getElementById('imageUpload');

    if (imgElement === null) {
        if (imageUpload.files.length > 0) {
            const reader = new FileReader();

            reader.onload = function (e) {
                originalImage.src = e.target.result;

                checkAllCheckboxes();
                showImageDisplaySection();
                hideProcessedImageSection();
            };

            reader.readAsDataURL(imageUpload.files[0]);
        }
    } else {
        originalImage.src = imgElement.src;
        imageUpload.value = '';

        checkAllCheckboxes();
        showImageDisplaySection();
        hideProcessedImageSection();
    }
}

document.querySelectorAll('.img-example').forEach(function(image) {
    image.addEventListener('click', function(el) {
        setOriginalImage(image);
    });
});
