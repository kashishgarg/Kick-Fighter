(function() {
    var socket = null;
    var playerId = null;
    var clock = 0;
    var gamestate = { players: [] };
    var gameId = _.last(window.location.href.split('/'));   

    function up(playerId) {
        $.post('/up', dto());
    }

    function left(playerId) {
        $.post('/left', dto());
    }

    function right(playerId) {
        $.post('/right', dto());
    }

    function down(playerId) {
        $.post('/down', dto());
    }

    function dto() {
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
            socket.emit('joinGame', dto());
        })
        socket.on('gamestate', function(state) {
            gamestate = state;
            applyGravity();
        });
        setInterval(applyGravity, 1000.0 / 60.0);
        console.log(dto());
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