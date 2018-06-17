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
    }

    function startDrawing() {
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

    app.drawer = { };
    app.drawer.init = init;
    app.drawer.startDrawing = startDrawing;
    app.drawer.stage = function() { return stage; };
})();