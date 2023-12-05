// Récupérez l'élément d'entrée de fichier
const imageUpload = document.getElementById('imageUpload');

// Attachez un événement au changement de l'entrée de fichier pour cocher toutes les cases
imageUpload.addEventListener('change', function() {
    setOriginalImage();
});

document.getElementById('originalImage').addEventListener('load', function() {
    updateImageDimensions();
    updateImageSize();
});

function processImage() {
    if (document.getElementById('originalImage').src.length > 0) {
        if (document.querySelector('input[name="colorsType"]:checked').value === 'lightest') {
            checkAllCheckboxes();
        }

        // Afficher le spinner et masquer le texte du bouton
        document.getElementById('processingSpinner').style.display = 'inline-block';
        document.getElementById('processImageText').style.display = 'none';
        hideProcessedImageSection();

        // Afficher le pourcentage de complétion et masquer le texte du bouton
        const completionPercentage = document.getElementById('completionPercentage');
        completionPercentage.style.display = 'inline-block';
        completionPercentage.innerText = '0%';

        const imageUpload = document.getElementById('imageUpload');
        const processedImage = document.getElementById('processedImage');

        // Get selected Lego colors
        const selectedColors = Array.from(legoColorsCheckboxes.getElementsByTagName('input'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const reader = new FileReader();

        // Read the selected image
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                // Process the image and display the processed image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);

                // Créez un worker
                const worker = new Worker('imageProcessWorker.js');

                // Envoyez les données nécessaires au worker
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const selectedColors = Array.from(legoColorsCheckboxes.getElementsByTagName('input'))
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => checkbox.value);

                worker.postMessage({
                    imageData: imageData,
                    selectedColors: selectedColors,
                    colorsType: document.querySelector('input[name="colorsType"]:checked').value
                });

                worker.onmessage = function(e) {
                    if (e.data.percentage !== undefined) {
                        // Mettez à jour le pourcentage de complétion
                        completionPercentage.innerText = e.data.percentage.toFixed(0) + '%';
                    } else {
                        // Use the processed image data directly
                        const processedImageData = e.data.processedImageData;
                        ctx.putImageData(processedImageData, 0, 0);
                        processedImage.src = canvas.toDataURL('image/png');

                        showProcessedImageSection();

                        // Store the used colors in an array
                        const usedColors = [];

                        const pixels = processedImageData.data;

                        for (let i = 0; i < pixels.length; i += 4) {
                            const usedColor = rgbToHex(pixels[i], pixels[i + 1], pixels[i + 2]);
                            if (!usedColors.includes(usedColor)) {
                                usedColors.push(usedColor);
                            }
                        }

                        updateCheckboxes(usedColors, processedImageData);

                        // Afficher le nombre de pixels de la couleur du background dans le label
                        const checkboxes = legoColorsCheckboxes.getElementsByTagName('input');
                        for (const checkbox of checkboxes) {
                            const color = checkbox.value;
                            const label = checkbox.parentElement; // Récupérer l'élément parent, c'est-à-dire le label

                            if (usedColors.includes(color)) {
                                const pixelCount = countPixels(processedImageData, hexToRgb(color)).toLocaleString('en-EN');
                                label.lastElementChild.innerText = ` (${pixelCount})`;
                            } else {
                                label.lastElementChild.innerText = '';
                            }
                        }

                        updateProcessedImageDimensions();
                        updateProcessedImageLegosCount();

                        // Cacher le spinner et afficher le texte du bouton après le traitement de l'image
                        document.getElementById('processingSpinner').style.display = 'none';
                        document.getElementById('processImageText').style.display = 'inline-block';
                        completionPercentage.style.display = 'none';
                    }
                }
            };
        };

        const img = document.getElementById('originalImage');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageDataURL = canvas.toDataURL('image/png');
        reader.readAsDataURL(dataURItoBlob(imageDataURL));
    } else {
        alert('Please select an image.');
    }
}

function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;
    return [red, green, blue];
}

function rgbToHex(red, green, blue) {
    // Convertir les valeurs RGB en hexadécimal
    const hex = (red << 16 | green << 8 | blue).toString(16);
    // Remplir de zéros à gauche si nécessaire
    const paddedHex = '000000'.slice(0, 6 - hex.length) + hex;
    // Convertir en majuscules et retourner la chaîne hexadécimale
    return paddedHex.toUpperCase();
}

// Ajouter une fonction pour compter le nombre de pixels d'une couleur spécifique dans l'image
function countPixels(imageData, targetColor) {
    const pixels = imageData.data;
    let count = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        const pixelColor = [pixels[i], pixels[i + 1], pixels[i + 2]];

        if (pixelColor.every((value, index) => value === targetColor[index])) {
            count++;
        }
    }

    return count;
}

// Ajoutez cette fonction pour calculer les dimensions de l'image
function updateImageDimensions() {
    const originalImage = document.getElementById('originalImage');
    const imageDimensionsElement = document.getElementById('imageDimensions');

    if (originalImage.src.length > 0) {
        imageDimensionsElement.innerText = `Dimensions: ${originalImage.naturalWidth} x ${originalImage.naturalHeight} pixels`;
    } else {
        imageDimensionsElement.innerText = '';
    }
}

function updateImageSize() {
    const originalImage = document.getElementById('originalImage');
    const imageSizeElement = document.getElementById('imageSize');

    if (originalImage.src.length > 0) {
        fetch(originalImage.src)
            .then(response => response.blob())
            .then(blob => {
                let fileSizeInKB = blob.size / 1024;
                let fileSize;

                if (fileSizeInKB < 1024) {
                    fileSize = fileSizeInKB.toFixed(2) + ' KB';
                } else {
                    fileSize = (fileSizeInKB / 1024).toFixed(2) + ' MB';
                }

                imageSizeElement.innerText = 'Size: ' + fileSize;
            });
    } else {
        imageSizeElement.innerText = '';
    }
}

function updateProcessedImageDimensions() {
    const processedImage = document.getElementById('processedImage');
    const processedImageDimensionsElement = document.getElementById('processsedImageDimensions');

    if (processedImage.src) {
        if (processedImage.complete) {
            processedImageDimensionsElement.innerText = 'Dimensions: ' + getImageDimensions(processedImage);
        } else {
            setTimeout(function () {
                updateProcessedImageDimensions();
            }, 100);
        }
    } else {
        // Réinitialisez le texte si aucune image n'a été générée
        processedImageDimensionsElement.innerText = '';
    }
}

function updateProcessedImageLegosCount() {
    const processedImage = document.getElementById('processedImage');
    const processedImageLegosCountElement = document.getElementById('processsedImageLegosCount');

    if (processedImage.src) {
        if (processedImage.complete) {
            // Obtenez les dimensions de l'image traitée
            const width = processedImage.naturalWidth;
            const height = processedImage.naturalHeight;

            // Calculez le nombre total de pixels dans l'image
            const totalPixels = (width * height).toLocaleString('en-EN');

            // Mettez à jour le nombre total de pixels dans le texte
            const legosCountText = `Legos 1x1: ${totalPixels}`;
            processedImageLegosCountElement.innerText = legosCountText;
        } else {
            setTimeout(function () {
                updateProcessedImageLegosCount();
            }, 100);
        }
    } else {
        // Réinitialisez le texte si aucune image n'a été générée
        processedImageLegosCountElement.innerText = '';
    }
}

function generateCSV() {
    const checkboxes = legoColorsCheckboxes.getElementsByTagName('input');
    const selectedColors = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => ({
            color: checkbox.value,
            name: legoColors[checkbox.value].name,
            pixelCount: checkbox.dataset.pixelCount || 0, // Récupérez le nombre de pixels du dataset
        }));

    // Créez le contenu CSV
    let csvContent = 'Color name,Color code,Legos 1x1\n';
    selectedColors.forEach(color => {
        csvContent += `${color.name},${color.color},${color.pixelCount}\n`;
    });

    return csvContent;
}

function generateZip() {
    // Créez une instance JSZip
    const zip = new JSZip();

    zip.file('legos_1x1.csv', generateCSV());

    // Ajoutez l'image générée au zip
    const processedImage = document.getElementById('processedImage');
    const imageDataURL = processedImage.src;
    const imageData = imageDataURL.split(',')[1]; // Ignore the data:image/png;base64, part
    zip.file('image.png', imageData, { base64: true });

    // Générez le contenu du zip
    zip.generateAsync({ type: 'blob' }).then(function (blob) {
        // Créez un lien pour télécharger le fichier zip
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ImageToLego.zip';
        link.click();
    });
}

function hideProcessedImageSection() {
    document.getElementById('processedImageSection').classList.add('d-none');
}

function showProcessedImageSection() {
    document.getElementById('processedImageSection').classList.remove('d-none');
}

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

function showImageDisplaySection() {
    document.getElementById('imageDisplaySection').classList.remove('d-none');
}
