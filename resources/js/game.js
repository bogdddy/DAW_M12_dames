class Game {

    constructor(player1, player2) {
        this._player1 = player1;
        this._player2 = player2;
        this._turn = player1;
        this._board = new Board();
        this._selectedPiece = { row: null, col: null, color: null };
        this._possibleMoves = new Array();
        this._mandatoryMove = false;
    }

    get turn() {
        return this._turn;
    }

    get board() {
        return this._board;
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

    // adds event lsiteners to cells
    addEventsToBoard() {

        for (let row = 1; row <= this.board.length; row++) {
            for (let col = 1; col <= this.board.length; col++) {

                $(`#${row}-${col}`).on("click", () => {

                    if (this._possibleMoves.includes(`#${row}-${col}`)) { // move piece

                        this.movePiece(this._selectedPiece.row, this._selectedPiece.col, row, col);

                    } else if (this._turn.color == this.getPieceColor(row, col) && !this._mandatoryMove) { // select piece

                        // clear previous selection
                        this.board.clearHighlitedCells();
                        this._possibleMoves = [];

                        // select piece
                        this._selectedPiece.row = row;
                        this._selectedPiece.col = col;
                        this._selectedPiece.color = this._turn.color;
                        this.board.highlightCell(row, col, "blue");

                        // display pices moves
                        this.checkPossibleMoves(row, col);

                    }
                    else {
                        console.log("select correct piece!!!");
                    }

                });

            }
        }

    }

    // retrieves cell() with given coordinates
    getCell(row, col) {

        let cells = this._board.cells;

        let result = cells.find(cell => cell.positionX == row && cell.positionY == col);

        return result;
    }

    // retrieves piece color from given cell 
    getPieceColor(row, col) {

        let result = this.getCell(row, col);

        // return color
        if (result.piece != null) {
            return result.piece.color;
        } else {
            return null;
        }
    }

    // for every possible pices move, calls checkMove() to check if move is possible and adds it to possible_moves array
    // then highlights cells depending on results
    checkPossibleMoves(row, col, captured = false) {

        let color = this._turn.color;
        let moves = [];

        let piece = this.getCell(row, col).piece;
        console.log("dame "+piece.dame)

        // all possible moves
        if (captured){
            if (piece.dame){
                moves = [
                    { moveX: 2, moveY: -2 },
                    { moveX: 2, moveY: 2 },
                    { moveX: -2, moveY: -2 },
                    { moveX: -2, moveY: 2 },
                ]
            }else if (piece.color =="white"){
                moves = [
                    { moveX: 2, moveY: -2 },
                    { moveX: 2, moveY: 2 },
                ]
            }else if (piece.color == "black"){
                moves = [
                    { moveX: -2, moveY: -2 },
                    { moveX: -2, moveY: 2 },
                ]
            }
        }else if (piece.dame){
            moves = [
                { moveX: 1, moveY: -1 },
                { moveX: 1, moveY: 1 },
                { moveX: -1, moveY: -1 },
                { moveX: -1, moveY: 1 },
                { moveX: 2, moveY: -2 },
                { moveX: 2, moveY: 2 },
                { moveX: -2, moveY: -2 },
                { moveX: -2, moveY: 2 },
            ]
        }else if (piece.color == "white"){
            moves = [
                { moveX: 1, moveY: -1 },
                { moveX: 1, moveY: 1 },
                { moveX: 2, moveY: -2 },
                { moveX: 2, moveY: 2 },
            ]
        }else if (piece.color == "black"){
            moves = [
                { moveX: -1, moveY: -1 },
                { moveX: -1, moveY: 1 },
                { moveX: -2, moveY: -2 },
                { moveX: -2, moveY: 2 },
            ]
        }

        console.log("selected piece, moves");
        console.log(piece, moves);

        // call checkMove()
        for (let move in moves) {
            if (this.checkMove(row, col, moves[move].moveX, moves[move].moveY, color)) { // if move is possible

                this.board.highlightCell(row + moves[move].moveX, col + moves[move].moveY, "green"); // highlight possible move cell
                this._possibleMoves.push(`#${row + moves[move].moveX}-${col + moves[move].moveY}`); // add move to possible moves array

            } 
        }

        console.log("possible moves " + this._possibleMoves);
        
        // if piece has no possible moves
        if (this._possibleMoves.length == 0 && !captured ) {
            this.board.highlightCell(row, col, "red");
        }

    }

    // with given piece position and move directions, checks if move is possible or not
    checkMove(row, col, moveX, moveY, color) {

        console.log(row, col, moveX, moveY);

        // check if moves are inside the board
        if (row + moveX < 1 || row + moveX > 8 || col + moveY < 1 || col + moveY > 8) {

            return false;

        // check move
        } else {

            // +-1 / +-1 moves
            if (moveX == 1 || moveX == -1) {

                if (moveY == -1) {
                        if (this.getCell(row + moveX, col + moveY).piece == null) {
                            return true;
                        }
                } else if (moveY == 1) {
                        if (this.getCell(row + moveX, col + moveY).piece == null) {
                            return true;
                        }
                }

            // +-2 / +-2 moves
            } else if (moveX == 2) {

                if (moveY == -2) {
                    if (this.getCell(row + 1, col - 1).piece != null && this.getCell(row + 1, col - 1).piece.color != color) {
                        if (this.getCell(row + moveX, col + moveY).piece == null) {
                            return true;
                        }
                    }
                } else if (moveY == 2) {
                    if (this.getCell(row + 1, col + 1).piece != null && this.getCell(row +1, col + 1).piece.color != color) {
                        if (this.getCell(row + moveX, col + moveY).piece == null) {
                            return true;
                        }
                    }
                }

            } else if (moveX == -2) {

                if (moveY == -2) {
                    if (this.getCell(row - 1, col - 1).piece != null && this.getCell(row - 1, col - 1).piece.color != color) {
                        if (this.getCell(row + moveX, col + moveY).piece == null) {
                            return true;
                        }
                    }
                } else if (moveY == 2) {
                    if (this.getCell(row - 1, col + 1).piece != null && this.getCell(row - 1, col + 1).piece.color != color) {
                        if (this.getCell(row + moveX, col + moveY).piece == null) {
                            return true;
                        }
                    }
                }

            }

        }

        return false;

    }

    // moves piece to given position
    movePiece(row, col, toRow, toCol) {

        console.log("move piece");
        let captured = false;
        let piece = this.getCell(row, col).piece;

        this.getCell(row, col).piece = null; // remove piece from old position
        this.getCell(toRow, toCol).piece = piece; // place piece in new position

        // check if piece has been captured during move
        if (row - toRow == -2) {

            if (col - toCol == -2) {
                this.capturePiece(toRow - 1, toCol - 1);
            } else if (col - toCol == 2) {
                this.capturePiece(toRow - 1, toCol + 1);
            }

            captured = true;

        } else if (row - toRow == 2) {

            if (col - toCol == -2) {
                this.capturePiece(toRow + 1, toCol - 1);
            } else if (col - toCol == 2) {
                this.capturePiece(toRow + 1, toCol + 1);
            }

            captured = true;

        }

        // move piece graphically
        this._board.movePiece(row, col, toRow, toCol);

        // check if piece became 
        this.checkDame(toRow, toCol);

        // reset variables
        this._selectedPiece = { row: null, col: null, color: null };
        this._possibleMoves = [];
        this._mandatoryMove = false;
        this._board.clearHighlitedCells();

        // if piece was captured, check if you can keep capturing (mandatory move)
        if (captured){
            this.checkPossibleMoves(toRow, toCol, true);
        }

        // mandatory move
        if (this._possibleMoves.length > 0){

            console.log("mandatory move");
            this._mandatoryMove = true;
        
            this._selectedPiece.row = toRow;
            this._selectedPiece.col = toCol;
            this._selectedPiece.color = this._turn.color;
            this._board.highlightCell(toRow, toCol, "blue")

        // change turn
        }else {

            this.changeTurn();
            console.log("turn change");

        }

        console.log(this._board);

    }

    // removes captured piece
    capturePiece(row, col) {

        this.getCell(row, col).piece.setActive; // set captured piece active to false
        this.getCell(row, col).piece = null; // remove captured piece from cell
        this._board.capturePiece(row, col); // graphically remove piece

    }

    // check if piece becomes a dame
    checkDame(row, col){

        let piece = this.getCell(row, col).piece;

        if (!piece.dame){

            if ( piece.color == "white" ){
                
                if (row == 8){
                    piece.setDame(); // set dame to true
                    this._board.setDame(row, col, "white"); // change piece image
                }
                
            } else if (piece.color == "black"){
                
                if (row == 1){
                    piece.setDame(); //set dame to true
                    this._board.setDame(row, col, "black"); // change piece image
                }
                
            }
            
        }

    }

    // basically cahnges turn
    changeTurn() {

        if (this._turn == this._player1) {
            this._turn = this._player2;
        } else {
            this._turn = this._player1;
        }

    }

}