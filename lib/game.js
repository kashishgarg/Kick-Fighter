var _ = require("underscore");
var Player = require("./player.js").Player;
var fps = 60.0;
var frame = 0;
var players = [];
var gravity = 0;
var jumpPower = 25;

function reset() { players = []; }

function getPlayer(playerId) {
    return _.findWhere(players, { id: playerId });
}

function addPlayer(playerId) {
    if(getPlayer(playerId)) return;
    players.push(new Player(playerId));
}

function jump(playerId) {
    addPlayer(playerId);
    getPlayer(playerId).jump(jumpPower);
}

function left(playerId) {
    addPlayer(playerId);
    getPlayer(playerId).left();
}

function right(playerId) {
    addPlayer(playerId);
    getPlayer(playerId).right();
}

function applyGravity(player) {
    if(player.isJumping()) {
        player.y -= velocity;
        velocity -= gravity;
    }

    if(player.y > 0) {
        player.state = "standing";
        player.y = 0;
    }
    
}

function tick()  {
    frame += 1;
    _.each(players, function(player) {
        applyGravity(player);
    })
}

exports.fps = fps;
exports.jump = jump;
exports.tick = tick;
exports.reset = reset;
exports.getPlayer = getPlayer;
exports.jumpPower = jumpPower
exports.players = function() { return players; };
exports.frame = function() { return frame; };