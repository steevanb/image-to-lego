document.addEventListener('DOMContentLoaded', function() {
    const exampleImagesVisibility = localStorage.getItem('exampleImagesVisibility');
    if (exampleImagesVisibility === 'hidden') {
        hideExampleImages();
    } else {
        showExampleImages();
    }
});

document.getElementById('toggleExampleImages').addEventListener('click', function() {
    if (areExampleImagesHidden()) {
        showExampleImages();
    } else {
        hideExampleImages();
    }
});

function hideExampleImages() {
    document.querySelectorAll('.example-images').forEach(function(el) {
        el.classList.add('d-none');
    });

    localStorage.setItem('exampleImagesVisibility', 'hidden');
    document.getElementById('toggleExampleImages').innerText = 'Show';
}

function showExampleImages() {
    document.querySelectorAll('.example-images').forEach(function(el) {
        el.classList.remove('d-none');
    });

    localStorage.setItem('exampleImagesVisibility', 'visible');
    document.getElementById('toggleExampleImages').innerText = 'Hide';
}

function areExampleImagesHidden() {
    const exampleImage = document.querySelector('.example-images');
    return exampleImage.classList.contains('d-none');
}
