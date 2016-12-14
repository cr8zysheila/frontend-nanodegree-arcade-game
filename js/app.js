// Enemies our player must avoid
var Enemy = function(posX, posY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = posX;
    this.y = posY;
    this.blockX = this.computeBlockX();
    this.blockY = this.computeBlockY();
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x > canvas.width)
        this.x = 0;

    this.blockX = this.computeBlockX();
    this.blockY = this.computeBlockY();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.computeBlockX = function() {
    return Math.floor(this.x / 101);
}

Enemy.prototype.computeBlockY = function() {
    return Math.floor( (this.y + 105 -70) / 83 );
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY) {
    this.sprite = 'images/char-boy.png';
    this.x = posX;
    this.y = posY;
    this.blockX = this.computeBlockX();
    this.blockY = this.computeBlockY();
    this.wins = 0;
    this.loses = 0;
};

Player.prototype.update = function() {
    /* Have to draw the player first then reset the player
     if(checkCollisions())
    {
        player.resetXY(101*2, 70 + 83 * 4);
        player.loses++;
        document.getElementById("num_loses").innerHTML = player.loses;
    }
    else if(player.blockY === 0)
    {
        player.resetXY(101*2, 70 + 83 * 4);
        player.wins++;
        document.getElementById("num_wins").innerHTML = player.wins;
    }
    */

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    if(checkCollisions())
    {
        player.resetXY(101*2, 70 + 83 * 4);
        player.loses++;
        document.getElementById("num_loses").innerHTML = player.loses;
    }
    else if(player.blockY === 0)
    {
        player.resetXY(101*2, 70 + 83 * 4);
        player.wins++;
        document.getElementById("num_wins").innerHTML = player.wins;
    }
};

Player.prototype.computeBlockX = function() {
    return Math.floor(this.x / 101);
}

Player.prototype.computeBlockY = function() {
    return Math.floor( (this.y + 105 -70) / 83 );
}

Player.prototype.resetXY = function(x, y) {
    this.x = x;
    this.y = y;
    this.blockX = this.computeBlockX();
    this.blockY = this.computeBlockY();
}

Player.prototype.handleInput = function(keyname) { 
    if(keyname === 'left')
    {
        if(this.x - 101 >= 0)
            this.x = this.x - 101;
    }
    else if(keyname === 'right')
    {
        if(this.x + 101 < canvas.width)
            this.x = this.x + 101;
    }
    else if(keyname === 'up')
    {
        if(this.y - 70 >= 0)
            this.y = this.y - 83;
    }
    else if(keyname === 'down')
    {
        if(this.y + 83 < 83 * 5)
            this.y = this.y + 83;
    }

    this.blockX = this.computeBlockX();
    this.blockY = this.computeBlockY();

}

function checkCollisions() {
        var collision = false;
        allEnemies.forEach( function(enemy){
            if(enemy.blockX === player.blockX && enemy.blockY === player.blockY)
            {
                collision = true;
            }
        });

        return collision;
    }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// zz: there's an offset of 70 on y axis, so that the charater part of the image can be 
// placed on the middle of the blocks
var allEnemies = [];
allEnemies.push(new Enemy(0, 70, 80));
allEnemies.push(new Enemy(0, 70 + 83, 120));
allEnemies.push(new Enemy(0, 70 + 83 * 2, 150));

var player = new Player(101*2, 70 + 83 * 4);


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

