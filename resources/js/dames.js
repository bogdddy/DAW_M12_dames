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
        this._selectedPieceX = -1;
        this._selectedPieceY = -1;
    }

    get turn() {
        return this._turn;
    }

    get board() {
        return this._board;
    }

    get selectedPieceX() {
        return this._selectedPieceX;
    }

    get selectedPieceY() {
        return this._selectedPieceY;
    }

    set selectedPieceX(x) {
        this._selectedPieceX = x;
    }

    set selectedPieceY(y) {
        this._selectedPieceY = y;
    }


    // fills board with Cell() and Piece()
    fillBoard() {

        let numPieces = 0;
        let color = "white";

        for (let row = 1; row <= this.board.length; row++) {
            for (let col = 1; col <= this.board.length; col++) {


                if (row % 2 != 0) {// odd rows

                    if (col % 2 == 0) {
                        if (row != 5) {
                            this.board.addCell(new Cell(row, col, (new Piece(color))));
                            numPieces++;
                        } else {
                            this.board.addCell(new Cell(row, col));
                        }
                    }

                } else if (row % 2 == 0) {// even rows

                    if (col % 2 != 0) {
                        if (row != 4) {
                            this.board.addCell(new Cell(row, col, (new Piece(color))));
                            numPieces++;
                        } else {
                            this.board.addCell(new Cell(row, col));
                        }
                    }

                }

                if (numPieces == 12) {
                    color = "black";
                }
            }
        }

    }

    addEventsToBoard() {

        for (let row = 1; row <= this.board.length; row++) {
            for (let col = 1; col <= this.board.length; col++) {

                $(`#${row}-${col}`).on("click", () => {

                    if (this._turn.color == this.getPieceColor(row, col)) {
                        this.board.deselectPiece(this.selectedPieceX, this.selectedPieceY);
                        this.board.selectPiece(row, col);
                        this.selectPiece(row, col)
                        this.showPossibleMoves(row, col)
                    } else {
                        console.log("select correct piece");
                    }

                });

            }
        }

    }

    selectPiece(row, col) {
        this.selectedPieceX = row;
        this.selectedPieceY = col;
    }

    //retrieves cell
    getCell(row, col) {

        let cells = this._board.cells;

        // serach cell that contains the piece
        let result = cells.find(cell => cell.positionX == row && cell.positionY == col);

        return result;
    }

    // retrieves the piece color from given cell 
    getPieceColor(row, col) {

        let result = this.getCell(row, col);

        // return color
        if (result.piece != null) {
            return result.piece.color;
        } else {
            return null;
        }
    }

    showPossibleMoves(row, col) {

        let color = this._turn.color
        let possibleMove = false;

        this.board.clearHighlitedCells();

        if (color == "white") {

            if (row + 1 <= 8) {

                if (col - 1 >= 1) {
                    if (this.getCell(row + 1, col - 1).piece == null) {
                        this.board.higlightCell(row + 1, col - 1, "green");
                        possibleMove = true;
                    }
                }
                if (col - 2 >= 1) {
                    if (this.getCell(row + 1, col - 1).piece != null && this.getCell(row + 1, col - 1).piece.color != color) {
                        if (this.getCell(row + 2, col - 2).piece == null) {
                            this.board.higlightCell(row + 2, col - 2, "green");
                            possibleMove = true;
                        }
                    }
                }

                // if (col + 1 <= 8) {
                //     if (this.getCell(row + 1, col + 1).piece == null) {
                //         this.board.higlightCell(row + 1, col + 1, "green");
                //         possibleMove = true;
                //     }
                // }
                if (col + 1 <= 8) {
                    if (this.getCell(row + 1, col + 1).piece == null) {
                        this.board.higlightCell(row + 1, col + 1, "green");
                        possibleMove = true;
                    }
                }

                if (col + 2 <= 8) {
                    if (this.getCell(row + 1, col + 1).piece != null && this.getCell(row + 1, col + 1).piece.color != color) {
                        if (this.getCell(row + 2, col + 2).piece == null) {
                            this.board.higlightCell(row + 2, col + 2, "green");
                            possibleMove = true;
                        }
                    }
                }

            }

            if (!possibleMove){
                this.board.higlightCell(row, col, "red");
            }


        }


    }

    changeTurn() {

        if (this._turn == this._player1) {
            this._turn = this._player2;
        } else {
            this._turn = this._player1;
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
        this._possibleMoves = new Array;
    }

    get cells() {
        return this._cells;
    }

    get length() {
        return this._boardLength;
    }

    get possibleMoves() {
        return this._possibleMoves;
    }

    // pushes a Cell() into _cells array
    addCell(cell) {
        this._cells.push(cell);
    }

    // print board HTML
    printBoard() {

        let boardHTML = "";
        let pieceIMG = "./resources/images/piece_white.png";
        let numPieces = 0;

        for (let row = 1; row <= this._boardLength; row++) {

            boardHTML += `<div class="line">`;


            // fill board with cells
            for (let col = 1; col <= this._boardLength; col++) {


                if (row % 2 != 0) { // odd rows

                    if (col % 2 != 0) { //odd cells
                        boardHTML += `<div class="cell bg-light"></div>`;
                    } else { //even cells
                        if (row != 4 && row != 5) {
                            boardHTML += `<div class="cell bg-dark p-1" id="${row}-${col}"><p class="text-primary"><img class="img-fluid" src="${pieceIMG}"></p></div>`;
                            numPieces++;
                        } else {
                            boardHTML += `<div class="cell bg-dark p-1" id="${row}-${col}"></div>`;
                        }
                    }

                } else { // even rows

                    if (col % 2 != 0) { // odd cells
                        if (row != 4 && row != 5) {
                            boardHTML += `<div class="cell bg-dark p-1" id="${row}-${col}"><p class="text-primary"><img class="img-fluid" src="${pieceIMG}"></p></div>`;
                            numPieces++;
                        } else {
                            boardHTML += `<div class="cell bg-dark p-1" id="${row}-${col}"></div>`;
                        }
                    } else {//even cells
                        boardHTML += `<div class="cell bg-light"></div>`;
                    }

                }

                if (numPieces == 12) {
                    pieceIMG = "./resources/images/piece_black.png";
                }
            }

            boardHTML += `</div>`;

        }

        $(".board").html(boardHTML);
    }

    // Higlights given piece
    selectPiece(row, col) {
        $(`#${row}-${col}`).addClass("glow-blue");
    }

    // Removes higlight from given piece
    deselectPiece(row, col) {
        if (row != -1 && col != -1) {
            $(`#${row}-${col}`).removeClass("glow-blue");
        }
    }

    higlightCell(row, col, color) {
        $(`#${row}-${col}`).addClass(`glow-${color}`);

        let higlightedCell = { id: `#${row}-${col}`, color: `glow-${color}`};
        this._possibleMoves.push(higlightedCell);
        console.log(this._possibleMoves)
    }

    clearHighlitedCells(row, color){

        let cells = this.possibleMoves;
        for (let cell in cells) {
            $(`${cells[cell].id}`).removeClass(`${cells[cell].color}`);
        }
        
        cells = [];
    }

}
