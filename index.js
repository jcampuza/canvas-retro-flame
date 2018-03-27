import { Matrix } from './src/Matrix';
import { AnimationLoop } from './src/AnimationLoop';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const width = 10;
const height = 10;
const rowLength = Math.ceil(canvasWidth / width);
const columnLength = Math.ceil(canvasHeight / height);

const pixels = new Matrix(rowLength, columnLength);

function draw() {
    // Note that we draw from the bottom to flip the matrix
    pixels.iterate((value, i, j) => {
        value = value.toString(16).padStart(2, '0');
        const color = `#${value}0000`;
        context.fillStyle = color;
        context.fillRect(
            canvasWidth - i * width,
            canvasHeight - j * height,
            width,
            height
        );
    });
}

function update() {
    pixels.iterate((value, i, j) => {
        // Set bottom row to random values (top in this case)
        if (j === 0) {
            return pixels.setValue(i, j, Math.floor(Math.random() * 255));
        }

        const pixelTopLeft = pixels.getValue(i - 1, j - 1) || 0;
        const pixelTop = pixels.getValue(i, j - 1) || 0;
        const pixelTopRight = pixels.getValue(i + 1, j - 1) || 0;
        const newValue = Math.floor((pixelTop + pixelTopLeft + pixelTopRight) / 3.03);
        return pixels.setValue(i, j, newValue);
    });
}

const loop = new AnimationLoop(draw, update, 1000/24);

// For debug purposes so we can manually start/stop the loop
if (process.env.NODE_ENV === 'development') {
    window.loop = loop;
}

// Stop animation when visibility change so we don't end up updating
// a ton when the tab is refocused
document.addEventListener('visibilitychange', (e) => {
    if (document.hidden) {loop.stop();}
    else {loop.start();}
});

loop.start();