class Board {

    constructor() {
        this._cells = new Array;
        this._boardLength = 8;
        this._highlightedCells = new Array;
    }

    get cells() {
        return this._cells;
    }

    get length() {
        return this._boardLength;
    }

    get highlightedCells() {
        return this._highlightedCells;
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

        // fill board with cells
        for (let row = 1; row <= this._boardLength; row++) {

            boardHTML += `<div class="line">`;

            for (let col = 1; col <= this._boardLength; col++) {


                if (row % 2 != 0) { // odd rows

                    if (col % 2 != 0) { //odd cells
                        boardHTML += `<div class="cell checker-violet"></div>`;
                    } else { //even cells
                        if (row != 4 && row != 5) {
                            boardHTML += `<div class="cell checker-blue p-1" id="${row}-${col}"><img class="img-fluid" src="${pieceIMG}"></div>`;
                            numPieces++;
                        } else {
                            boardHTML += `<div class="cell checker-blue p-1" id="${row}-${col}"></div>`;
                        }
                    }

                } else { // even rows

                    if (col % 2 != 0) { // odd cells
                        if (row != 4 && row != 5) {
                            boardHTML += `<div class="cell checker-blue p-1" id="${row}-${col}"><img class="img-fluid" src="${pieceIMG}"></div>`;
                            numPieces++;
                        } else {
                            boardHTML += `<div class="cell checker-blue p-1" id="${row}-${col}"></div>`;
                        }
                    } else {//even cells
                        boardHTML += `<div class="cell checker-violet"></div>`;
                    }

                }

                // changes piece color
                if (numPieces == 12) {
                    pieceIMG = "./resources/images/piece_black.png";
                }
            }

            boardHTML += `</div>`;

        }

        $("#board").html(boardHTML);

    }

    // highlightes cell with given color
    highlightCell(row, col, color) {

        $(`#${row}-${col}`).addClass(`glow-${color}`); // highlight cell 

        let highlightedCell = { id: `#${row}-${col}`, color: `glow-${color}`}; 
        this._highlightedCells.push(highlightedCell); // add highlighted cell to highlited cells array

    }

    // clears all highlited cells
    clearHighlitedCells(){

        let cells = this.highlightedCells;

        // for every cell in highlighted cells array, remove highlight
        for (let cell in cells) {
            $(`${cells[cell].id}`).removeClass(`${cells[cell].color}`);
        }
        
        cells = [];
    }

    // moves piece image to given positiopn
    movePiece(row, col, toRow, toCol){

        let img = $(`#${row}-${col}`).html(); // get image

        $(`#${row}-${col}`).html(""); // clears old cell
        $(`#${toRow}-${toCol}`).html(img); // adds image to new cell

    }

    // removes piece image from given cell
    capturePiece(row, col){

        $(`#${row}-${col}`).html("");

    }

    // changes piece image to dame image
    setDame(row, col, color){

        let piece = $(`#${row}-${col}`);

        piece.empty(); // removes image

        piece.html(`<img class="img-fluid" src="./resources/images/crown.png"></img>`); // sets new image

    }
}