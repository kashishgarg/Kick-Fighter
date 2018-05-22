(function() {
    var sprites = app.assets.sprites;

    var c, canvas = null;

    function init() {
        canvas = window.document.getElementById('stage');
        c = canvas.getContext();
    }

    function draw() {
        drawPlayer();
    }

    function drawPlayer() {
        var x = 500;
        var y = 500;
        var sprite = sprites.box;
        c.draw(sprite, x, y);
    }

    app.drawer = { };
    app.drawer.init = init;
    app.drawer.draw = draw;

})();