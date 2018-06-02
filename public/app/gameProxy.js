(function() {
    var socket = null;
    var id = null;
    var clock = 0;
    var gamestate = { players: [] };

    function up(id) {
        console.log("Jumped");
        $.post('/up', { playerId: id });
    }

    function left(id) {
        $.post('/left', { playerId: id });
    }

    function right(id) {
        $.post('/right', { playerId: id });
    }

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
           var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}	   

    function init() {
        id = guid();
        socket = io.connect('/');
        socket.on('gamestate', function(state) {
            gamestate = state;
        });
    }

    app.game = { };
    app.game.init = init;
    app.game.up = up;
    app.game.left = left;
    app.game.right = right;
    app.game.clock = function() { return clock; };
    app.game.players = function() { return gamestate.players; };
    app.game.boxes = function() { return gamestate.boxes; };
})();