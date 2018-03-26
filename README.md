## Retro canvas flame

This repo contains some fiddling around with canvas, recreating an old school video game flame animation.

## Installation

```bash
git clone https://github.com/jcampuza/canvas-retro-flame.git
yarn install
yarn start
```

You may need to install parcel-bundler globally

```bash
yarn add global parcel-bundler
```

## Explanation

The math behind the calculations required can be summarized as follows

- Create an empty nxm matrix with values representing the Red value of each pixel on the canvas and default the values to 0
- Set the all columns in the bottom row to a random value from 0-255
- In every subsequent row, represented as an {i, j} pair, get the values from the following coordinates in the preceding row, {i - 1, j - 1}, {i, j-1}, {i + 1,j - 1}. Add the values in those entries together and divide by a number slightly greater than 3 (in order to simulate darkening as the flame rises/falls), and set the value of this {i, j} pair to that calculation.

The rest involve a simple requestAnimationFrame loop and some simple canvas operations to draw each pixel with the color of its coordinate onto the canvas.