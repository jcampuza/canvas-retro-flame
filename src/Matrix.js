// A simple 2D matrix class supporting get, set, and iterate methods

export class Matrix {
    constructor(rowLength, columnLength) {
        this.iLength = rowLength;
        this.jLength = columnLength;

        this.matrix = Array.from({ length: rowLength }, (v, i) => {
            return Array.from({ length: columnLength }, (v, i) => 0);
        });
    }

    /**
     * Get the value at a specified point in a matrix.
     * Defaults to null for non-existing values to prevent out of bounds errors
     * @param {Number} i - i'th coordinate
     * @param {Number} j - j'th coordinate
     */
    getValue(i, j) {
        const row = this.matrix[i];

        if (!row) {
            return null;
        }

        return row[j];
    }

    /**
     * Sets the value at the {i, j} coordinate
     * @param {Number} i - The i'th coordinate (row)
     * @param {Number} j - The j'th coordinate (column)
     * @param {Any} value - The value to set at that coordinate
     */
    setValue(i, j, value) {
        const row = this.matrix[i];

        if (!row) return;
        row[j] = value;
    }

    /**
     * Simple iterate helper to iterate over all points a matrix
     * @param {Function} callback - Callback to execute at every coordinate
     */
    iterate(callback) {
        for (let i = 0; i < this.iLength; i++) {
            for (let j = 0; j < this.jLength; j++) {
                callback(this.matrix[i][j], i, j);
            }
        }
    }
}