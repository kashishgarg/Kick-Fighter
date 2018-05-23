(function() {
    var game = { };

    function jump() {
        console.log("Jumped");
        $.post('/jump');
    }

    function attackLeft() {
        $.post('/left');
    }

    function attackRight() {
        $.post('/right');
    }

    function init() {
        socket = io.connect('/');
        socket.on('gamestate', function(gamestate) {
            console.log(gamestate);
        });
    }

    app.game = game;
    app.game.init = init;
    app.game.jump = jump;
    app.game.attackLeft = attackLeft;
    app.game.attackRight = attackRight;

})();