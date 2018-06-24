(function() {
    var socket = null;
    var playerId = null;
    var clock = 0;
    var gamestate = { players: [] };
    var gameId = _.last(window.location.href.split('/'));   

    function up(playerId) {
        socket.emit('up', session())
        // $.post('/up', session());
    }

    function left(playerId) {
        socket.emit('left', session());
        // $.post('/left', session());
    }

    function right(playerId) {
        socket.emit('right', session());
        // $.post('/right', session());
    }

    function down() {
        socket.emit('down', session());
        // $.post('/down', dto());
    }

    function session() {
        return { playerId: playerId, gameId: gameId };
    }

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
           var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
        });
    }	   

    function getPlayer(playerId) {
        return _.findWhere(gameState.players, { id: playerId });
    }

    function applyGravity() {
        _.each(app.game.players(), app.gravity.tick);       
    }

    function init() {
        playerId = guid();
        socket = io.connect('/');
        socket.on('connect', function() {
            socket.emit('joinGame', session());
        })
        socket.on('gamestate', function(state) {
            gamestate = state;
            applyGravity();
        });
        setInterval(applyGravity, 1000.0 / 60.0);
    }

    app.game = { };
    app.game.playerId = function() { return playerId; };
    app.game.init = init;
    app.game.up = up;
    app.game.left = left;
    app.game.right = right;
    app.game.down = down;
    app.game.getPlayer = getPlayer;
    app.game.clock = function() { return clock; };
    app.game.players = function() { return gamestate.players; };
    app.game.boxes = function() { return gamestate.boxes; };
})();