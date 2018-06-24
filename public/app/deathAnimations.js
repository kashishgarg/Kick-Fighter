(function() {
    var deathQueue = [];
    var maxDeathCountdown = 150;
    var stage;
    var gravity = 0.2;
    function init() {
        stage = app.drawer.stage();
    }

    function pieces(texture, x, y) {
        var results = [];
        var width = texture.frame.width;
        var height = texture.frame.height;
        var rows = 15;
        var columns = 15;
        var deltaX = width / rows;
        var deltaY = height / columns;
        _.times(rows, function(row) {
            _.times(columns, function(column) {
                var spriteX = column * deltaX;
                var spriteY = row * deltaY;
                var sprite = new PIXI.Sprite(new PIXI.Texture(texture, { x: spriteX, y: spriteY, width: deltaX, height: deltaY }));
                sprite.anchor.x = 0.5;  
                sprite.anchor.y = 1;
                sprite.position.x = x + (width * sprite.anchor.x) - (deltaX * (rows - (row + 1)));
                sprite.position.y = y - (deltaY * (columns - (column + 1)));
                results.push({
                    sprite: sprite,
                    dy: _.random(-20, 0),
                    dx: _.random(-10, 10),
                    rotation: Math.random() / 2
                })
            });
        });
        return results;
    }

    function queue(texture, x, y) {
        var bodyParts = pieces(texture, x, y);
        var animation = {
            pieces: bodyParts,
            deathCountDown: maxDeathCountdown
        }

        deathQueue.push(animation);
        _.each(animation.pieces, function(piece) { stage.addChild(piece.sprite); });
    }

    function tick() {
        _.each(deathQueue, function(death) {
            _.each(death.pieces, function(piece) {
                piece.sprite.alpha = deathCountDown / maxDeathCountdown;
                var dx = piece.dx;
                var dy = piece.dy;
                var roatation = piece.rotation;
                var tickCount = maxDeathCountdown - deathCountDown;
                if( tickCount < 25 && tickCount > 5) {
                    rotation = rotation / 10;
                    dx = dx / 10;
                    dy = dy / 10;
                }
                piece.sprite.position.x += dx;
                piece.sprite.position.y += dy;
                piece.dy += gravity;
                piece.sprite.rotation = rotation;
            })
            death.deathCountDown -= 1;
            death.sprite.alpha = death.deathCountDown / maxDeathCountdown;
        });
        var done = _.where(deathQueue, { deathCountDown: 0 });
        _.each(done, function(d) {
            _.each(d, function(piece) {
                stage.removeChild(piece.sprite);
            });
        });
        deathQueue = _.without(deathQueue, done);
    }

    app.deathAnimations = { };
    app.deathAnimations.tick = tick;   
    app.deathAnimations.init = init;
    app.deathAnimations.queue = queue;
})();