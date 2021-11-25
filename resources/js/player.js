class Player {

    constructor(player, color) {
        this._name = player;
        this._color = color;
        this._pieces = 12;
    }

    get name() {
        return this._name;
    }

    get color() {
        return this._color;
    }

    get pieces() {
        return this._pieces;
    }
    
    substractPiece() {
        this._pieces -= 1;
    }
}