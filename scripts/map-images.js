/* eslint-disable */
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '..', 'public', 'images', 'gallery');
const publicDir = path.join(__dirname, '..', 'public', 'images');

const targets = [
    'services/vehicle-branding.jpg',
    'services/building-signage.jpg',
    'services/shopfronts.jpg',
    'services/wayfinding.jpg',
    'services/billboards.jpg',
    'services/large-format.jpg',
    'services/screen-printing.jpg',
    'services/set-building.jpg',
    'products/estate-board-small.jpg',
    'products/estate-board-medium.jpg',
    'products/estate-board-large.jpg'
];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

if (!fs.existsSync(galleryDir)) {
    console.error('Gallery directory not found!');
    process.exit(1);
}

const files = fs.readdirSync(galleryDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (files.length === 0) {
    console.error('No images in gallery!');
    process.exit(1);
}

const shuffledFiles = shuffle([...files]);

targets.forEach((target, index) => {
    // Cycle through images if we run out
    const sourceFile = shuffledFiles[index % shuffledFiles.length];
    const sourcePath = path.join(galleryDir, sourceFile);
    const destPath = path.join(publicDir, target);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, destPath);
    console.log(`Mapped ${sourceFile} -> ${target}`);
});

console.log('Mapping complete.');
