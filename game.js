var game;
var gameOptions = {
    tileSize: 200,
    tileSpacing: 60,
    boardSize: { rows: 3, cols: 3 }
}
window.onload = function() {
    var gameConfig = {
        width: gameOptions.boardSize.cols * (gameOptions.tileSize +
            gameOptions.tileSpacing) + gameOptions.tileSpacing,
        height: gameOptions.boardSize.rows * (gameOptions.tileSize +
            gameOptions.tileSpacing) + gameOptions.tileSpacing,
        backgroundColor: 0x666666,
        scene: [bootGame, playGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
        this.load.image('background', 'assets/sprites/bg.png')
        this.load.image('field', 'assets/sprites/emptytile.png')
        this.load.spritesheet('xo', 'assets/sprites/xo.png', {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
    }
    create(){
        this.scene.start("PlayGame");
    }
}

class playGame extends Phaser.Scene{



    constructor(){
        super("PlayGame");
    }
    create(){
        this.gamestate = true;
        this.board =
            [0,0,0,
            0,0,0,
            0,0,0];


        this.add.image(400, 450, 'background');
        this.boardArray = [];
        for(var i = 0; i < 9; i++){
                var newI = i/3;
                var newJ = i%3;

                var tilePosition = this.getTilePosition(newI, newJ);
                var image = this.add.image(0, 0, "field").setInteractive();
                image.setAlpha(0.5);
                var tilex = this.add.sprite(0, 0, "xo", 0).setInteractive();
                var tileo = this.add.sprite(0, 0, "xo", 1).setInteractive();
                tilex.visible = false;
                tileo.visible = false;
                var container = this.add.container (tilePosition.x, tilePosition.y, [ image, tilex, tileo ]);

                container.setData("this",this);
                container.setData("number",i);

                image.on("pointerdown", function () {

                    var cont = this.parentContainer;
                    console.log(cont);
                    console.log(this);
                    console.log();
                    var game = cont.getData("this");
                    var number = cont.getData("number");
                    if (game.gameState)
                    {
                        game.board[number] = -1;
                        cont.getAt(1).setVisible(true);
                        game.gameState=!game.gameState;
                    }
                    else
                    {
                        game.board[number] = 1;
                        cont.getAt(2).setVisible(true);
                        game.gameState=!game.gameState;

                    }

                    console.log(game.board[0],game.board[1],game.board[2]);
                    console.log(game.board[3],game.board[4],game.board[5]);
                    console.log(game.board[6],game.board[7],game.board[8]);
                });




        }
        console.log(this.boardArray);
       // this.addTile();
    }



    addTile(){
        var emptyTiles = [];
        for(var i = 0; i < gameOptions.boardSize.rows; i++){
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                if(this.boardArray[i][j].tileValue == 0){
                    emptyTiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        if(emptyTiles.length > 0){
            var chosenTile = Phaser.Utils.Array.GetRandom(emptyTiles);
            this.boardArray[chosenTile.row][chosenTile.col].tileValue = 1;
            this.boardArray[chosenTile.row][chosenTile.col].tileSprite.visible = true;
            this.boardArray[chosenTile.row][chosenTile.col].tileSprite.setFrame(1);
        }
    }

    getTilePosition(row, col){
        var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize *
            (col + 0.5);
        var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize *
            (row + 0.5);
        return new Phaser.Geom.Point(posX, posY);
    }
}

function resizeGame() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}