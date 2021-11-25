class Game {

    constructor(player1, player2) {
        this._playing = false;
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

    get opponent() {
        return this._turn == this._player1 ? this._player2 : this._player1;
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

                    if (this._playing){
                        
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

    // retrieves cells() containing opponent active pieces
    getOpponentActivePieces(){

        // return this._board.cells.filter(cell => cell.piece != null && cell.piece.active == true && cell.piece.color == this.opponent.color).map(cell => cell.piece); 
        return this._board.cells.filter(cell => cell.piece != null && cell.piece.active == true && cell.piece.color == this.opponent.color);

    }

    // retrieves piece color from given cell()
    getPieceColor(row, col) {

        let result = this.getCell(row, col);

        // return color
        if (result.piece != null) {
            return result.piece.color;
        } else {
            return null;
        }
    }

    // all possible piece() moves
    getPieceMoves(piece, captured=false){

        let moves ;
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

        return moves;
    }

    // for every possible pices move, calls checkMove() to check if move is possible and adds it to possible_moves array
    // then highlights cells depending on results
    checkPossibleMoves(row, col, captured = false) {

        let color = this._turn.color;
        let piece = this.getCell(row, col).piece;
        console.log("dame "+piece.dame);
        let moves = this.getPieceMoves(piece, captured);
        console.log("selected piece, moves");
        console.log(piece, moves);

        // call checkMove()
        for (let move in moves) {

            // no hace falta comprobar todos los movimients
            // si haces +1+1 , no puedes hacer +2+2
            // jaja saludos crack
            if (!this._possibleMoves.includes(`#${row + moves[move].moveX / 2}-${col + moves[move].moveY /2}`) ){ // no need to check 2/2 moves if 1/1 is already possible
                
                if (this.checkMove(row, col, moves[move].moveX, moves[move].moveY, color)) { // if move is possible
    
                    this.board.highlightCell(row + moves[move].moveX, col + moves[move].moveY, "green"); // highlight possible move cell
                    this._possibleMoves.push(`#${row + moves[move].moveX}-${col + moves[move].moveY}`); // add move to possible moves array
                } 
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
            if (Math.abs(moveX) == 1) {
                
                if (this.getCell(row + moveX, col + moveY).piece == null) {
                    return true;
                }

            // +-2 / +-2 moves
            } else if (Math.abs(moveX) == 2) {
                
                //first check if there is an opponents piece in 1/1, then check if the 2/2 is empty 
                if (this.getCell(row + moveX / 2, col + moveY / 2).piece != null && this.getPieceColor(row + moveX / 2, col + moveY / 2 ) != color) {
                    if (this.getCell(row + moveX, col + moveY).piece == null) {
                        return true;
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
        this._board.movePiece(row, col, toRow, toCol); // move piece graphically
        
        // check if piece became 
        if(piece.dame == false && (toRow == 1 || toRow == 8)){
            this.checkDame(toRow, toCol, piece);
        }
        
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

        // reset variables
        this._selectedPiece = { row: null, col: null, color: null };
        this._possibleMoves = [];
        this._mandatoryMove = false;
        this._board.clearHighlitedCells();

        // if piece was captured, check if you can keep capturing (mandatory move)
        if (captured){
            if (this.opponent.pieces == 0){
                this.endGame(this.turn);
            }else {
                this.checkPossibleMoves(toRow, toCol, true);
            }
        }

        // mandatory move
        if (this._possibleMoves.length > 0){

            console.log("mandatory move");
            this._mandatoryMove = true;
        
            //change selected piece position
            this._selectedPiece.row = toRow;
            this._selectedPiece.col = toCol;
            this._selectedPiece.color = this._turn.color;
            this._board.highlightCell(toRow, toCol, "blue")

        // change turn
        }else {

            // if opponent has no moves left, end the game
            if(!this.checkMovesLeft()){
                console.log("change turnaaaaaaaaaaa");
                this.endGame(this.turn);
            }
            // else change turn
            else{
                this.changeTurn();
                console.log("turn change");
            }

        }

        console.log(this._board);

    }

    // removes captured piece
    capturePiece(row, col) {

        this.getCell(row, col).piece.setActive; // set captured piece active to false
        this.getCell(row, col).piece = null; // remove captured piece from cell
        this._board.capturePiece(row, col); // graphically remove piece
        this.opponent.substractPiece(); // substract piece from opponent

    }

    // check if piece becomes a dame
    checkDame(row, col, piece){

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

    // checks if opponent has moves left
    checkMovesLeft(){

        let cells = this.getOpponentActivePieces() // all cells with oponent pieces
        
        console.log("active ");
        console.log(cells);

        // for each opponent piece, check all moves, until find a possible one
        for (let cell in cells){
            let moves = this.getPieceMoves(cells[cell].piece);

            for (let move in moves){ 
                console.log(cells[cell]);
                if (this.checkMove(cells[cell].positionX, cells[cell].positionY, moves[move].moveX, moves[move].moveY, cells[cell].piece.color)) { // if move is possible
                    return true;
                } 

            }
        }

        return false;
    }

    // basically changes turn
    changeTurn() {

        this._turn == this._player1 ? this._turn = this._player2 : this._turn = this._player1;

    }

    // ends game 
    surrender() {

        this._playing = false;
        
        // surrender alert
        Swal.fire({
            text: ``,
            imageUrl: './resources/images/ff.gif',
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: 'di que si tete',
        })
    }

    endGame(winner){
        
        this._playing = false;

        Swal.fire({
            text: `${winner.name} WINS !!!`,
            imageUrl: './resources/images/win.jpg',
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: 'di que si tete',
        })
        
    }

}