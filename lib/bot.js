var _ = require('underscore');
var player = require('./player.js').Player;
var gravity = require('../common/gravity.js')
var easyBot = require('./easyBot.js')

function add(game) {
    if(game.players.length == 0) return false;
    if(_.first(game.players).state != "standing") return false;
    if(bots(game).length >= 2) return false;
    _(2).times(function() {
        var player = game.addPlayer(_.uniqueId());
        player.bot = true;
        player.ai = new EasyBot(player);

    });

    return true;
}

function hasBots(game) {
    return bots(game).length > 0;
}

function bots(game) {
    return _.where(game.players, { bot: true });
}

function tick(game) {
    var actionMade = false;
    _.each(bots(game), function(bot) {
        actionMade = actionMade || bot.ai.tick();
    });
    return actionMade;
}
exports.add = add;
exports.tick = tick;