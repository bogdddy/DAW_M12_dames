class Cell {

    constructor(x, y, piece = null) {
        this._positionX = x; // postion X stands for ROW
        this._positionY = y; // position Y stands for COL
        this._piece = piece;
    }

    get piece() {
        return this._piece;
    }

    get positionX() {
        return this._positionX;
    }

    get positionY() {
        return this._positionY;
    }

    set piece(piece = null) {
        this._piece = piece;
    }

}