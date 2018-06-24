//Declaring of empty array of enemies
let arrayOfEnemies = [];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * 505;
    this.y = 63 + (Math.round(Math.random() * 2) * 83);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/enemy-bug.png";

    //The speed of our enemies
    this.speed = Math.random() * 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;

    if (this.x >= 505) {
        this.y = 63 + (Math.round(Math.random() * 2) * 83);
        this.x = -50;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var GamePlayer = function() {
    //Start position coordinates
    this.x = 404;
    this.y = 404;

    //Start game score
    this.gameScore = 0;

    //Show image of the player
    this.sprite = "images/char-boy.png";
};

//Checks if the player crashed in the any enemy and restart the game player position`s coordinates
GamePlayer.prototype.collisionCheck = function () {
    for (const currentEnemy in arrayOfEnemies) {
        if (this.x < allEnemies[currentEnemy].x + 80 &&
            this.x + 65 > allEnemies[currentEnemy].x + 2 &&
            this.y + 135 > allEnemies[currentEnemy].y + 140 &&
            this.y + 65 < allEnemies[currentEnemy].y + 75) {
            this.score = 0;
            this.x = 404;
            this.y = 404;
            console.log("Game over! Start again, if you want to accomplish more score!");
        }
    }

    if (this.y <= 0) {
        this.score += 1;
        this.x = 404;
        this.y = 404;
        console.log("You won the arcade game!");
    }

    //Show Game player score
    ctx.clearRect(10, 10, 350, 50);
    ctx.fillStyle = "#ccc";
    ctx.font = "28pt Arial Narrow";
    ctx.fillText("Your score is: " + this.score, 404, 40);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
