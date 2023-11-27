onmessage = function (e) {
    const imageData = e.data.imageData;
    const selectedColors = e.data.selectedColors;

    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const closestColor = findClosestColor(pixels[i], pixels[i + 1], pixels[i + 2], selectedColors);
        pixels[i] = closestColor.red;
        pixels[i + 1] = closestColor.green;
        pixels[i + 2] = closestColor.blue;

        postMessage({ percentage: (i / pixels.length) * 100 });
    }

    postMessage({ processedImageData: imageData });
};

function findClosestColor(red, green, blue, selectedColors) {
    let closestColor = { distance: Infinity };

    for (const color of selectedColors) {
        const [targetRed, targetGreen, targetBlue] = hexToRgb(color);

        const distance = Math.sqrt(
            Math.pow(targetRed - red, 2) +
            Math.pow(targetGreen - green, 2) +
            Math.pow(targetBlue - blue, 2)
        );

        if (distance < closestColor.distance) {
            closestColor = {
                distance: distance,
                red: targetRed,
                green: targetGreen,
                blue: targetBlue,
            };
        }
    }

    return closestColor;
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;
    return [red, green, blue];
}

function imageDataToDataURL(imageData) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/png');
}
