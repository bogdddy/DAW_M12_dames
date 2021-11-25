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

    /**
     * pushes a Cell() into _cells array
     * @param {*} cell -> object to add to array
     */
    addCell(cell) {
        this._cells.push(cell);
    }

    /**
     * Prints all checkers adn piece images to board HTML
     */
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
                        boardHTML += `<div class="cell checker-light_blue"></div>`;
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
                        boardHTML += `<div class="cell checker-light_blue"></div>`;
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

    /**
     * Fills layout wiht player info, such as names or piece color
     * @param {*} player1 -> player object
     * @param {*} player2 -> player object
     */
    fillLayout(player1, player2){

        // fill player 1
        $("#p1").html(player1.name);
        $("#p1-avatar").attr("id", `${player1.color}-avatar`);
        $("#p1-color").css("backgroundImage", `url(./resources/images/piece_${player1.color}.png)`);
        $("#p1-pieces").attr("id", `${player1.color}-pieces`);
        $(`#${player1.color}-pieces`).html(12);
        if (player1.color == "black"){
            $(`#${player1.color}-pieces`).addClass("text-light")
        }

        // fill player 2
        $("#p2").html(player2.name);
        $("#p2-avatar").attr("id", `${player2.color}-avatar`);
        $("#p2-color").css("backgroundImage", `url(./resources/images/piece_${player2.color}.png)`);
        $("#p2-pieces").attr("id", `${player2.color}-pieces`);
        $(`#${player2.color}-pieces`).html(12)
        if (player2.color == "black"){
            $(`#${player2.color}-pieces`).addClass("text-light")
        }

        // set avatar opacity
        if( player1.color == "white"){
            $(`#${player1.color}-avatar`).css("opacity", "1" );
            $(`#${player2.color}-avatar`).css("opacity", "0.5" );
        }else{
            $(`#${player2.color}-avatar`).css("opacity", "1" );
            $(`#${player1.color}-avatar`).css("opacity", "0.5" );
        }

    }

    /**
     * highlightes cell with given color
     * @param {*} row -> cell row
     * @param {*} col -> cell col
     * @param {*} color -> wanted color
     */
    highlightCell(row, col, color) {

        $(`#${row}-${col}`).addClass(`glow-${color}`); // highlight cell 

        let highlightedCell = { id: `#${row}-${col}`, color: `glow-${color}`}; 
        this._highlightedCells.push(highlightedCell); // add highlighted cell to highlited cells array

    }

    /**
     * clears all highlited cells
     */
    clearHighlitedCells(){

        let cells = this.highlightedCells;

        for (let cell in cells) {
            $(`${cells[cell].id}`).removeClass(`${cells[cell].color}`);
        }
        
        cells = [];
    }

    /**
     * moves piece image to given position
     * @param {*} row -> piece current row
     * @param {*} col -> piece current col
     * @param {*} toRow -> row to move
     * @param {*} toCol -> col to move
     */
    movePiece(row, col, toRow, toCol){

        let img = $(`#${row}-${col}`).html(); // get image

        $(`#${row}-${col}`).html(""); // clears old cell
        $(`#${toRow}-${toCol}`).html(img); // adds image to new cell

    }

    /**
     * removes piece image from given cell, and substracts a piece
     * @param {*} row -> piece row
     * @param {*} col -> piece col
     * @param {*} opponent -> player that lost the piece
     */
    capturePiece(row, col, opponent){

        $(`#${row}-${col}`).html("");
        $(`#${opponent.color}-pieces`).html( $(`#${opponent.color}-pieces`).html() - 1);

    }

    /**
     * changes piece image to dame image
     * @param {*} row -> piece row
     * @param {*} col -> piece col
     * @param {*} color -> piece color
     */
    setDame(row, col, color){

        let piece = $(`#${row}-${col}`);

        piece.empty(); 
        piece.html(`<img class="img-fluid" src="./resources/images/dame_${color}.png"></img>`); // sets new image

    }

    /**
     * changes avatar opacity according to turn
     * @param {*} playing -> current player 
     * @param {*} opponent -> next player
     */
    changeTurn(playing, opponent){

        console.log($(`#${playing.color}-avatar`));
        $(`#${playing.color}-avatar`).css("opacity", "0.5" );
        $(`#${opponent.color}-avatar`).css("opacity", "1" );

    }
}
