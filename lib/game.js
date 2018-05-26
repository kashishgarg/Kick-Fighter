var _ = require("underscore");
var Player = require("./player.js").Player;
var fps = 60.0;
var frame = 0;
var players = [];
var gravity = 0;
var jumpPower = 25;
var kickDelta = 10;

var boxes = {
    "1": {
      standing: [
        { x: -10, y: -140, x2: 8, y2: -120 },
        { x: -30, y: -115, x2: 15, y2: -80 },
        { x: -20, y: -80, x2: 15, y2: -40 },
        { x: -25, y: -40, x2: 25, y2: -10 }
      ],
      jumping: [
        { x: -5, y: -135, x2: 15, y2: -115 },
        { x: -12, y: -115, x2: 12, y2: -65 },
        { x: -5, y: -70, x2: 7.5, y2: -12 },
        { x: 7.5, y: -70, x2: 25, y2: -50 },
        { x: -12, y: -50, x2: 12.5, y2: -30 }
      ],
      kicking: [
        { x: -10, y: -160, x2: 10, y2: -130 },
        { x: -28.5, y: -135, x2: -3.5, y2: -122.5 },
        { x: -40, y: -120, x2: -5, y2: -100 },
        { x: -35, y: -100, x2: 30, y2: -87.5 },
        { x: -30, y: -90, x2: 20, y2: -77.5 },
        { x: -8.5, y: -75, x2: 6.5, y2: -45 },
        { x: 10, y: -50, x2: 20, y2: -32.5 },
        { x: 25, y: -35, x2: 47.5, y2: -12.5 }
      ]
    },
    "-1": {
      standing: [
        { x: -8, y: -140, x2: 10, y2: -120 },
        { x: -15, y: -115, x2: 30, y2: -80 },
        { x: -15, y: -80, x2: 20, y2: -40 },
        { x: -25, y: -40, x2: 25, y2: -10 }
      ],
      jumping: [
        { x: -15, y: -135, x2: 5, y2: -115 },
        { x: -12, y: -115, x2: 12, y2: -65 },
        { x: -7.5, y: -70, x2: 5, y2: -12 },
        { x: -25, y: -70, x2: -7.5, y2: -50 },
        { x: -12.5, y: -50, x2: 12, y2: -30 }
      ],
      kicking: [
        { x: -10, y: -160, x2: 10, y2: -130 },
        { x: 3.5, y: -135, x2: 28.5, y2: -122.5 },
        { x: 5, y: -120, x2: 40, y2: -100 },
        { x: -30, y: -100, x2: 35, y2: -87.5 },
        { x: -20, y: -90, x2: 30, y2: -77.5 },
        { x: -6.5, y: -75, x2: 8.5, y2: -45 },
        { x: -20, y: -50, x2: -10, y2: -32.5 },
        { x: -47.5, y: -35, x2: -25, y2: -12.5 }
      ]
    }
  };


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

    if(player.isKicking()) {
        player.y += kickDelta;
        player.x += kickDelta * player.direction;
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
exports.jumpPower = jumpPower;
exports.boxes = function() { return boxes };
exports.players = function() { return players; };
exports.frame = function() { return frame; };