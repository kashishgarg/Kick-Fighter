(function() {
    var game = { };
    var socket = null;
    var id = null;

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