$(document).ready(() => {


  checkOrientation();
  $(window).on("orientationchange", checkOrientation);

    /**
   * Shows modal, and adds listeners to pieces and buttons
   */
     function startGameModal() {

      $('#myModal').modal('show');
  
      let player_info = {
        p1Nick: "Player 1",
        p1Color: "white",
        p2Nick: "Player 2",
        p2Color: "black",
      }
  
      // disable start game button
      $("#guide_checkbox").on("change", () => {
  
        if ($("#guide_checkbox").prop("checked")) {
          $("#start_game").prop("disabled", false);
        } else {
          $("#start_game").prop("disabled", true);
        }
  
      });
  
      // add listeners to piece select
      $("#p1-w").on("click", ()=>{ p1w_p2b() })
      $("#p1-b").on("click", ()=>{ p1b_p2w() })
      $("#p2-w").on("click", ()=>{ p1b_p2w() })
      $("#p2-b").on("click", ()=>{ p1w_p2b() })

      /**
       * adds selected piece color to player_info
       * adds selected_piece to p1-white and p2-black
       * removes selected_piece from p1-black and p2-white
       */
      function p1w_p2b(){
        $("#p1-w").addClass("piece_selected");
        player_info.p1Color = "white";
        $("#p2-b").addClass("piece_selected");
        player_info.p2Color = "black";

        $("#p1-b").removeClass("piece_selected");
        $("#p2-w").removeClass("piece_selected");
      }

      /**
       * adds selected piece color to player_info
       * adds selected_piece to p1-black and p2-white
       * removes selected_piece from p1-white and p2-black
       */
      function p1b_p2w (){
        $("#p1-b").addClass("piece_selected");
        player_info.p1Color = "black";
        $("#p2-w").addClass("piece_selected");
        player_info.p2Color = "white";

        $("#p1-w").removeClass("piece_selected");
        $("#p2-b").removeClass("piece_selected");
      }
  
  
      // "submit" modal data to init()
      $("#start_game").on("click", () => {
       
        // get player nicks
        if ($("#p1-nickname").val() != ""){
          player_info.p1Nick = $("#p1-nickname").val();
        }
        if ($("#p2-nickname").val() != ""){
          player_info.p2Nick = $("#p2-nickname").val();
        }
  
        init(player_info);
  
      })
  
    }

  /**
   * Checks if screen orientation is landscape;
   * if so locks it and shows the start modal
   */
  function checkOrientation() {
    console.log(screen.orientation.type);
    if (screen.orientation.type == "landscape-primary") {
      startGameModal();
      screen.orientation.lock("landscape-primary").then(
        success => { },
        failure => { }
      );
    }
  }


  /**
   * Initializes the game
   * Creates the player objects and then a new Game
   */
  function init(player_info) {

    console.log(player_info);
    let player1 = new Player(player_info.p1Nick, player_info.p1Color);
    let player2 = new Player(player_info.p2Nick, player_info.p2Color);

    let game = new Game(player1, player2);

    game.newGame();

    console.log(game);
    console.log(game.board);


    // test cases
    // let myCell = game.getCell(4, 3);
    // myCell.piece = (new Piece("black"));
    // $("#4-3").html(`<img class="img-fluid" src="./resources/images/piece_black.png"></img>`);

    // console.log(game.getCell(6, 3));

    // game.getCell(6, 3).piece = null;
    // // console.log(game.getCell(6, 3).piece);
    // $("#6-3").empty();

    // game.getCell(7, 4).piece = null;
    // // console.log(game.getCell(7, 4).piece);
    // $("#7-4").empty();

    // myCell = game.getCell(7, 4);
    // myCell.piece = (new Piece("white"));
    // $("#7-4").html(`<img class="img-fluid" src="./resources/images/piece_white.png"></img>`);

    // myCell = game.getCell(5, 4);
    // myCell.piece = (new Piece("white"));
    // $("#5-4").html(`<img class="img-fluid" src="./resources/images/piece_white.png"></img>`);

    // myCell = game.getCell(5, 2);
    // myCell.piece = (new Piece("white"));
    // $("#5-2").html(`<img class="img-fluid" src="./resources/images/piece_white.png"></img>`);

  }


})