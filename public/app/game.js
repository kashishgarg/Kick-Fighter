(function() {
    var socket = null;
    var id = null;
    var clock = 0;
    var gamestate = { players: [] };

    function jump(id) {
        console.log("Jumped");
        $.post('/jump', { playerId: id });
    }

    function attackLeft(id) {
        $.post('/left', { playerId: id });
    }

    function attackRight(id) {
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
    app.game.jump = jump;
    app.game.attackLeft = attackLeft;
    app.game.attackRight = attackRight;
    app.game.clock = function() { return clock; };
    app.game.players = function() { return gamestate.players; };
    app.game.boxes = function() { return gamestate.boxes; };
})();