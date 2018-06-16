(function() {

    function init() {
        app.game.init();
        app.gamePad.init({
            up: app.game.up,
            left: app.game.left,
            right: app.game.right,
            down: app.game.down
        });
        app.assets.init();
        app.deathAnimation.init();
        app.drawer.init();
        app.ai.init();
    }
    $(init);
})();