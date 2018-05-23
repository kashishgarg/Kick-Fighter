var _ = require("underscore");
var clock = 0;
var players = [];

function reset() {
    players = [];
}

function playerExists(playerId) {
    return _.findWhere(players, { id: playerId });
}

function addPlayer(playerId) {
    if(playerExists(playerId)) return;
    players.push({ id: playerId });
}

function jump(playerId) {
    addPlayer(playerId);
}

function tick()  {
    clock += 1;
}

exports.jump = jump;
exports.tick = tick;
exports.reset = reset;
exports.players = function() { return players; };
exports.clock = function() { return clock; };