(function() {
    var game = null;
    var sprites = null;
    var c, canvas = null;
    var stageHeight = 450;

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
            c.draw(spries.dive[player.direction][player.state], player.x, player.y + stageHeight);
        });
    }

    app.drawer = { };
    app.drawer.init = init;
    app.drawer.draw = draw;

})();