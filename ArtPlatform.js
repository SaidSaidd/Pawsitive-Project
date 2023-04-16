const animalCanvas = document.getElementById('animal-canvas');
const accessoryCanvas = document.getElementById('accessory-canvas');
const animalCtx = animalCanvas.getContext('2d');
const accessoryCtx = accessoryCanvas.getContext('2d');
const animalSelect = document.getElementById('animal-select');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const eraser = document.getElementById('eraser');

animalCanvas.width = 1200;
animalCanvas.height = 900;
accessoryCanvas.width = 1200;
accessoryCanvas.height = 900;

let animalImage = new Image();
let drawingColor = colorPicker.value;
let drawingSize = parseInt(brushSize.value);
let usingEraser = false;

animalSelect.addEventListener('change', () => {
    animalImage.src = animalSelect.value;
});

animalImage.onload = () => {
    animalCtx.drawImage(animalImage, 0, 0, animalCanvas.width, animalCanvas.height);
};

colorPicker.addEventListener('input', () => {
    drawingColor = colorPicker.value;
    usingEraser = false;
});

brushSize.addEventListener('input', () => {
    drawingSize = parseInt(brushSize.value);
});

eraser.addEventListener('click', () => {
    usingEraser = true;
});

accessoryCanvas.addEventListener('mousemove', (event) => {
    if (event.buttons !== 1) return;
    const rect = accessoryCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    accessoryCtx.beginPath();
    accessoryCtx.arc(x, y, drawingSize / 2, 0, Math.PI * 2);
    accessoryCtx.closePath();
    if (usingEraser) {
        accessoryCtx.globalCompositeOperation = 'destination-out';
        accessoryCtx.fillStyle = 'rgba(0,0,0,1)';
    } else {
        accessoryCtx.globalCompositeOperation = 'source-over';
        accessoryCtx.fillStyle = drawingColor;
    }

    accessoryCtx.fill();
});

const accessorySelect = document.getElementById('accessory-select');
let accessoryImage = new Image();
let selectedAccessory = '';
let accessoryAdded = false;

accessorySelect.addEventListener('change', () => {
    selectedAccessory = accessorySelect.value;
    if (selectedAccessory) {
        accessoryImage.src = selectedAccessory;
        accessoryAdded = false;
    }
});

accessoryCanvas.addEventListener('click', (event) => {
    if (!selectedAccessory || usingEraser || accessoryAdded) return;
    const rect = accessoryCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    accessoryCtx.drawImage(accessoryImage, x - accessoryImage.width / 2, y - accessoryImage.height / 2);
    accessoryAdded = true;
});