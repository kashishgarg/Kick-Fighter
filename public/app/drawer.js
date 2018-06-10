(function() {
    var game = null;
    var sprites = null;
    var c, canvas, deathContext, deathCanvas = null;
    var stageHeight = 500;
    var maxDeathCountdown = 60;
        
    function init() {
        game = app.game;
        sprites = app.assets.sprites;
        canvas = window.document.getElementById('stage');
        c = canvas.getContext('2d');
        deathCanvas = window.document.getElementById('deathCanvas');
        deathContext = deathCanvas.getContext('2d');
    }

    function draw() {
        c.clear(0, 0, canvas.width, canvas.height);
        drawPlayers();
    }

    function drawPlayers() {
        console.log(game.players());
        _.each(players, function(player) {
            // drawHitbox(player);
                var sprite = spriteFor(player);
                if(sprite.image.toString() == "[object ImageData]") {
                    c.putImageData(sprite.image, sprite.x, sprite.y);
                }
                else {
                    c.drawImage(sprite.image, sprite.x, sprite.y);
                }
        });
    }

    function drawHitbox(player) {
        c.fillRect(player.x, player.y + stageHeight, 2, 2);
        _.each(game.boxes()[player.direction][player.state], function(box) {
            drawBox(player, box);
        })
    }

    function drawBox(player, box) {
        c.fillRect((player.x + box.x), 
                  (player.y + box.y) + stageHeight,
                  Math.abs(box.x2 - box.x),
                  Math.abs(box.y2 - box.y)
     )
    }

    function imageDataForDeath(player, sprite, canvasX, canvasY) {
        deathContext.clear(0, 0, 75, 150);
        deathContext.drawImage(sprite, 0, 0, 75, 150, 0, 0, 75, 150);
        var stageSource = c.getImageData(canvasX, canvasY, 75, 150);
        var deathImage = deathContext.getImageData(0, 0, 75, 150);
        var length = deathImage.data.length;
        var alphaPercentage = player.deathCountdown / maxDeathCountdown;

        for(var i = 3; i < length; i+=4) {
            if(deathImage.data[i] > 0 && deathImage.data[i - 1] > 0 && 
               deathImage.data[i - 2] > 0 && deathImage.data[i - 3] > 0) {
                deathImage.data[i - 1] = deathImage.data[i - 1] + 150;
                deathImage.data[i - 2] = deathImage.data[i - 2] + 150;
                deathImage.data[i - 3] = deathImage.data[i - 3] + 150;
                deathImage.data[i] *= alphaPercentage;
            }
        }
    }

    function spriteFor(player) {
        var state = playerState(player);
        var x = player.x - game.boxes().playerCenter;
        var y = player.y + stageHeight - game.boxes().playerHeight;
        var image = sprites.dive[player.direction][playerState(player)]; 
        if(state == "dying") {
            image = imageDataForDeath(player, image, x, y);
        }
        return { image: image, x: x, y: y }
    }

    function playerState(player) {
        if(player.state == "dying") return player.deathState;
        return player.state;
    }

    app.drawer = { };
    app.drawer.init = init;
    app.drawer.draw = draw;

})();