function getImageDimensions(processedImage) {
    let processedImageWidth = processedImage.naturalWidth * 0.8;
    let processedImageWidthUnit = 'cm';
    if (processedImageWidth > 100) {
        processedImageWidth = processedImageWidth / 100;
        processedImageWidthUnit = 'm';
    }

    let processedImageHeight = processedImage.naturalHeight * 0.8;
    let processedImageHeightUnit = 'm';
    if (processedImageHeight > 100) {
        processedImageHeight = processedImageHeight / 100;
        processedImageHeightUnit = 'm';
    }

    return `${processedImageWidth.toFixed(2).toLocaleString('en-EN')}${processedImageWidthUnit} x ${processedImageHeight.toFixed(2).toLocaleString('en-EN')}${processedImageHeightUnit}`;
}
