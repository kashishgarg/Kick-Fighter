(function() {
    var deathQueue = [];
    var maxDeathCountdown;
    var stage;
    function init() {
        stage = app.drawer.stage();
    }

    function queue(texture, x, y) {
        var sprite = new PIXI.sprite(texture);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 1;
        sprite.position.x = x;
        sprite.position.y = y;

        var animation = {
            sprite: sprite,
            deathCountDown: maxDeathCountdown
        }

        deathQueue.push(animation);
        stage.addChild(animation.sprite);
    }

    function draw() {
        _.each(deathQueue, function(death) {
            death.deathCountDown -= 1;
            death.sprite.alpha = death.deathCountDown / maxDeathCountdown;
        });
        deathQueue = _.without(deathQueue, _.where(deathQueue, { deathCountDown: 0   }));
    }

    app.deathAnimations = { };
    app.deathAnimations.draw = draw;
    app.deathAnimations.init = init;
    app.deathAnimations.queue = queue;
})();