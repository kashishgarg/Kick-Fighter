(function() {
    var game = null;
    var sprites = { };
    var stage, renderer = null;
    var stageHeight = 500;
    var maxWidth = 1280;
    var maxHeight = 500;
        
    function init() {
        stage = new PIXI.Stage(0xFFFFFF);
        renderer = PIXI.autoDetectRenderer(1280, 500);
        $(window).resize(onResize);
        $('stage').append(renderer.view);
        game = app.game;
    }

    function startDrawing() {
        onResize();
        requestAnimationFrame(draw);
        setInterval(calc, 17);
    }

    function calc() {
        app.playerSprites.tick(game.players());
        app.deathAnimations.tick();
    }

    function draw() {
        renderer.render(stage);
        requestAnimationFrame(draw);
    }

    function playerState(player) {
        if(player.state == "dying") return player.deathState;
        return player.state;
    }

    function addPlayerSprite(player) {
        if(sprites[player.id]) return;
        var playerSprite = new app.PlayerSprite(player.id);
        sprites[player.id] = playerSprite;
        stage.addChild(playerSprite.sprite);
        return sprite;
    }

    function playerTexture(player) {
        return app.assets.sprites.dive[player.direction][player.state];
    }

    function onResize() {
        var width = $('canvas').width();
        var height = width / maxWidth * maxHeight;
        if(width < maxWidth) {
            $('canvas').css({ height: height, width: width });
        } else {
            $('canvas').css({ height: maxHeight, width: maxWidth });
        }
    }

    app.drawer = { };
    app.drawer.init = init;
    app.drawer.startDrawing = startDrawing;
    app.drawer.stage = function() { return stage; };
})();