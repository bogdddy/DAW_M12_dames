class Piece {

    constructor(color) {
        this._color = color;
        this._dame = false;
        this._active = true;
    }

    get color() {
        return this._color;
    }

    get dame() {
        return this._dame;
    }

    get active() {
        return this._active;
    }

    setDame() {
        this._dame = true;
    }

    setActive() {
        this._active = false;
    }

}