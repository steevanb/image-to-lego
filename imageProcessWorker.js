onmessage = function (e) {
    const imageData = e.data.imageData;
    const selectedColors = e.data.selectedColors;
    const colorsType = e.data.colorsType;

    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const closestColor = findClosestColor(pixels[i], pixels[i + 1], pixels[i + 2], selectedColors, colorsType);
        pixels[i] = closestColor.red;
        pixels[i + 1] = closestColor.green;
        pixels[i + 2] = closestColor.blue;

        postMessage({ percentage: (i / pixels.length) * 100 });
    }

    postMessage({ processedImageData: imageData });
};

function findClosestColor(red, green, blue, selectedColors, colorsType) {
    let closestColor = {
        distance: Infinity,
        red: selectedColors.length > 0 ? hexToRgb(selectedColors[0])[0] : 0,
        green: selectedColors.length > 0 ? hexToRgb(selectedColors[0])[1] : 0,
        blue: selectedColors.length > 0 ? hexToRgb(selectedColors[0])[2] : 0,
    };

    for (const color of selectedColors) {
        let [targetRed, targetGreen, targetBlue] = hexToRgb(color);

        const distance = Math.sqrt(
            Math.pow(targetRed - red, 2) +
            Math.pow(targetGreen - green, 2) +
            Math.pow(targetBlue - blue, 2)
        );

        const condition = colorsType === 'lightest'
            ? (distance < closestColor.distance) && isLighter(targetRed, targetGreen, targetBlue, closestColor.red, closestColor.green, closestColor.blue)
            : (distance < closestColor.distance);

        if (condition) {
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

// Fonction utilitaire pour vérifier si une couleur est plus claire
function isLighter(r1, g1, b1, r2, g2, b2) {
    const luminance1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1;
    const luminance2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2;
    return luminance1 > luminance2;
}
