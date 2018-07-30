var _ = require('underscore');
var express = require('express');
var config = require('./config.js').config;
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var engine = require('./lib/engine.js');
var Game = require('./lib/game.js').Game;
var bot = require('./lib/bot.js');
var games = { };

function setBroadcast(game) {
    game.shouldBroadcast = true;
}

function broadcast(game) {
    if(game.shouldBroadcast) {
        _.each(game.sockets, function(socket) {
            socket.emit('gamestate', {
                frame: engine.frame(),
                players: engine.players(game),
                boxes: engine.boxes()
            });
        });
        game.shouldBroadcast = false; 
    }
}

function getGame(gameId) {
    if(!games[gameId]) {
        games[gameId] = new Game();
        games[gameId].id = gameId;
        games[gameId].shouldBroadcast = true;
    }
    return games[gameId];
}

io.set('loglevel', 0);
app.set('view engine', 'ejs');
app.use('/bower_components', express.static('bower_components'));
app.use('/common', express.static('common'));
app.use('/public', express.static('public'));
app.use(bodyParser.json());

app.get('/', function(req, res) { 
    res.redirect('/game/public'); 
});

app.post('/up', function(req, res) {
    input("up", req.body.gameId, req.body.playerId);
    res.end();
});

app.post('/left', function(req, res) {
    input("left", req.body.gameId, req.body.playerId);
    res.end();
});

app.post('/right', function(req, res) {
    input("right", req.body.gameId, req.body.playerId);
    res.end();
});

app.post('/down', function(req, res) {
    input("down", req.body.gameId, req.body.playerId);
    res.end();
});

app.get("/game/:id", function(req, res) {
    getGame(req.params.id);
    res.render('index', { ai: false });
})

server.listen(process.env.PORT || config.port);

var fps = engine.fps;
var framesPerSecondInMilliseconds = 1000.0/fps;
var shouldBroadcast = true;

function input(direction, gameId, playerId) {
    var game = getGame(gameId);
    engine[direction](game, playerId);
    setBroadcast(game);
}

io.sockets.on('connection', function(socket) {
    socket.on('joinGame', function(data) {
        var game = getGame(data.gameId);
        socket.game = game;
        game.sockets.push(socket);
        setBroadcast(game);
    });
    socket.on('up', function(data) {
        input("up", data.gameId, data.playerId)
    });
    socket.on('down', function(data) {
        input("down", data.gameId, data.playerId)
    });
    socket.on('left', function(data) {
        input("left", data.gameId, data.playerId)
    });
    socket.on('right', function(data) {
        input("right", data.gameId, data.playerId)
    });

    socket.on('disconnect', function() {
        if(!socket.game) return;
        socket.game.sockets  = _.without(scoket.game.sockets, socket);
    });
});

setInterval(function() {
    for(var key in games) {
            var game = games[key];
            var botAdded = bot.add(game);
            var actionMade = bot.tick(game);
            if(botAdded || actionMade) { setBroadcast(game); }
            var deathsOccured = engine.tick(game);
            if(deathsOccured) { setBroadcast(game); }
            broadcast(game);
    }
}, framesPerSecondInMilliseconds);

