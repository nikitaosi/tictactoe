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
        this.add.image(400, 450, 'background');
        this.boardArray = [];
            for(var i = 0; j < 9; i++){
                var newi = i/3;
                var newj = i%3;
                var tilePosition = this.getTilePosition(newi, newj);
                var image = this.add.image(0, 0, "field").setInteractive();
                image.setAlpha(0.3);
                var tilex = this.add.sprite(0, 0, "xo", 0).setInteractive();
                var tileo = this.add.sprite(0, 0, "xo", 1);
                tilex.visible = false;
                tileo.visible = false;
                var container = this.add.container (tilePosition.x, tilePosition.y, [ image, tilex, tileo ]);
                image.on("pointerover", function (){
                    this.setAlpha(0.6);
                });
                image.on("pointerout", function (){
                    this.setAlpha(0.3);
                });
                image.on("pointerdown", function (){
                    this.parentContainer.list[1].visible = true;
                });
                this.boardArray[i][j] = {
                    tileValue: 0,
                    tileSprite: tilex
                }
            }
        }
        console.log(this.boardArray);
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