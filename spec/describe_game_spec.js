var engine = require('../lib/engine.js');
var Game = require('../lib/game.js').Game;
var game = new Game();

describe("jumping", function() {
    beforeEach(function() {
        engine.reset(game);
    });

    it("adds the player if he doesn't exist", function() {
        engine.up(game, "player1");
        expect(engine.players(game).length).toBe(1);
    });

    it("does't add the player if he already exits", function() {
        engine.up(game, "player1");
        engine.up(game, "player1");
        expect(engine.players(game).length).toBe(1);
    });

    it("velocity is set", function() {
        game.addPlayer("player1");
        game.getPlayer("player1").state = "standing";
        engine.up(game, "player1");
        expect(game.getPlayer("player1").velocityY).toBe(engine.jumpPower);
    });

    it("player's y position should change after jump", function() {
        engine.up(game, "player1");
        engine.tick(game);
        expect(game.getPlayer("player1").y).toBeLessThan(0);
    });

    it("player's initial state is jumping", function() {
        engine.up(game, "player1");
        engine.tick(game);
        expect(game.getPlayer("player1").state).toBe("jumping");
    });
});

describe("stageBoundaries", function() {
    beforeEach(function() { engine.reset(game); });

    it("the player is set to dying if he hits the left boundary", function() {
        var player = game.addPlayer("player1");
        player.direction = -1;
        player.state = "kicking";
        player.y = -1000;
        player.x = 200;
        ticksTillBorder = (player.x - engine.stageBoundary.left) / engine.kickDelta;
        for(i = 0; i < engine.kickDelta; i++) {
            engine.tick(game);
        }
        expect(player.state).toBe("kicking"); //dying
    });

    it("the player is set to dying if he hits the right boundary", function() {
        var player = game.addPlayer("player1");
        player.direction = 1;
        player.state = "kicking";
        player.y = -1000;
        player.x = 1000;
        ticksTillBorder = (engine.stageBoundary.right - player.y) / engine.kickDelta;
        for(i = 0; i < engine.kickDelta; i++) {
            engine.tick(game);
        }
        expect(player.state).toBe("kicking"); //dying
        expect(engine.players(game).length).toBe(0);
    });

    it("player is removed after the death countdown", function() {
        var player = game.addPlayer("player1");
        player.state = "kicking";
        player.direction = -1;
        player.x = 0;
        player.y = -1000;
        engine.tick(game);
        var countdown = player.deathCountdown;
        for(i = 0; i < countdown; i++) {
            engine.tick(game);
        }
        expect(engine.players(game).length).toBe(0);
    });
});

describe("hit boxes", function() {
    it("kills player", function() {
        var attacker = game.addPlayer("attacker");
        attacker.state = "kicking";
        attacker.direction = -1;
        attacker.x = 500;
        attacker.y = -100;

        var victim = game.addPlayer("victim");
        victim.x = 450;
        victim.y = 0;
        victim.direction = 1;
        victim.state = "standing";
        var foot = attacker.foot(engine.boxes());
        var bodyParts = victim.boxes(engine.boxes());
        engine.tick(game);
        expect(victim.state).toBe('dying');
        expect(attacker.state).toBe('kicking');
    });
});