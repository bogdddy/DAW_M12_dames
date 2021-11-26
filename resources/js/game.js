class Game {

    constructor(player1, player2) {
        this._playing = false;
        this._player1 = player1;
        this._player2 = player2;
        this._turn = player1;
        this._board = null;
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

    newBoard() {
        this._board = new Board();
    }

    /**
     * Starts a new game; 
     * calls all methods to initialize the game
     */
    newGame() {

        this._player1.color == "white" ? this._turn = this._player1 : this._turn = this._player2;

        this._playing = true;
        this.newBoard(); // create board
        this.fillBoard(); // logically add cells() and pieces()
        this.board.printBoard(); // print board
        this.addEventsToBoard(); // add listeners to boards
        this.board.fillLayout(this._player1, this._player2); // add players to layout

    }

    /**
     * logically fills Board() with Cell() and Piece()
     */
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

    /**
     * Adds event listener to cells adn surrender buttons
     */
    addEventsToBoard() {

        $("#p1-surrender").click(() => {
            this.surrender(this._player1)
        });

        $("#p2-surrender").click(() => {
            this.surrender(this._player2)
        });

        for (let row = 1; row <= this.board.length; row++) {
            for (let col = 1; col <= this.board.length; col++) {

                $(`#${row}-${col}`).on("click", () => {

                    if (this._playing) {

                        // move piece
                        if (this._possibleMoves.includes(`#${row}-${col}`)) {

                            this.movePiece(this._selectedPiece.row, this._selectedPiece.col, row, col);

                            // select piece
                        } else if (this._turn.color == this.getPieceColor(row, col) && !this._mandatoryMove) {

                            // clear previous selection
                            this.board.clearHighlitedCells();
                            this._possibleMoves = [];

                            // select piece
                            this._selectedPiece.row = row;
                            this._selectedPiece.col = col;
                            this._selectedPiece.color = this._turn.color;
                            this.board.highlightCell(row, col, "white");

                            // display pices moves
                            this.checkPossibleMoves(row, col);

                            // incorrect piece selected
                        } else if (this._turn.color != this.getPieceColor(row, col) && this.getCell(row, col).piece != null) { // select incorrect piecee

                            // display wrong piece toast
                            Swal.fire({
                                toast: true,
                                title: '<p style="text-align: center"> nonono </p>',
                                icon: "warning",
                                position: 'center',
                                showConfirmButton: false,
                                timer: 1000,
                                width: '25%',
                            })

                        }

                    }

                });

            }
        }

    }

    /**
     * retrieves cell() with given coordinates
     * @param {*} row -> cell row
     * @param {*} col -> cell col
     * @returns cell object
     */
    getCell(row, col) {

        let cells = this._board.cells;

        return cells.find(cell => cell.positionX == row && cell.positionY == col);

    }

    /**
     * retrieves cells() containing opponent active pieces
     * @returns various cell objects
     */
    getOpponentActivePieces() {

        return this._board.cells.filter(cell => cell.piece != null && cell.piece.active == true && cell.piece.color == this.opponent.color);

    }

    /**
     * retrieves piece color from given cell()
     * @param {*} row -> cell row containing the piece
     * @param {*} col -> cell col containing the piece
     * @returns string containing piece color
     */
    getPieceColor(row, col) {

        let result = this.getCell(row, col);

        // return color
        if (result.piece != null) {
            return result.piece.color;
        } else {
            return null;
        }
    }

    /**
     * all possible piece() moves
     * @param {*} piece -> piece instance
     * @param {*} captured -> boolean; if multiple capturing True, else False
     * @returns array with all possible moves
     */
    getPieceMoves(piece, captured = false) {

        let moves;

        //mandatory moves
        if (captured) {
            if (piece.dame) {
                moves = [
                    { moveX: 2, moveY: -2 },
                    { moveX: 2, moveY: 2 },
                    { moveX: -2, moveY: -2 },
                    { moveX: -2, moveY: 2 },
                ]
            } else if (piece.color == "white") {
                moves = [
                    { moveX: 2, moveY: -2 },
                    { moveX: 2, moveY: 2 },
                ]
            } else if (piece.color == "black") {
                moves = [
                    { moveX: -2, moveY: -2 },
                    { moveX: -2, moveY: 2 },
                ]
            }

            // normal moves
        } else if (piece.dame) {
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
        } else if (piece.color == "white") {
            moves = [
                { moveX: 1, moveY: -1 },
                { moveX: 1, moveY: 1 },
                { moveX: 2, moveY: -2 },
                { moveX: 2, moveY: 2 },
            ]
        } else if (piece.color == "black") {
            moves = [
                { moveX: -1, moveY: -1 },
                { moveX: -1, moveY: 1 },
                { moveX: -2, moveY: -2 },
                { moveX: -2, moveY: 2 },
            ]
        }

        return moves;
    }

    /**
     * for every possible pices move, calls checkMove() to check if move is possible, if so adds it to possible_moves array
     * also highlights cells depending on results
     * @param {*} row -> cell row containing the piece
     * @param {*} col -> cell col containing the piece
     * @param {*} captured -> boolean, either its a mandatory move or not
     */
    checkPossibleMoves(row, col, captured = false) {

        let color = this._turn.color;
        let piece = this.getCell(row, col).piece;
        let moves = this.getPieceMoves(piece, captured);

        // call checkMove()
        for (let move in moves) {

            // no need to check 2/2 moves if 1/1 is already possible
            if (!this._possibleMoves.includes(`#${row + moves[move].moveX / 2}-${col + moves[move].moveY / 2}`)) {

                // if move is possible
                if (this.checkMove(row, col, moves[move].moveX, moves[move].moveY, color)) {

                    this.board.highlightCell(row + moves[move].moveX, col + moves[move].moveY, "green"); // highlight possible move cell
                    this._possibleMoves.push(`#${row + moves[move].moveX}-${col + moves[move].moveY}`); // add move to possible moves array
                }
            }
        }

        // if piece has no possible moves
        if (this._possibleMoves.length == 0 && !captured) {
            this.board.highlightCell(row, col, "red");
        }

    }

    /**
     * with given piece position and move directions, checks if move is possible or not
     * @param {*} row -> piece current row
     * @param {*} col -> piece current col
     * @param {*} moveX -> number of rows to move
     * @param {*} moveY -> number of cols to move
     * @param {*} color -> piece color
     * @returns true if move is valid, else false
     */
    checkMove(row, col, moveX, moveY, color) {

        // check if moves are inside the board
        if (row + moveX < 1 || row + moveX > 8 || col + moveY < 1 || col + moveY > 8) {

            return false;

            // check move
        } else {

            // +-1 / +-1 moves
            if (Math.abs(moveX) == 1 && this.getCell(row + moveX, col + moveY).piece == null) {

                return true;

                // +-2 / +-2 moves
                //first check if there is an opponents piece in 1/1, then check if the 2/2 is empty 
            } else if (Math.abs(moveX) == 2 &&
                (this.getCell(row + moveX / 2, col + moveY / 2).piece != null &&
                    this.getPieceColor(row + moveX / 2, col + moveY / 2) != color &&
                    this.getCell(row + moveX, col + moveY).piece == null)) {
                return true;
            }

        }

        return false;

    }

    /**
     * moves piece to given position
     * @param {*} row -> piece current row
     * @param {*} col -> piece current col
     * @param {*} toRow -> row to move
     * @param {*} toCol -> col to move
     */
    movePiece(row, col, toRow, toCol) {

        let piece = this.getCell(row, col).piece;

        this.getCell(row, col).piece = null; // remove piece from old position
        this.getCell(toRow, toCol).piece = piece; // place piece in new position
        this._board.movePiece(row, col, toRow, toCol); // move piece graphically

        // check if piece became dame
        if (!piece.dame) {
            this.checkDame(toRow, toCol, piece);
        }

        // reset variables
        this._selectedPiece = { row: null, col: null, color: null };
        this._possibleMoves = [];
        this._mandatoryMove = false;
        this._board.clearHighlitedCells();

        // check if piece has been captured during move, if so, check if can keep capturing (mandatory move)
        if (Math.abs(row - toRow) == 2) {

            this.capturePiece(row + ((toRow - row) / 2), col + ((toCol - col) / 2));
            this.checkPossibleMoves(toRow, toCol, true);

        }

        // mandatory move
        if (this._possibleMoves.length > 0) {

            // mandatory move toast
            Swal.fire({
                toast: true,
                title: '<p style="text-align: center"> mandatory move </p>',
                icon: "info",
                position: 'center',
                showConfirmButton: false,
                timer: 1200,
                width: '35%',
            })

            this._mandatoryMove = true;

            //change selected piece position
            this._selectedPiece.row = toRow;
            this._selectedPiece.col = toCol;
            this._selectedPiece.color = this._turn.color;
            this._board.highlightCell(toRow, toCol, "white")

            // change turn
        } else {

            // if opponent has no moves left, end the game
            if (!this.checkMovesLeft()) {
                this.endGame(this.turn);
            }
            // else change turn
            else {
                this.changeTurn();
            }

        }

    }

    /**
     * removes captured piece during move
     * @param {*} row -> cell row containing the piece
     * @param {*} col -> cell col containing the piece
     */
    capturePiece(row, col) {

        //remove logically
        this.getCell(row, col).piece.setActive;
        this.getCell(row, col).piece = null;
        this.opponent.substractPiece();

        //remove graphically
        this._board.capturePiece(row, col, this.opponent);

        // check if opponent has no pieces left, if so, end the game
        if (this.opponent.pieces == 0) {
            this.endGame(this.turn);
        }

    }

    /**
     * check if piece becomes a dame, and sets it
     * @param {*} row -> piece current row
     * @param {*} col -> piece current col
     * @param {*} piece -> piece object to check
     */
    checkDame(row, col, piece) {


        if (piece.color == "white" && row == 8) {

            piece.setDame(); // set dame to true
            this._board.setDame(row, col, "white"); // change piece image


        } else if (piece.color == "black" && row == 1) {

            piece.setDame(); //set dame to true
            this._board.setDame(row, col, "black"); // change piece image

        }

    }

    /**
     * checks if opponent has moves left
     * @returns true if opponent has moves left, else false
     */
    checkMovesLeft() {

        let cells = this.getOpponentActivePieces() // all cells with oponent pieces

        // for each opponent piece, check all moves, until find a possible one
        for (let cell in cells) {
            let moves = this.getPieceMoves(cells[cell].piece);

            for (let move in moves) {

                if (this.checkMove(cells[cell].positionX, cells[cell].positionY, moves[move].moveX, moves[move].moveY, cells[cell].piece.color)) { // if move is possible
                    return true;
                }

            }
        }

        return false;
    }

    /**
     * basically changes turn
     */
    changeTurn() {

        this.board.changeTurn(this._turn, this.opponent);

        this._turn == this._player1 ? this._turn = this._player2 : this._turn = this._player1;

    }

    /**
     * shows surrender modal, and asks for rematch
     * @param {*} player -> player who has surrendered
     */
    surrender(player) {

        if (this._playing && this._turn == player) {

            // confirm surrender
            Swal.fire({

                title: 'Are you sure you want to surrender?',
                icon: 'question',
                position: 'center',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Yeee',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                cancelButtonText: 'Noo',
                width: '40%',

            }).then((result) => {
                if (result.isConfirmed) {

                    this._playing = false;

                    // surrender alert
                    Swal.fire({

                        text: `${player.name} has surrended`,
                        showConfirmButton: true,
                        imageUrl: './resources/images/ff.gif',
                        imageWidth: 400,
                        imageHeight: 300,
                        imageAlt: 'uwu',
                        width: '40%',

                    }).then(() => {
                        this.newGameModal();
                    })

                }
            })

        }
    }

    /**
     * ends game, and shows winner modal
     * @param {*} winner -> player who has won
     */
    endGame(winner) {

        this._playing = false;

        Swal.fire({

            text: `${winner.name} WINS !!!`,
            imageUrl: './resources/images/win.jpg',
            imageWidth: 400,
            imageHeight: 300,
            imageAlt: 'dale nen',

        }).then(() => {
            this.newGameModal();
        })

    }

    /**
     * shows modal to start a new game
     */
    newGameModal() {

        Swal.fire({

            title: 'Do you want to play another game?',
            icon: 'question',
            position: 'center',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yeee',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Noo',
            width: '40%',

        }).then((result) => {

            if (result.isConfirmed) {
                this.newGame();
            }

        })

    }

}