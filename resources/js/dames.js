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
        this._pieces -= this._pieces;
    }
}

class Game {

    constructor(player1, player2) {
        this._player1 = player1;
        this._player2 = player2;
        this._turn = player1;
        this._board = new Board();
    }

    get turn() {
        return this._turn;
    }

    get board() {
        return this._board;
    }


    fillBoard() {

        let numPieces = 0;
        let color = "white";

        for (let x = 0; x < this._board.length; x++) {
            for (let y = 0; y < this._board.length; y++) {

                if (x % 2 != 0 && x != 4 && x != 5) {
                    if (y % 2 == 0) {

                        this._board.addCell(new Cell(x, y, (new Piece(color))));
                        numPieces++;
                    }
                } else {
                    if (y % 2 != 0) {
                        this._board.addCell(new Cell(x, y, (new Piece(color))));
                        numPieces++;
                    }
                }

                if (numPieces == 12) {
                    color = "black";
                }
            }
        }

    }

    showPossibleMoves(x, y) {
        return;
    }

    changeTurn() {
        if (this._turn == this._player1) {
            this._turn = this._player2;
        } else {
            this._turn = thies._player1;
        }
    }

}

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

class Cell {

    constructor(x, y, piece = null) {
        this._positionX = x;
        this._positionY = y;
        this._piece = piece;
        this._highlited = null;
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

    get highlited() {
        return this._highlited;
    }

    set piece(piece = null) {
        this._piece = piece;
    }

    set positionX(x) {
        this._positionX = x;
    }

    set positionY(y) {
        this._positionY = y;
    }

    set highlited(color) {
        this._highlited = color;
    }

}

class Board {

    constructor() {
        this._cells = new Array;
        this._boardLength = 8;
    }

    get cells() {
        return this._cells;
    }

    get length() {
        return this._boardLength;
    }

    addCell(cell) {
        this._cells.push(cell);
    }

    printBoard(){

        let boardHTML = ""

        for (let row=1; row<= this._boardLength; row++){
            
            boardHTML += `<div class="line">`;
            
            // fill board with cells
            for (let col=1; col <= this._boardLength; col++){
                
                
                if ( row % 2 != 0){ // odd rows

                    if ( col % 2 != 0){ //odd cells
                        boardHTML += `<div class="cell bg-light" id="${row}-${col}"></div>`;
                    } else { //even cells
                        if (row != 4 && row !=5 ){
                            boardHTML += `<div class="cell bg-dark" id="${row}-${col}"><p class="text-primary">ficha</p></div>`;
                        } else {
                            boardHTML += `<div class="cell bg-dark" id="${row}-${col}"></div>`;
                        }
                    }

                } else { // even rows

                    if ( col % 2 != 0){ // odd cells
                        if (row != 4 && row != 5){
                            boardHTML += `<div class="cell bg-dark" id="${row}-${col}"><p class="text-primary">ficha</p></div>`;
                        } else {
                            boardHTML += `<div class="cell bg-dark" id="${row}-${col}"></div>`;
                        }
                    } else {//even cells
                        boardHTML += `<div class="cell bg-light" id="${row}-${col}"></div>`;
                    }

                }

            }
            
            boardHTML += `</div>`;

        }
        console.log(boardHTML);

        $(".board").html(boardHTML) 
    }

    

}
