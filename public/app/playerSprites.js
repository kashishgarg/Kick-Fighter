(function() {
    var stageHeight = 500;
    var maxDeathCountdown = 40.0;
    var stage;
    var sprites = { };

    function init() {
        var stage = app.drawer.stage();
    }

    function playerTexture(playerId) {
        var player = app.game.getPlayer(playerId)
        return app.assets.sprites.dive[player.direction][playerState(player)];
    }

    function playerState(player) {
        if(player.state == "dying") return player.deathState;
        return player.state;
    }

    function add(player) {
        if(sprites[player.id]) return;
        var playerSprite = new PlayerSprites(player.id);
        sprites[player.id] = playerSprite;
        stage.addChild(playerSprite.sprite);
    }

    function tick(players) {
        _.each(players, app.playerSprites.add);
        _.each(sprites, function(sprite) { sprite.tick(); });
    }

    class PlayerSprites {
        constructor(playerId) {
            this.id = playerId;
            this.sprite = new PIXI.sprite(playerTexture(this.id));
            this.sprite.anchor.x = 0.5;
            this.sprite.anchor.y = 1;
            this.deathCountdown = null;
            this.dead = false;
            
            this.tick = function () {
                var player = app.game.getPlayer(this.id);
                this.sprite.alpha = 0;
                if (!player) return;
                this.sprite.setTexture(playerTexture(this.id));
                this.sprite.position.x = player.x;
                this.sprite.position.y = player.y + stageHeight;
                if (player.state == 'dying' && !this.dead) {
                    this.dead = true;
                    this.sprite.alpha = 0;
                    app.deathAnimations.queue(playerTexture(this.id), 
                                              this.sprite.x, 
                                              this.sprite.y);
                } else if (player.state != "dying") {
                    this.dead = false;
                    this.sprite.alpha = 1;
                }

            };
        }
    }

    app.playerSprites = { };
    app.playerSprites.init = init;
    app.playerSprites.tick = tick;
    app.playerSprites.add = add;
})();