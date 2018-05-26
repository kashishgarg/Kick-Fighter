(function() {
    var game = null;
    var sprites = null;
    var c, canvas = null;
    var stageHeight = 500;
        
    function init() {
        game = app.game;
        sprites = app.assets.sprites;
        canvas = window.document.getElementById('stage');
        c = canvas.getContext('2d');
    }

    function draw() {
        c.clear(0, 0, canvas.width, canvas.height);
        drawPlayers();
    }

    function drawPlayers() {
        var sprite = sprites.box;
        _.forEach(players, function(player) {
            // drawHitbox(player);
            var sprite = spriteFor(player);
            c.drawImage(sprite.image, sprite.x, sprite.y);
            //c.fillRect(player.x, player.y + stageHeight, 10, 10)
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

    function spriteFor(player) {
        return {
            image: sprites.dive[player.direction][player.state],
            x: player.x - game.boxes().playerCenter,
            y: player.y + stageHeight - game.boxes().playerHeight
        }
    }

    app.drawer = { };
    app.drawer.init = init;
    app.drawer.draw = draw;

})();