(function() {
    var game = null;
    var sprites = { };
    var stage, renderer = null;
    var stageHeight = 500;
        
    function init() {
        stage = new PIXI.Stage(0xFFFFFF);
        renderer = PIXI.autoDetectRenderer(1280, 500);
        $('stage').append(renderer.view);
        game = app.game;
        requestAnimFrame(draw);
    }

    function draw() {
        requestAnimFrame(draw);
        _.each(game.players(), function() {
            var sprite = playerSprite(player);
            sprite.x = player.x;
            sprite.y = player.y + stageHeight;

            if(player.state == 'dying') {
                sprite.alpha = player.deathCountdown / 60.0;
            } else {
                sprite.alpha = 1;
            }

        });
        renderer.render(stage);
    }

    function playerState(player) {
        if(player.state == "dying") return player.deathState;
        return player.state;
    }

    function playerSprite(player) {
        var sprite = sprites[player.id];
        if(!sprite) {
            sprite = new PIXI.sprite(playerTexture(player));
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 1;
            stage.addChild(sprite);
            sprites[player.id] = sprite;
        }
        return sprite;
    }

    function playerTexture(player) {
        return app.assets.sprites.dive[player.direction][player.state];
    }

    app.drawer = { };
    app.drawer.init = init;
})();