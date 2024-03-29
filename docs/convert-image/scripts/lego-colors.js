// https://www.bricklink.com/catalogColors.asp?itemType=P&itemNo=3024&v=2
const legoColors = {
    'FFFFFF': {name: 'White', textColor: 'black', blackAndWhite: true},
    'E8E8E8': {name: 'Very light gray', textColor: 'black', blackAndWhite: true},
    'E4E8E8': {name: 'Very light bluish gray', textColor: 'black', blackAndWhite: true},
    'AFB5C7': {name: 'Light bluish gray', textColor: 'black', blackAndWhite: true},
    '9C9C9C': {name: 'Light gray', textColor: 'white', blackAndWhite: true},
    '6B5A5A': {name: 'Dark gray', textColor: 'white', blackAndWhite: false},
    '595D60': {name: 'Dark bluish gray', textColor: 'white', blackAndWhite: true},
    '212121': {name: 'Black', textColor: 'white', blackAndWhite: true},
    '6A0E15': {name: 'Dark red', textColor: 'white', blackAndWhite: false},
    'B30006': {name: 'Red', textColor: 'white', blackAndWhite: false},
    'FF8172': {name: 'Coral', textColor: 'black', blackAndWhite: false},
    'C58D80': {name: 'Sand red', textColor: 'white', blackAndWhite: false},
    '50372F': {name: 'Dark brown', textColor: 'white', blackAndWhite: false},
    '6B3F22': {name: 'Brown', textColor: 'white', blackAndWhite: false},
    '99663E': {name: 'Light brown', textColor: 'white', blackAndWhite: false},
    '82422A': {name: 'Reddish brown', textColor: 'white', blackAndWhite: false},
    'B89869': {name: 'Dark tan', textColor: 'black', blackAndWhite: false},
    'EED9A4': {name: 'Tan', textColor: 'black', blackAndWhite: false},
    'FECCB0': {name: 'Light nougat', textColor: 'black', blackAndWhite: false},
    'FFAF7D': {name: 'Nougat', textColor: 'black', blackAndWhite: false},
    'E3A05B': {name: 'Medium nougat', textColor: 'black', blackAndWhite: false},
    'B35408': {name: 'Dark orange', textColor: 'white', blackAndWhite: false},
    'FF7E14': {name: 'Orange', textColor: 'black', blackAndWhite: false},
    'FFA531': {name: 'Medium orange', textColor: 'black', blackAndWhite: false},
    'FFC700': {name: 'Bright light orange', textColor: 'black', blackAndWhite: false},
    'FFBC36': {name: 'Light orange', textColor: 'black', blackAndWhite: false},
    'FFDCA4': {name: 'Very light orange', textColor: 'black', blackAndWhite: false},
    'FFE001': {name: 'Yellow', textColor: 'black', blackAndWhite: false},
    'FFF08C': {name: 'Bright light yellow', textColor: 'black', blackAndWhite: false},
    'ECEEBD': {name: 'Light lime', textColor: 'black', blackAndWhite: false},
    'E7F2A7': {name: 'Yellowish green', textColor: 'black', blackAndWhite: false},
    'DFE000': {name: 'Medium lime', textColor: 'black', blackAndWhite: false},
    'C4E000': {name: 'Lime', textColor: 'black', blackAndWhite: false},
    'ABA953': {name: 'Olive green', textColor: 'white', blackAndWhite: false},
    '2E5543': {name: 'Dark green', textColor: 'white', blackAndWhite: false},
    '00923D': {name: 'Green', textColor: 'white', blackAndWhite: false},
    '10CB31': {name: 'Bright green', textColor: 'white', blackAndWhite: false},
    '91DF8C': {name: 'Medium green', textColor: 'black', blackAndWhite: false},
    'D7EED1': {name: 'Light green', textColor: 'black', blackAndWhite: false},
    'A2BFA3': {name: 'Sand green', textColor: 'black', blackAndWhite: false},
    '00A29F': {name: 'Dark turquoise', textColor: 'white', blackAndWhite: false},
    'CFEFEA': {name: 'Light aqua', textColor: 'black', blackAndWhite: false},
    '243757': {name: 'Dark blue', textColor: 'white', blackAndWhite: false},
    '0057A6': {name: 'Blue', textColor: 'white', blackAndWhite: false},
    '009FE0': {name: 'Dark azure', textColor: 'white', blackAndWhite: false},
    '7DC1D8': {name: 'Maersk blue', textColor: 'black', blackAndWhite: false},
    '6ACEE0': {name: 'Medium azure', textColor: 'black', blackAndWhite: false},
    '82ADD8': {name: 'Medium blue', textColor: 'white', blackAndWhite: false},
    'BCD1ED': {name: 'Bright light blue', textColor: 'black', blackAndWhite: false},
    '8899AB': {name: 'Sand Blue', textColor: 'white', blackAndWhite: false},
    '5F2683': {name: 'Dark purple', textColor: 'white', blackAndWhite: false},
    '7A238D': {name: 'Purple', textColor: 'white', blackAndWhite: false},
    'C689D9': {name: 'Medium lavender', textColor: 'black', blackAndWhite: false},
    'D3BDE3': {name: 'Lavender', textColor: 'black', blackAndWhite: false},
    'B72276': {name: 'Magenta', textColor: 'white', blackAndWhite: false},
    'EF5BB3': {name: 'Dark pink', textColor: 'black', blackAndWhite: false},
    'F7BCDA': {name: 'Bright pink', textColor: 'black', blackAndWhite: false},
    'F5CDD6': {name: 'Pink', textColor: 'black', blackAndWhite: false},
    'F1F2E1': {name: 'Chrome gold', textColor: 'black', blackAndWhite: false},
    'ACB7C0': {name: 'Pearl light gray', textColor: 'black', blackAndWhite: true},
    '8D949C': {name: 'Flat silver', textColor: 'white', blackAndWhite: false},
    'E79E1D': {name: 'Pearl gold', textColor: 'black', blackAndWhite: false},
    'C0C0C0': {name: 'Metallic silver', textColor: 'black', blackAndWhite: false},
};

document.getElementById('checkAll').addEventListener('click', function () {
    checkAllCheckboxes();
});

document.getElementById('uncheckAll').addEventListener('click', function () {
    const checkboxes = legoColorsCheckboxes.getElementsByTagName('input');
    for (const checkbox of checkboxes) {
        checkbox.checked = false;
    }
});

function updateCheckboxes(usedColors, imageData) {
    const checkboxes = legoColorsCheckboxes.getElementsByTagName('input');

    for (const checkbox of checkboxes) {
        checkbox.checked = usedColors.includes(checkbox.value);
        checkbox.dataset.pixelCount = countPixels(imageData, hexToRgb(checkbox.value));
    }
}

window.checkAllCheckboxes = function () {
    const checkboxes = legoColorsCheckboxes.getElementsByTagName('input');
    for (const checkbox of checkboxes) {
        checkbox.checked = checkbox.parentElement.parentElement.classList.contains('d-none') === false;
    }
}

function createColorCheckboxes() {
    const checkboxContainer = document.getElementById('legoColorsCheckboxes');
    for (const color in legoColors) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = color;
        checkbox.id = color;
        checkbox.checked = true;
        checkbox.style.marginLeft = '5px';
        checkbox.style.marginRight = '3px';

        const pixelCountSpan = document.createElement('span');
        pixelCountSpan.className = 'pixel-count';

        const label = document.createElement('label');
        label.htmlFor = color;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(legoColors[color].name));
        label.appendChild(pixelCountSpan);
        label.style.backgroundColor = '#' + color;
        label.style.width = '100%';
        label.style.color = legoColors[color].textColor;

        const cell = document.createElement('div');
        cell.className = 'col-xl-3 col-lg-4 col-sm-6 col-12 mb-1';
        cell.appendChild(label);

        checkboxContainer.appendChild(cell);
    }
}

document.getElementById('toggleSelectLegoColors').addEventListener('click', function() {
    if (areSelectLegoColorsHidden()) {
        showSelectLegoColors();
    } else {
        hideSelectLegoColors();
    }
});

function hideSelectLegoColors() {
    document.querySelectorAll('.select-lego-colors').forEach(function(el) {
        el.classList.add('d-none');
    });

    localStorage.setItem('selectLegoColorsVisibility', 'hidden');
    document.getElementById('toggleSelectLegoColors').innerText = 'Show';
}

function showSelectLegoColors() {
    document.querySelectorAll('.select-lego-colors').forEach(function(el) {
        el.classList.remove('d-none');
    });

    localStorage.setItem('selectLegoColorsVisibility', 'visible');
    document.getElementById('toggleSelectLegoColors').innerText = 'Hide';
}

function areSelectLegoColorsHidden() {
    const selectLegoColors = document.querySelector('.select-lego-colors');
    return selectLegoColors.classList.contains('d-none');
}

document.addEventListener('DOMContentLoaded', function() {
    const selectLegoColorsVisibility = localStorage.getItem('selectLegoColorsVisibility');
    if (selectLegoColorsVisibility === 'hidden') {
        hideSelectLegoColors();
    } else {
        showSelectLegoColors();
    }

    createColorCheckboxes();
});
